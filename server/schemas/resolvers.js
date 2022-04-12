const {User, Products, Category, Order} = require('../models');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(stripeKey)
const secret = process.env.SECRET;
const stripeKey= process.env.STRIPE_KEY;

const resolvers = {
    Mutation: {
        async createUser(_, {signUpInput: {firstName, lastName, email, password} }) {
            //check for existing user
            const existingUser = await User.findOne({email});

            //throw error if user exists
            if(existingUser){
                throw new ApolloError('This email:' + email + ' is already registered to a user.')
            }
            //encrypt password
            let encryptPassword = await bcrypt.hash(password, 10);

            //build out mongoose model 
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: encryptPassword
            });
            //create JWT (attach to user model)
            const token = jwt.sign(
                {user_id: newUser._id, email},
                secret, 
                {
                    expiresIn: '2h'
                }
            );

            newUser.token = token;
            //save our user in mongoDB
            const res = await newUser.save();
            
            return{
                id: res.id,
                ...res.doc
            }
        },
        async loginUser(_, {loginInput: {email, password}}){
            //Check if user exists 
            const user = await User.findOne({email});
            //check if the entered password equals the encrypted password
            if(user && (await bcrypt.compare(password, user.password))){
                //create new token
                const token = jwt.sign(
                    {user_id: user._id, email},
                    secret, 
                    {
                        expiresIn: '2h'
                    }
                );
                //attach token to user model that we found above 
                user.token = token;

                return{
                    id: user.id,
                    ...user._doc
                }
            } else{
                //if user doesn't exist, throw error 
                throw new ApolloError('Incorrect password');
            }
        },
        addOrder: async (_parent, { products }, context) => {
            console.log(context);
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw new AuthenticationError('Not logged in');
          },
    },
    Query:{
        products: async ()=>{
            return await Products.find({});
        }, 
        categories: async ()=>{
            return await Category.find();
        }, 
        products: async (_, { category, name }) =>{
            const params = {};

            if (category){
                params.category = category;
            }

            if(name){
                params.name = {
                    $regex: name
                };
            }

            return await Products.find(params).populate('category');
        },
        user: async(_parent, _args, context) =>{
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                user.orders.sort((a,b)=> b.purchaseDate - a.purchaseDate);

                return user;
            }
        },
        order: async (_parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              return user.orders.id(_id);
            }
        },

        checkout: async (_parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];
      
            const { products } = await order.populate('products');
      
            for (let i = 0; i < products.length; i++) {
              const product = await stripe.products.create({
                name: products[i].name,
                description: products[i].description,
                images: [`${url}/images/${products[i].image}`]
              });
      
              const price = await stripe.prices.create({
                product: product.id,
                unit_amount: products[i].price * 100,
                currency: 'usd',
              });
      
              line_items.push({
                price: price.id,
                quantity: 1
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            return { session: session.id };
          }
    }
};

module.exports = resolvers;
const { ApolloError } = require('apollo-server-errors');
const { User, Products, Category, Order } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')('sk_test_51KnXr4AMOhfayBffh6ea49sqflPatPIR6ecd67lnMraYa8IvWBLBpoWLb82Nt8SqbiEaluBhzFsk6sVQVC1NXSLT00EcNiJtrv')
const secret = process.env.SECRET;
// const stripeKey= process.env.STRIPE_KEY;

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
                id: res._id,
                token
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
                    token
                }
            } else{
                //if user doesn't exist, throw error 
                throw new ApolloError('Incorrect password');
            }
        },
        addOrder: async (_, { products }, context) => {
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
        categories: async ()=>{
            return await Category.find();
        }, 
        products: async (_, { category, productName }) =>{
            const params = {};

            if (category){
                params.category = category;
            }

            if(productName){
                params.productName = {
                    $regex: productName
                };
            }

            return await Products.find(params).populate('category');
        },
        user: async(_, _parent, context) =>{
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                user.orders.sort((a,b)=> b.purchaseDate - a.purchaseDate);

                return user;
            }
        },
        order: async (_, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              return user.orders.id(_id);
            }
        },

        checkout: async (_, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];
      
            const { products } = await order.populate('products');
      
            for (let i = 0; i < products.length; i++) {
              const product = await stripe.products.create({
                name: products[i].productName,
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
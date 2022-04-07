const {User, Products} = require('../models');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const resolvers = {
    Mutation: {
        async createUser(_, {signUpInput: {firstName, lastName, email, password} }) {
            //check for existing user
            const existingUser = await User.findOne({email});

            //thorw error if user exists
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
        }
    },
    Query:{
        products: async ()=>{
            return await Products.find({})
        }
    }
};

module.exports = resolvers;
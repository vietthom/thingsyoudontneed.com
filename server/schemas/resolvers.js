const User = require('../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

module.exports = {
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
                {user_id: newUser.password, email},
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
        }
    },
    // Query:{}
}
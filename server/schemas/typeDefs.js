const { gql } = require('apollo-server');

module.exports = gql`
    //User Data
    type User {
        firstName: String
        lastName: String
        email: String
        password: String
        token: String
    }

    //User input for signing up 
    input SignUpInput {
        firstName: String
        lastName: String
        email: String 
        password: String
    }

    //User input for logging in
    input LoginInput {
        email: String
        password: String 
    }






`;
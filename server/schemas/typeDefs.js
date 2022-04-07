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
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    //User input for logging in
    //Note: add component for authentication
    input LoginInput {
        email: String
        password: String 
    }

    type Query {
        user(id: ID!): User
    }

    type Mutation {
        createUser(signUpInput: SignUpInput): User
        loginUser(loginInput: LoginInput): User
    }
`;
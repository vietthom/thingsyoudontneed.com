const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        firstName: String
        lastName: String
        email: String
        password: String
        token: String
    }


    input SignUpInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    
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

module.exports = typeDefs;
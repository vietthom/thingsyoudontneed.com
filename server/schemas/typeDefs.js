const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        firstName: String
        lastName: String
        email: String
        password: String
        token: String
        orders: [Order]
    }

    type Order{
        _id: ID 
        purchaseDate: String
        products: [Product]
    }

    type Products{
        productName: String
        description: String
        price: Int
        image: String
        quantity: Int
        category: Category
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

    type Query{
        products: [Products]
    }

    type Mutation {
        createUser(signUpInput: SignUpInput): User
        loginUser(loginInput: LoginInput): User
    }

`;

module.exports = typeDefs;
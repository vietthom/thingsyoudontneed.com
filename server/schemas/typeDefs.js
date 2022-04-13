const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
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
        products: [Products]
    }

    type Products{
        productName: String
        description: String
        price: Int
        image: String
        quantity: Int
        category: Category
    }
    
    type Category{
        _id: ID
        name: String
    }

    type Checkout {
        session: ID
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

    type Query{
        categories: [Category]
        products(category: ID, name: String): [Products]
        product(_id:ID!): Products
        user: User
        order(_id: ID!): Order
        checkout(products:[ID]!): Checkout
    }

    type Mutation {
        createUser(signUpInput: SignUpInput): User
        loginUser(loginInput: LoginInput): User
        addOrder(products: [ID]!): Order
        updateProduct(_id: ID!, quantity: Int!): Products
    }

`;

module.exports = typeDefs;
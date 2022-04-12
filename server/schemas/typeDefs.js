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
    
    type Category{
        _id: ID
        name: String
    }

    type Category{
        _id: ID 
        name: String
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
        products: [Products]
        categories: [Category]
        products(category: ID, name: String): [Products]
        products(_id:ID!): Products
        user: User
        order(_id: ID!): Order
        checkout(products:[ID]!): Checkout
    }

    type Mutation {
        createUser(signUpInput: SignUpInput): User
        loginUser(loginInput: LoginInput): User
        addOrder(products: [ID]!): Order
        
    }

`;

module.exports = typeDefs;
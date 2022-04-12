const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        firstName: String
        lastName: String
        email: String
        password: String
        token: String
    }

    type Category {
        name: String
      }

    type Products{
        productName: String
        description: String
        price: Int
        quantity: Int
    }

    type Order {
        purchaseDate: String
        products: [Products]
      }

    type Checkout {
        session: ID
      }
    
    type Auth {
        token: ID
        user: User
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

    type Query {
        categories: [Category]
        products(name: String): [Products]

        user: User
        order : Order
        checkout(products: [ID]!): Checkout
      }

    type Mutation {
        createUser(signUpInput: SignUpInput): User
        loginUser(loginInput: LoginInput): User
    }

`;

module.exports = typeDefs;
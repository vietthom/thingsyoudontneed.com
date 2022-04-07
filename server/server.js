const { ApolloServer } = requrie('apollo-server-express');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

//Aquire mongodb connenction
const mongo = require('./config/connection');

//Create Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

//frontend middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//start server 
mongo.once('open', async ()=>{
    //Generate apollo server first
    //then connecto to mongodb
    await server.start();
    server.applyMiddleware({app});
    app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
});
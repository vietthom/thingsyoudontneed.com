const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');

const { typeDefs, resolvers }= require('./schemas');

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

app.use('/images', express.static(path.join(__dirname, '../client/images/')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//start server 
mongo.once('open', async ()=>{
    //Generate apollo server first
    //then connecto to mongodb
    await server.start();
    server.applyMiddleware({app});
    app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
});
const express = require('express');
const {ApolloServer} = require('apollo-server-express');

const PORT = process.env.PORT || 3001;

const app = express();
const server = new ApolloServer({typeDefs, resolvers, context: offMiddleware});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV ==='production'){
    app.use(express.static(path.join(__dirname, '../client/build')))
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/'))
});

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})
};

startApolloServer(typeDefs, resolvers);
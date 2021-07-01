const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

// Crea express application
const app = express();

// app.use binds the app-level and router-level middlewares
// We pass the endpoint /graphql to the middleware
// If the endpoint of the request matches /graphql, its callback will be excuted
// The callback runs the expressGraphQl function that takes in the schema and the boolean value
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, () => {
    console.log('Server is running at port 3000')
});
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
const cors = require('cors')
import schema from './graphql/rootSchema';

import { connectToDB } from '../database';

// Start the http server
const startServer = async () => {
    // Initiate express and define routes
    const app = express();
	app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
    app.use('/graphql', bodyParser.json(), (req, res) => graphqlExpress({ schema, context: req.headers })(req, res));
    app.use('/', graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:3001/subscriptions`,
    }));

    // Initiate the server
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server started on port: ${process.env.PORT || 3000}`);
    });
};

// Connecting to DB and then start the server
const dbConnectAndStartServer = async () => {
    try {
        await connectToDB();
        console.log('Connected to Mongo successfully');
        startServer();
    } catch (err) {
        console.error(`Error connecting to mongo - ${err.message}`);
        process.exit(1);
    }
};

// Entry point
dbConnectAndStartServer();

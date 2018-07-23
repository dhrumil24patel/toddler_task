import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import {PubSub, withFilter} from 'graphql-subscriptions'

import { execute, subscribe } from 'graphql';
import { createServer } from 'https';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { connectToDB } from '../database';

const pubsub = new PubSub();

// Start the http server
const startServer = async () => {
    const { User } = require('../database/models');

    // GraphQL Types
    const typeDefs = `
    type User {
      _id: ID!
      name: String
      password: String
    }
    
    type UserSubscription{
      _id: ID!
      name: String
    }

    type Query {
      users: [User]
    }

    type Mutation {
      addUser(input: UserInput): User
    }
    
    type Subscription{
      userAdded: UserSubscription
    }

    input UserInput {
      name: String!
      password: String!
    }
  `;

    // GraphQL resolvers
    const resolvers = {
        Query: {
            users: async () => {
                const res = await User.find();
                return res;
            },
        },

        Mutation: {
            addUser: async(root, args) => {
                const res = await User.create(args.input);
                pubsub.publish('userAdded', res);
                return res;
            },
        },

        Subscription: {
            userAdded: {
              resolve: (payload) => payload,
              subscribe: () => pubsub.asyncIterator(['addUser'])
            }
        }
    };

    // Define a schema
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    // Initiate express and define routes
    const app = express();
    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
    app.use('/', graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `wss://dhrumil242.herokuapp.com:3001/subscriptions`,
    }));

    // Initiate the server
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server started on port: ${process.env.PORT || 3000}`);
    });

  // Wrap the Express server
  const ws = createServer(app);
  ws.listen(3001, () => {
    console.log(`GraphQL Server is now running on http://localhost:3001`);
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server: ws,
      path: '/subscriptions',
    });
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

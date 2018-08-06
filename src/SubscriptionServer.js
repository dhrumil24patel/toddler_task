import { createServer } from 'https';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import {makeExecutableSchema} from "graphql-tools/dist/index";

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

const WS_SERVER_PORT = parseInt(process.env.WS_SERVER_PORT || '3001', 10);

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_SERVER_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_SERVER_PORT}`
));

const subscriptionServer = new SubscriptionServer.create({
  schema,
  execute,
  subscribe,
}, {
  server: websocketServer,
  path: '/subscriptions',
});

export default subscriptionServer;


// ********* client code for apollo setup
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
// const networkInterface = createNetworkInterface({ uri:
// 		'http://localhost:4000/graphql' });
// networkInterface.use([{
// 	applyMiddleware(req, next) {
// 		setTimeout(next, 500);
// 	},
// }]);
// const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
// 	reconnect: true,
// });
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
// 	networkInterface,
// 	wsClient,
// );
// const client = new ApolloClient({
// 	networkInterface: networkInterfaceWithSubscriptions
// });

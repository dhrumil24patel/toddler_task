export const typeDefs = `
    type User {
      _id: ID!
      name: String
      password: String
    }

    type Query {
      users(limit:Int): [User]
    }

    type Mutation {
      addUser(input: UserInput): User
    }

    input UserInput {
      name: String!
      password: String!
    }
  `;

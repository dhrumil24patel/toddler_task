import {makeExecutableSchema, mergeSchemas} from 'graphql-tools';
import {typeDefs} from './typeDefs';
import {queries} from './rootQuery';
import {mutations} from './rootMutation';

const resolvers = {
	Query: queries,
	Mutation: mutations
};

export default mergeSchemas({
	schemas: [makeExecutableSchema({typeDefs, resolvers})]
});

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
/* import { environment } from '../config';

const env = process.env.NODE_ENV || 'development'; */

const link = from([new HttpLink({ uri: 'http://localhost:8080/graphql' })]);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
	cache,
	link: link
});

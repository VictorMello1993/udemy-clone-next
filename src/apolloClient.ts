import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export { gql } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.ROUTE_STRAPI_API_GRAPHQL,
  cache: new InMemoryCache(),
});

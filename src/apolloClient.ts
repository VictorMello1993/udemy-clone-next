import { ApolloClient, InMemoryCache } from "@apollo/client";
export { gql, ApolloProvider } from "@apollo/client";

const serverUrl = "https://webservices.jumpingcrab.com/graphql";

export const apolloClient = new ApolloClient({
  ssrMode: true,
  uri: `${serverUrl}/graphql`,
  cache: new InMemoryCache(),
});

export function getImageUrl(path: string) {
  return `${serverUrl}${path}`;
}

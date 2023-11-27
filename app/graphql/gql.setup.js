import { ApolloClient, InMemoryCache } from "@apollo/client";

export const graphqlClient = new ApolloClient({
  uri: process.env.NEST_PUBLIC_SERVER_URI,
  // uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

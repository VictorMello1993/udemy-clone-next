import "../../src/layout/styles.css";
import type { AppProps } from "next/app";
import { ApolloProvider, apolloClient } from "../../src/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

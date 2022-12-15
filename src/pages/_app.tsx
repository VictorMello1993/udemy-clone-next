import "../../src/layout/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider, apolloClient } from "../../src/apolloClient";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </SessionProvider>
  );
}

import "../../src/layout/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider, apolloClient } from "../../src/apolloClient";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  );
}

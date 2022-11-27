import "../../src/layout/styles.css";
import { Layout } from "../layout/Layout";
import type { AppProps } from "next/app";
import { isConstructorDeclaration } from "typescript";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

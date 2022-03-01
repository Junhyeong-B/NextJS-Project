import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { Provider } from "react-redux";
import { store } from "../store";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </Provider>
  );
}

export default MyApp;

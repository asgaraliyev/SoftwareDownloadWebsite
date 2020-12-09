import "../styles/globals.css";
import Store from "../Redux";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import { createWrapper } from "next-redux-wrapper";
import Router from "next/router";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  TimeAgo.addLocale(en);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });
  }, []);
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
      {isLoading && <Loader></Loader>}
    </Provider>
  );
}

const makestore = () => Store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);

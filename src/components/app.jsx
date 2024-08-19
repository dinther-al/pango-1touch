import React from "react";
import { ZMPRouter, SnackbarProvider } from "zmp-ui";
import { App } from "zmp-framework/react";
import store from "../store.js";
import { Layout } from "./layout/Layout.jsx";

const ZMAApp = () => {
  const zmpparams = {
    theme: "auto",
    store: store,
  }

  return (
    <App {...zmpparams}>
      <SnackbarProvider>
        <ZMPRouter>
          <Layout />
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default ZMAApp;
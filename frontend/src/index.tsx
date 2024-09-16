import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { REDIRECT_URL } from "./utils/constants";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context";

const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const cilentId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={cilentId}
      authorizationParams={{
        redirect_uri: REDIRECT_URL,
      }}
    >
      <ContextProvider>
        <App />
      </ContextProvider>
    </Auth0Provider>
  </BrowserRouter>
);

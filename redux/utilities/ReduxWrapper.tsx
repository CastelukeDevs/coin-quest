import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "../store";

/**
 * Wrapper for redux
 */
export default ({ children }: { children: ReactNode[] | ReactNode }) => (
  <Provider store={store.stores}>
    <PersistGate persistor={store.persistor}>{children}</PersistGate>
  </Provider>
);

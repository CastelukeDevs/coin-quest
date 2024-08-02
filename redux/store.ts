import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";

import reducers, { IReducerName } from "./reducers";

type IPersistConfig = {
  key: string;
  storage: any;
  blacklist: IReducerName[];
};

const persistConfig: IPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = reducers;

export type IRootStateType = ReturnType<typeof rootReducer>;
const createLogger = require("redux-logger").default;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const stores = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }).concat(createLogger),
  // .concat(createObserver()),
  // .concat(createDebugger())
});

const persistor = persistStore(stores);

export type AppDispatch = typeof stores.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default { stores, persistor };

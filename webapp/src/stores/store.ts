import { combineReducers } from "redux";
import { createTransform, PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { replacer, reviver } from "@/utils/json";
import { configureStore } from "@reduxjs/toolkit";

import { extensionsSlice } from "./reducers";

export type RootState = {
  extensions: ReturnType<typeof extensionsSlice.reducer>;
};

const reducers = combineReducers({
  extensions: extensionsSlice.reducer,
});

const transform = createTransform(
  (inboundState, _) => JSON.stringify(inboundState, replacer),
  (outboundState, _) => JSON.parse(outboundState, reviver)
);

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["extensions"],
  transforms: [transform],
};

export default configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

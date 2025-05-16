import { combineReducers } from "redux";
import { createTransform, PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { slice as aiSlice } from "@/features/ai";
import { replacer, reviver } from "@/utils/json";
import { configureStore } from "@reduxjs/toolkit";

import { extensionsSlice } from "./reducers";

export type RootState = {
  extensions: ReturnType<typeof extensionsSlice.reducer>;
  ai: ReturnType<typeof aiSlice.reducer>;
};

const reducers = combineReducers({
  extensions: extensionsSlice.reducer,
  ai: aiSlice.reducer,
});

const transform = createTransform(
  (inboundState) => JSON.stringify(inboundState, replacer),
  (outboundState) => JSON.parse(outboundState, reviver)
);

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["extensions", "ai"],
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

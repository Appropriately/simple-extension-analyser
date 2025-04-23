import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";

import { extensionsSlice } from "./reducers";

const reducers = combineReducers({
    extensions: extensionsSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: [], // TODO: Handle serialisation issues with extensions
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

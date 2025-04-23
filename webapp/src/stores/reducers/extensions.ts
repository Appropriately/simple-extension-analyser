import { Extension, getExtensionId } from "@/features/extension";
import { createSlice } from "@reduxjs/toolkit";

interface ExtensionsById {
    [id: string]: Extension;
}

interface InitialState {
    extensions: ExtensionsById;
}

const initialState: InitialState = {
    extensions: {},
};

export const extensionsSlice = createSlice({
    name: "extensions",
    initialState,
    reducers: {
        addExtension: (state, action) => {
            const { extension } = action.payload;
            state.extensions[getExtensionId(extension)] = extension;
        },
        removeExtension: (state, action) => {
            const { id } = action.payload;
            delete state.extensions[id];
        },
        clearExtensions: (state) => {
            state.extensions = {};
        },
    },
});

export const { addExtension, removeExtension, clearExtensions } = extensionsSlice.actions;
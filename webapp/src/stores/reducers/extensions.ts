import { Extension } from "@/features/extension";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  extensions: Record<string, Extension>;
}

const initialState: InitialState = {
  extensions: {},
};

export const extensionsSlice = createSlice({
  name: "extensions",
  initialState,
  reducers: {
    addExtension: (state, action: PayloadAction<{ extension: Extension }>) => {
      const { extension } = action.payload;
      if (!extension.id) return;

      state.extensions[extension.id] = extension;
    },
    removeExtension: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.extensions[id];
    },
    clearExtensions: (state) => {
      state.extensions = {};
    },
  },
});

export const { addExtension, removeExtension, clearExtensions } =
  extensionsSlice.actions;

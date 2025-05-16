import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProviderConfig, ProviderType } from "../types/provider";

interface State {
  providers: ProviderConfig[];
  activeProvider: ProviderType | null;
}

const initialState: State = {
  providers: [],
  activeProvider: null,
};

export const slice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    addProvider: (state, action: PayloadAction<ProviderConfig>) => {
      const { payload } = action;
      state.providers.push(payload);
    },
    updateProvider: (state, action: PayloadAction<ProviderConfig>) => {
      const { payload } = action;
      const index = state.providers.findIndex((p) => p.type === payload.type);
      if (index !== -1) state.providers[index] = payload;
    },
    removeProvider: (state, action: PayloadAction<ProviderType>) => {
      const { payload } = action;
      state.providers = state.providers.filter((p) => p.type !== payload);
      if (state.activeProvider === payload)
        state.activeProvider = state.providers[0]?.type || null;
    },
    setActiveProvider: (state, action: PayloadAction<ProviderType>) => {
      const { payload } = action;
      state.activeProvider = payload;
    },
  },
});

export const {
  addProvider,
  updateProvider,
  removeProvider,
  setActiveProvider,
} = slice.actions;

import { configureStore } from "@reduxjs/toolkit";

import { extensionsSlice } from "./extensions";

export default configureStore({
    reducer: {
        extensions: extensionsSlice.reducer,
    },
})

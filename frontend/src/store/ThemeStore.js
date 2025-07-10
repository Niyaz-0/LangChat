import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"

const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
    devTools: true,
})

export default store;
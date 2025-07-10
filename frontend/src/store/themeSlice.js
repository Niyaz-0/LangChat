import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: localStorage.getItem("theme") || "night",
    reducers: {
        changeTheme: (state, action) => {
            localStorage.setItem("theme", action.payload)
            return action.payload;
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
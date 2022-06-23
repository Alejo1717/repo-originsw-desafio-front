import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
      auth:  false
    },
    reducers: {
        singin: (state, action) => {
            state.auth =  action.payload;
        },
        logout: (state) => {
            state.auth =  false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { singin , logout } = authSlice.actions;

export const selectAuth = (state) => state.auth.auth;

export default authSlice.reducer;
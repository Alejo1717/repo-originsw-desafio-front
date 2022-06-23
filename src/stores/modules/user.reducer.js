import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        createUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state) => {
            state.user = null;
        }
    }
});

export const { createUser, deleteUser } = userSlice.actions;

export const selectUser = (state) => state.user.user

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
export const actionSlice = createSlice({
    name: "action",
    initialState: {
        action: []
    },
    reducers: {
        createAction: (state, action) => {
            console.log(action.payload)
            state.action = action.payload;
        },
        updateAction: (state, action) => {
            state.action = action.payload;
        },
        deleteAction: (state) => {
            state.action = [];
        }
    }
});

export const { createAction, updateAction, deleteAction } = actionSlice.actions;

export const selectAction = (state) => state.action.action

export default actionSlice.reducer;
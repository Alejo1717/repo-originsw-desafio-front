import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "./modules/action.reducer";
import authReducer from "./modules/auth.reducer";
import userReducer from "./modules/user.reducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    action: actionReducer
  }
});

import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./modules/postSlice";
import signupReducer from "./modules/signupSlice";
import userCheckReducer from "./modules/userSlice";
import roomMakingReducer from "./modules/roomMakingSlice";


const store = configureStore({
  reducer: {
    post: postReducer,
    userSignup: signupReducer,    
    loggedIn: userCheckReducer,
    roomMaking:roomMakingReducer,
  },
});

export default store;

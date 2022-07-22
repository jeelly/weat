import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./modules/postSlice";
import signupReducer from "./modules/signupSlice";
import userCheckReducer from "./modules/userSlice";
import roomMakingReducer from "./modules/roomMakingSlice";
import mapReducer from "./modules/mapSlice";


const store = configureStore({
  reducer: {
    post: postReducer,
    userSignup: signupReducer,    
    loggedIn: userCheckReducer,
    roomMaking:roomMakingReducer,
    map:mapReducer
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./modules/postSlice";
import signupReducer from "./modules/signupSlice";
import userCheckReducer from "./modules/userSlice";
import roomMakingReducer from "./modules/roomMakingSlice";
import mapReducer from "./modules/mapSlice";
import notiReducer from './modules/socketSlice'
import myReviewReducer from "./modules/myReviewSlice";


const store = configureStore({
  reducer: {
    post: postReducer,
    userSignup: signupReducer,    
    loggedIn: userCheckReducer,
    roomMaking:roomMakingReducer,
    map:mapReducer,
    noti:notiReducer,
    myReviewList:myReviewReducer
  },
});

export default store;

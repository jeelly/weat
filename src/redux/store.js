import { configureStore } from '@reduxjs/toolkit';
import postReducer from './modules/postSlice';
import signupReducer from './modules/signupSlice';
import userCheckReducer from './modules/userSlice';
import emojiReducer from './modules/emojiSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    userSignup:signupReducer,
    userEmoji:emojiReducer,
    loggedIn:userCheckReducer
  },
});

export default store;
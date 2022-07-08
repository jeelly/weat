import { configureStore } from '@reduxjs/toolkit';
import postReducer from './modules/postSlice';
import signupReducer from './modules/userSlice'

const store = configureStore({
  reducer: {
    post: postReducer,
    userSignup:signupReducer
  },
});

export default store;
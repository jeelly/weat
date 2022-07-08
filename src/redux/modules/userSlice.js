import { createSlice } from '@reduxjs/toolkit';

let signupSlice = createSlice({
  name: 'userSignup',
  initialState:{
      email: '',
      password: ''
    },
  reducers: {
    addUserEmail(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { addUserEmail} = signupSlice.actions;
export default signupSlice.reducer;

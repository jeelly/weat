import { createSlice } from "@reduxjs/toolkit";



let signupSlice = createSlice({
  name: "userSignup",
  initialState: {
    birthDay: "",
    customerId: "",
    email: "",
    eyes: "",
    faceColor: "",
    name: "",
    nickname: "",
    password: "",
  },
  reducers: {
    addEssential(state, action) {
      state.customerId = action.payload.customerId;
      state.password = action.payload.password;
    },
    addDasicInfo(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.birthDay = action.payload.birthDay;
    },
    addFace(state, action) {
      state.nickname = action.payload.nickname;
      state.eyes = action.payload.eyes;
      state.faceColor = action.payload.faceColor;
    },
  },
});

export const { addEssential, addDasicInfo, addFace } = signupSlice.actions;
export default signupSlice.reducer;

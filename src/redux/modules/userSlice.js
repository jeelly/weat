import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//유저 회원가입
export const signupDB = async (userInfo) => {
  try {
    const { data } = await axios.post(
      "http://43.200.21.225/api/users/signup",
      userInfo
    );
    console.log(data);
    return data;
  } catch (e) {
    alert(e.response.data.errorMessage);
  }
};

//유저 로그인
export const loginDB = async (userInfo) => {
  try {
    const { data } = await axios.post(
      "http://43.200.21.225/api/users/login",
      userInfo
    );
    localStorage.setItem("userToken", data.token);
    alert("토큰 저장 완료!");
  } catch (e) {
    alert(e.response.data.errorMessage);
  }
};

export const userInfoSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers: {},
});

export const postActions = userInfoSlice.actions;
export default userInfoSlice.reducer;

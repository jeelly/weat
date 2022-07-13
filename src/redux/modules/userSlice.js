import {createSlice} from '@reduxjs/toolkit'
import instance from '../../shared/axios'

export const loggedInDB = () => {
  return async function (dispatch) {
    const response = await instance.get("/api/users/me");
    console.log(response.data.user);
    dispatch(loginUserCheck(response.data.user));
  };
};

const userCheckSlice = createSlice({
    name: "loggedIn",
    initialState: {
      isLogin: false,
      userInfo: {
        userId: "",
        customerId: "",
        name: "",
        birthDay: "",
        email: "",
        nickname: "",
        faceColor: "",
        eyes: "",
      },
    },
    reducers: {
      loginUserCheck(state, action) {
        state.userInfo = action.payload;
      },
      loginCheck(state, action){
        state.isLogin = action.payload
      }
    },
  });


  export const {loginUserCheck, loginCheck} = userCheckSlice.actions;
  export default userCheckSlice.reducer
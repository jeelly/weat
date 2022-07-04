import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import instance from "../../shared/axios";

//미들웨어

// 게시글 불러오기
export const loadpostDB = () => {
  return async function (dispatch) {
    const response = await instance.get(`/post`);
    dispatch(loadpost(response.data[0].exhibit));
  };
};

const userSlice = createSlice({
  name: "post",
  initialState: {
    exhibit:[] ,
  },
  reducers: {
    loadpost: (state, action) => {
      console.log(action.payload)
      state.exhibit = [...action.payload];
    },
  },
});

export const { loadpost } = userSlice.actions;
export default userSlice.reducer;

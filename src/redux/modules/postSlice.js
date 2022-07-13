import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import instance from "../../shared/axios";

//미들웨어

// 게시글 불러오기
export const loadpostDB = () => {
  return async function (dispatch) {
    // const response = await instance.get(`/post`);
    // dispatch(loadpost(response.data[0].exhibit));
  };
};

const userSlice = createSlice({
  name: "post",
  initialState: {
    exhibit:[] ,
    itemAnimation:false,
    memberdel:false,
    editModal:{defult:false}
  },
  reducers: {
    loadpost: (state, action) => {
      console.log(action.payload)
    },
    itemAnimation: (state, action) => {
      state.itemAnimation = action.payload;
      console.log(state.itemAnimation)
    },
    editModal: (state, action) => {
      state.editModal = action.payload;
      console.log(action.payload)
    },
    memberdel: (state, action) => {
      state.memberdel = action.payload;
    }
  },
});

export const { loadpost, itemAnimation, editModal, memberdel } = userSlice.actions;
export default userSlice.reducer;

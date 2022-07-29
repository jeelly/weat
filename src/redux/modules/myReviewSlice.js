import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";


export const loadMyReviewDB = () =>{
  return async function (dispatch){
    try{
      const { data } = await instance.get("/api/review");
      dispatch(addMyReview(data.TheReview.sort(function (a, b) {
                  return a.LikeNum > b.LikeNum ? -1 : a.LikeNum < b.LikeNum ? 1 : 0;
                })))
    }catch(e){
      console.log(e)
    }
  }
}

const myReviewSlice = createSlice({
  name: "myReview",
  initialState: {
    myReview: []
  },
  reducers: {
    addMyReview(state, action){
      state.myReview = action.payload;
    }
  },
});

export const {addMyReview} = myReviewSlice.actions;
export default myReviewSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";

//검색해서 클릭한 맛집 데이터
export const loadMyStoreDB = (store) => {
  return async function (dispatch) {
    try{
      const response = await instance.get(`/api/store/${store.storeId}`);
      dispatch(loadMyStore({store:store, response:response.data.result}));
    }catch (error) {
      console.log(error);
    }
  };
};

const mapSlice = createSlice({
    name: "map",
    initialState: {
        loadMyStore:[],
        loadFirstStore:[],
        MyLatLng:[]
    },
    reducers: {
      //검색해서 클릭한 맛집 데이터
      loadMyStore: (state, action) => {
        console.log(action.payload)
        state.loadMyStore = [{...action.payload.response, ...action.payload.store}];
      },
      //검색해서 클릭한 등록 안된 맛집 데이터
      loadFirstStore: (state, action) => {
        console.log(action.payload)
        state.loadFirstStore = [action.payload];
      },
      //현재위치저장
      MyLatLng: (state, action) => {
        state.MyLatLng = action.payload;
      },
    },
  });
  
  export const { 
    MyLatLng, 
    loadMyStore,
    loadFirstStore
  } = mapSlice.actions;
  
  export default mapSlice.reducer;
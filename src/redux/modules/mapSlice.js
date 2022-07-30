import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";

//검색해서 클릭한 맛집 데이터
export const loadStoreRoomDB = () => {
  return async function (dispatch) {
    try{
      const response = await instance.get(`/api/store`);
      dispatch(loadStoreRoom(response.data.myRooms));
    }catch (error) {
      console.log(error);
    }
  };
};

//검색해서 클릭한 맛집 데이터 or 맛집 상세 조회 말풍선
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

// 특정 맛방의 맛집 전체 조회
export const loadRoomTagIconDB = (id) => {
  return async function (dispatch) {
    try{
      const response_room_detail = await instance.get(`/api/store/${id}/tagicon`);
      const detail = response_room_detail.data.result;
      dispatch(loadRoomTagIcon(detail));
    }catch (error) {
      console.log(error);
    }
  };
};

const mapSlice = createSlice({
    name: "map",
    initialState: {
        modalNum:false,
        loadMyStore:[],
        loadFirstStore:[],
        MyLatLng:[],
        loadStoreRoom:[],
        firstPost:[],
        loadRoomTagIcon:[]
    },
    reducers: {
      loadStoreRoom: (state, action) => {
        state.loadStoreRoom = action.payload;
      },
      // 특정 맛방의 맛집 전체 조회
      loadRoomTagIcon: (state, action) => {
        state.loadRoomTagIcon = action.payload;
      },
      //검색해서 클릭한 맛집 데이터
      loadMyStore: (state, action) => {
        state.loadMyStore = [{...action.payload.response, ...action.payload.store}];
      },
      //검색해서 클릭한 등록 안된 맛집 데이터
      loadFirstStore: (state, action) => {
        state.loadFirstStore = [action.payload];
      },
      //현재위치저장
      MyLatLng: (state, action) => {
        state.MyLatLng = action.payload;
      },
      //모달 숫자
      modalNum: (state, action) => {
        state.modalNum = action.payload;
      },
      //검색한 맛집데이터 스토어에 저장
      firstPost: (state, action) => {
        state.firstPost = action.payload;
      },
    },
  });
  
  export const {
    MyLatLng, 
    loadMyStore,
    loadFirstStore,
    modalNum,
    loadStoreRoom,
    firstPost,
    loadRoomTagIcon
  } = mapSlice.actions;
  
  export default mapSlice.reducer;
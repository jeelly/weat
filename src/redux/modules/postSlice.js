import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {instance, getAuthorizationHeader} from "../../shared/axios";

//미들웨어

// 게시글 불러오기
export const loadRoomDB = () => {
  return async function (dispatch) {
    try{
      const response = await instance.get("/api/rooms", { 
        headers: { Authorization: getAuthorizationHeader() }
      });
      console.log("미들웨어로드",response)
      const rooms = response.data.myRooms;
      const roms_total = response.data.total;
      dispatch(loadRoom({rooms, roms_total}));
    }catch (error) {
      console.log(error);
    }
  };
};

// 디테일 정보 불러오기
export const loadRoomDetailDB = (id) => {
  return async function (dispatch) {
    try{
      const response_room_detail = await instance.get(`/api/rooms/${id}`);
      const response_detail_users = await instance.get(`/api/rooms/${id}/users`);
      const response_detail_storeList = await instance.get(`/api/rooms/${id}/storeList`);
      const detail = response_room_detail.data.result;
      const users = response_detail_users.data.userInfo;
      const storeList = response_detail_storeList.data.result;
      dispatch(loadRoomDetail({detail, users, storeList}));
    }catch (error) {
      console.log(error);
    }
  };
};

// 메인페이지 맛방 순서 수정
export const mainRoomListPutDB = (contents_obj, items) => {
  return async function (dispatch) {
    try{
      const res = await instance.put(`/api/rooms/roomset`, contents_obj);
      console.log(items)
      dispatch(mainRoomListPut(items));
    }catch (error) {
      console.log(error);
    }
  };
};

// 맛방 맴버 강퇴
export const roomUserDelDB = (id, contents_obj) => {
  return async function (dispatch) {
    try{
      const res = await instance.put(`/api/rooms/${id}/kickUser`, contents_obj);
    }catch (error) {
      console.log(error);
    }
  };
};

// 맛방 Title 수정
export const roomTitlePutDB = (id, contents_obj) => {
  return async function (dispatch) {
    try{
      console.log(contents_obj)
      const res = await instance.put(`/api/rooms/${id}`, contents_obj);
      dispatch(roomTitlePut({id, contents_obj}));
    }catch (error) {
      window.alert(error.response.data.errorMessage);
      // console.log(error)
    }
  };
};

// 맛방 삭제
export const roomDeleteDB = (id) => {
  return async function (dispatch) {
    try{
      const res = await instance.delete(`/api/rooms/${id}`);
      console.log(res)
      dispatch(roomDelete(id));
    }catch (error) {
      console.log(error);
    }
  };
};

// 맛방 나가기
export const roomExitDB = (id) => {
  return async function (dispatch) {
    try{
      const res = await instance.put(`/api/rooms/${id}/exit`);
      dispatch(roomExit(id));
    }catch (error) {
      console.log(error);
    }
  };
};

// 맛방 초대
export const roomInviteDB = (id, userId, data) => {
  return async function (dispatch) {
    try{
      const res = await instance.put(`/api/rooms/${id}/invite`, userId);
      dispatch(roomInvite(data));
    }catch (error) {
      console.log(error);
    }
  };
};

const userSlice = createSlice({
  name: "post",
  initialState: {
    itemAnimation:false,
    memberdel:[],
    editModal:{defult:false},
    detailId:[],
    rooms:[],
    isloaded:false,
    _rooms:[] ,
    detail:{detail:{status:""}},
  },
  reducers: {
    //아이템 애니메이션
    itemAnimation: (state, action) => {
      state.itemAnimation = action.payload;
      console.log(state.itemAnimation)
    },
    //수정창 모달창
    editModal: (state, action) => {
      state.editModal = action.payload;
      console.log(action.payload)
    },
    //맴버 삭제
    memberdel: (state, action) => {
      state.memberdel = action.payload;
      state.inviteUser = state.inviteUser.filter((user) => (
        action.payload.id !== user.userId
      ))
      state.detail.users.guestInfo = state.detail.users.guestInfo.filter((user) => (
        action.payload.id !== user.userId
      ))
    },
    //방 불러오기 
    loadRoom: (state, action) => {
      console.log('리듀서',action.payload.rooms)
      state.rooms = action.payload.rooms
      state.isloaded = true
    },
    //방 디테일정보 불러오기 
    loadRoomDetail: (state, action) => {
      state.detail = action.payload
    },
    //디테일 아이디값 
    detailId: (state, action) => {
      state.detailId = action.payload
    },
    // 메인페이지 맛방 순서 수정
    mainRoomListPut: (state, action) => {
      console.log(action.payload)
      state.rooms = [...action.payload]
    },
    // 메인페이지 맛방 삭제
    roomDelete: (state, action) => {
      state.rooms = state.rooms.filter(room => room.roomId !== action.payload);
      state._rooms = action.payload;
    },
    // 메인페이지 맛방 나가기
    roomExit: (state, action) => {
        state.rooms = state.rooms.filter(room => room.roomId !== action.payload);
        state._rooms = action.payload;
    },
    // 메인페이지 타이틀 수정
    roomTitlePut: (state, action) => {
      const contents_obj = action.payload.contents_obj
      state.detail.detail = contents_obj
      state._rooms = Math.random();
    },
    // 맛방 초대
    roomInvite: (state, action) => {
      const user_data = action.payload.map((data) => {
                return {
                    eyes:data[1],
                    faceColor:data[2],
                    nickname:data[3],
                    userId:data[0]
                }
      })
      state.detail.users.guestInfo = [...state.detail.users.guestInfo, ...user_data]
    },
  },
});

export const { 
  loadRoom, 
  itemAnimation, 
  editModal, 
  memberdel, 
  loadRoomDetail, 
  detailId, 
  mainRoomListPut, 
  roomTitlePut, 
  roomDelete,
  roomExit,
  roomInvite
} = userSlice.actions;

export default userSlice.reducer;

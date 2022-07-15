import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../shared/axios";

const initialState = {
  tasteRoom: {
    roomName: "",
    emoji: "",
    invitedFriends: [],
  },
  emojiKey: false,
  searchResults: [],
};

export const friendDB = createAsyncThunk(
  "users/searchUser",
  async (searchInput) => {
    return instance
      .post("/api/rooms/findUser", { value: searchInput })
      .then((res) => {
        return res.data.result;
      })
      .catch((error) => console.log(error));
  }
);

const roomMakingSlice = createSlice({
  name: "tasteRoom",
  initialState,
  reducers: {
    addName(state, action) {
      state.tasteRoom.roomName = action.payload;
    },
    addEmoji(state, action) {
      state.tasteRoom.emoji = action.payload;
    },
    addFriends(state, action) {
      state.tasteRoom.invitedFriends = action.payload;
    },
    emojiKeyboardActivation(state, action) {
      state.emojiKey = action.payload;
    },
  },
  extraReducers: {
    [friendDB.pending]: (state, action) => {
      console.log("방 정보 대기 중");
    },
    [friendDB.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.searchResults = action.payload;
    },
    [friendDB.rejected]: (state, action) => {
      console.log("방 정보 불러오기 실패");
    },
  },
});

export const { addName, addEmoji, addFriends, emojiKeyboardActivation } =
  roomMakingSlice.actions;
export default roomMakingSlice.reducer;

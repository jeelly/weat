import { createSlice } from "@reduxjs/toolkit";

const emojiSlice = createSlice({
  name: "userEmoji",
  initialState: {
    emoji: "",
    emojiOnOff: false
  },
  reducers: {
    addEmoji(state, action) {
      state.emoji = action.payload;
    },
    keypad(state, action){
      state.emojiOnOff = action.payload
    }
  },
});

export const { addEmoji, keypad } = emojiSlice.actions;
export default emojiSlice.reducer;

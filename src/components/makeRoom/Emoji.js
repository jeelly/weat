import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { addEmoji } from "../../redux/modules/emojiSlice";
const Emoji = () => {
  const dispatch = useDispatch();
  const onEmojiClick = (event, emojiObject) => {
    dispatch(addEmoji(emojiObject.emoji));
  };
  return (
    <Picker
      onEmojiClick={onEmojiClick}
      pickerStyle={{ width: "100%" }}
      groupVisibility={{
        flags: false,
      }}
      id="emojiPicker"
    />
  );
};

export default Emoji;

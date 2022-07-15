import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { addEmoji } from "../../redux/modules/roomMakingSlice";
import '../../css/emojiPicker.css'
const Emoji = () => {
  const dispatch = useDispatch();
  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject)
    dispatch(addEmoji(emojiObject.emoji));
  };
  return (
    <Picker
      onEmojiClick={onEmojiClick}
      pickerStyle={{ width: "100%", height:'291px', position: "absolute", bottom:'0', zIndex:2}}
      groupVisibility={{
        flags: false,
      }}
      id="emojiPicker"
    />
  );
};

export default Emoji;

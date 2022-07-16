import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { addEmoji } from "../../redux/modules/roomMakingSlice";
import '../../css/emojiPicker.css'
import { roomTitlePutDB } from "../../redux/modules/postSlice";
const Emoji = ({id, detail}) => {
  const dispatch = useDispatch();
  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject)
    dispatch(addEmoji(emojiObject.emoji));
  };


  const EditonEmojiClick = (event, emojiObject) => {
    console.log(emojiObject)
    dispatch(addEmoji(emojiObject.emoji));
    const contents = {
      roomName:detail.roomName,
      emoji:emojiObject.emoji,
  };
    dispatch(roomTitlePutDB(id,contents));
  };

  return (
    <Picker
      onEmojiClick={id ? EditonEmojiClick : onEmojiClick}
      pickerStyle={{ width: "100%", height:'291px', position: "absolute", bottom:'0', zIndex:2}}
      groupVisibility={{
        flags: false,
      }}
      id="emojiPicker"
    />
  );
};

export default Emoji;

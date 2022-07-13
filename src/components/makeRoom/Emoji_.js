// import EmojiPicker from "./EmojiPicker";
// import { useState, useRef, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {addEmoji} from '../../redux/modules/emojiSlice'
// function Emoji(props) {
//   const dispatch = useDispatch();
//   const emojiRef = useRef(null);
//   const [emojiElement, setEmojiElement] = useState(null);
//   const [userEmoji, setUserEmoji] = useState(null);
//   const handleAddEmoji = (emoji) => {
//     dispatch(addEmoji(emoji.native))
//     console.log(emoji.native);
//     setEmojiElement(
//       <div
//         ref={emojiRef}
//         className="unVisibleemoji"
//         contentEditable={false}
//         dangerouslySetInnerHTML={emoji}
//         value={emoji}
//       />
//     );
//   };
//   useEffect(() => {
//     setUserEmoji(emojiElement ? emojiElement.props.value.native : null);
//   }, [emojiElement]);
// //   useEffect(() => {
// //     props.emojiChange(userEmoji);
// //   }, [userEmoji]);

//   console.log(userEmoji);
//   return (
//     <div>
//       <EmojiPicker onEmojiSelect={handleAddEmoji} />
//     </div>
//   );
// }

// export default Emoji;

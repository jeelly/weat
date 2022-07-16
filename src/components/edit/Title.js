import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import editdel from '../../img/EditDel.svg';
import EditEmoji from '../../img/EditEmoji.svg';
import black_round_plus from '../../img/black_round_plus.svg';
import { detailId, roomTitlePutDB } from '../../redux/modules/postSlice';
import { useDispatch, useSelector } from "react-redux";
import { emojiKeyboardActivation } from '../../redux/modules/roomMakingSlice';

const Title = ({detail, id}) => {
    const dispatch = useDispatch();
    const { tasteRoom } = useSelector(state => state.roomMaking);
    const emojiArea = useRef();
    const [inputValue, setInputValue] = useState(detail.roomName)

    useEffect(() => {
        dispatch(detailId({'id':id}));
    }, []);

    // const onChange = useCallback(e=> {
    //     e.preventDefault();
    //     setInputValue(e.target.value);
    // },[]);

    const onChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }
    
    const getInputData = () => {
        if(inputValue === "") {
            window.alert("제목을 입력해주세요")
            return;
        }
        const contents = {
            roomName:inputValue,
            emoji:tasteRoom.emoji,
        };
        return contents;
    }


    //upLoad시 리듀서에 보냄
    const upLoad = (e) => {
        const contents_obj = getInputData();
        dispatch(roomTitlePutDB(id, contents_obj))
    }

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            upLoad()
        }
      }


        //emoji+이미지 누르면 키보드 활성화
    const keypadOn = () => {
        dispatch(emojiKeyboardActivation(true));
    };

//이모지 출력부분과 이모지 키보드 부분을 뺀 나머지 영역을 클릭할경우 키패드 사라짐
    const setTarget = (e) => {
        const emojiKeypad = document.querySelector(".emoji-picker-react");
        if (
        emojiArea.current.contains(e.target) ||
        (emojiKeypad ? emojiKeypad.contains(e.target) : null)
        ) {
        return null;
        } else {
        dispatch(emojiKeyboardActivation(false));
        }
    };
    
    useEffect(() => {
        document.addEventListener("mousedown", setTarget);
      }, []);

    return (
        <Container onKeyPress={onCheckEnter}>
            <EmojiEdit onClick={keypadOn} ref={emojiArea}>
              {tasteRoom.emoji ? (
                tasteRoom.emoji
              ) : (
                <>
                    <img src={EditEmoji} alt="" />
                    <Emoji type="text" value={detail.emoji}/>
                    <BlackPlusBtn src={black_round_plus} alt="검정색원형버튼"></BlackPlusBtn>
                </>
              )}
            </EmojiEdit>
                <span>
                {/* <input type="text" style={{display:'none'}} /> */}
                    <TitleEdit type="text" placeholder={detail.roomName} value={inputValue} onChange={onChange} />
                    <button editdel={editdel} onClick={(e)=> {
                        e.preventDefault();
                        setInputValue('')
                    }}></button>
                    <hr/>
                </span>
        </Container>
    );
};

export default Title;

const Container = styled.form`
    display:flex;
    padding:0 16px;
    align-items:flex-end;
    margin-left:22px;
    input {
        background-color:transparent;
        /* border:none; */
        outline:none;
        &::placeholder {
            opacity:0.2;
        }
    }
    hr{
        border: 1px solid #2D2D2D;
        margin-top:6px;
    }
    span {
        position:relative;
        margin-left:24px;
        width:100%;
        button {
            border:none;
            background-color:transparent;
            width:20px;
            height:20px;
            cursor: pointer;
            background-image:url(${editdel});
            background-size:20px;
            background-position: center;
            position:absolute;
            top:0;
            right:0;
        }
    }
`

const EmojiEdit = styled.div `
    font-size:36px;
    width:48px;
    height:50px;
    position:relative;
`
const Emoji = styled.input`
    border:none;
    width:48px;
    height:50px;
    font-size:34px;
    position: absolute;
    top:50%;
    left:50%;
    top:0;
    left:0;
    opacity:0.5;
`
const BlackPlusBtn = styled.img `
    width:20px;
    height:20px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
`
const TitleEdit = styled.input `
        font-family: "AppleSDGothicNeoM00", sans-serif;
        text-align:left;
        display:block;
        width:100%;
        font-weight:300;
        font-size:26px;
        line-height:31px;
        background-color:transparent;
        border:none;
        outline:none;
        &::placeholder {
            opacity:0.2;
        }
`
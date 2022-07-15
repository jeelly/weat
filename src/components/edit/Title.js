import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import editdel from '../../img/EditDel.svg';
import { detailId, roomTitlePutDB } from '../../redux/modules/postSlice';
import { useDispatch } from "react-redux";

const Title = ({detail, id}) => {
    const dispatch = useDispatch();
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
            emoji:detail.emoji,
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

    return (
        <Container onKeyPress={onCheckEnter}>
            <div>{detail.emoji}</div>
                <span>
                <input type="text" style={{display:'none'}} />
                    <input type="text" placeholder={detail.roomName} value={inputValue} onChange={onChange} />
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
    div {
        font-size:36px;
    }
    input {
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
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {ReactComponent as Characterface} from '../../img/characterface.svg';
import diagonal from '../../img/diagonal.svg';
import { useDispatch, useSelector } from "react-redux";
import { editModal } from '../../redux/modules/postSlice';


const Member = ({nickname, faceColor, userId}) => {
    const dispatch = useDispatch();
    const memberdel = useSelector(state =>  state.post.memberdel)
    const [del, setDel] = useState(false);

    console.log(memberdel)
    console.log(userId)
    console.log(memberdel.id)
    useEffect(()=> {
        if(userId === memberdel.id) {
            setDel(memberdel.del)
        }
    },[memberdel])
    
    const delBtn = () => {
        dispatch(editModal({
            Member:true,
            userId:userId,
            nickname:nickname
        }))
    }

    return (
        <>
            <NewCharacterface fill={faceColor} onClick={delBtn}/>
            <DelImg del={del}></DelImg>
            <p>{nickname}</p>
        </>
    );
};

export default Member;

const NewCharacterface = styled(Characterface)`
    width:44px;
    height:44px;
    margin-bottom:10px;
    border-radius:50%;
    border:2px solid var(${({del}) => del? '--DEFAULT' : '--WHITE'});
    background-color:var(--WHITE);
    box-shadow:var(--SHADOW1);
    cursor:pointer;
    /* opacity:0.; */
`
// memberdel={memberdel}
const DelImg = styled.div`
        display:${({del})=> del ? 'block' : 'none'};
        width:44px;
        height:44px;
        /* background-color:blue; */
        background-image:url(${diagonal});
        background-size:44px;
        background-repeat:no-repeat;
        background-position:center;
        position: absolute;
        top:0;
        left:50%;
        transform:translate(-50%,0);
`
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import none from '../img/none.svg'

const None = () => {
    const navigate = useNavigate()
    return (
        <NonePageWrap>
            <img src={none} alt="" />
            <div>존재하지 않는 방입니다 :)</div>  
            <p onClick={()=>{navigate('/login')}}>홈으로 돌아가기</p>          
        </NonePageWrap>
    );
};

const NonePageWrap = styled.div` 
    background-color: #eee;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        margin-top:100px;
        margin-bottom: 50px;
    }
    div{
        font-family: "AppleSDGothicNeoSB";
        font-size: 20px;
        color: #D8D8D8;
    }
    p{
        border-bottom: 1px solid #777;
        color:#777;
        margin-top:15px;
        cursor: pointer;
    }


`

export default None;
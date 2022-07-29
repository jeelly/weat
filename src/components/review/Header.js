import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Gear from '../../img/fixed/white_Gear.svg'
import Xclose from '../../img/white_X_button.svg'
const Header = ({Room_query}) => {
    let navigator = useNavigate();
    return (
        <HeaderWrap>
                <div>
                    <img src={Gear} alt="톱니바퀴 아이콘"/>
                    {Room_query.data.data.myRooms
                    .filter((l)=> l.saveDone)
                    .filter((l,i)=> i < 1)
                    .map((room)=> (
                        <h3>{room.roomName} 외&nbsp;<span>{Room_query.data.data.total}개</span>&nbsp;맛방에 저장</h3>
                    ))}
                </div>
                <img src={Xclose} alt="닫기 아이콘" onClick={()=> navigator(-1)}/>
        </HeaderWrap>
    );
};

export default Header;

const HeaderWrap = styled.header`
    width:100%;
    background-color:var(--BLACK);
    height:52px;
    margin-bottom:20px;
    display:flex;
    padding-left:17px;
    justify-content:space-between;
    div {
        display:flex;
        justify-content:center;
        align-items:center;
    }

    h3 {
        color:white;
        font-family: 'AppleSDGothicNeoM';
        font-style: normal;
        font-size: 12px;
        display: flex;
        align-items: center;
        text-align: right;
        color: #FFFFFF;
        margin-left:5px;
    }
    h3 > span {
        color:#7F5FFF;
    }
    img:first-child {
        width:14px;
        height:14px;
    }
    img:last-child {
        width:14.34px;
        margin-right:20.83px;
    }
`
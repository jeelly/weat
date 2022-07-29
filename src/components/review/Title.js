import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Characterface} from '../../img/characterface.svg';
import { eyeList } from "../../components/signup/FaceResource";
import speech_bubble from "../../img/fixed/speech_bubble.svg";
import location_icon from "../../img/fixed/location_icon.svg";

const Title = ({Bubble_query}) => {
    const SearchUserEye = () => {
        return eyeList.filter((row) => row.includes(Bubble_query.eyes) && row);
    };


    return (
        <TitleWrap img={speech_bubble}>
                <PlaceName>{Bubble_query.storeName}</PlaceName>
                <AddressName>{Bubble_query.address}<span><img src={location_icon} alt="위치표시아이콘"/></span></AddressName>
                <UserInfo>
                    <CharacterfaceWrap eyes={SearchUserEye()}>
                        <NewCharacterface fill={Bubble_query.faceColor} />
                    </CharacterfaceWrap>
                    <p>{Bubble_query.nickname}님의 발견!</p>
                </UserInfo>
        </TitleWrap>
    );
};

export default Title;

const TitleWrap = styled.ul`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:258px;
    height:113px;
    background-image:url(${({img})=> img});
    background-size:258px 113px;
    background-position:center;
`
const PlaceName = styled.li`
    margin:22px 0 4px 0;
    font-family: 'AppleSDGothicNeoB';
    font-style: normal;
    font-size: 24px;
    line-height: 29px;
    color:var(--BLACK);
`
const AddressName = styled.li`
    font-family: 'AppleSDGothicNeoM';
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
    color:var(-DEFAULT);
    display:flex;
    align-items:center;
    span{
        width:16px;
        height:16px;
        margin-left:6px;
    }
`
const UserInfo = styled.li`
    display:flex;
    align-items:flex-end;
    position:absolute;
    bottom:-13px;
    left:20px; 
    p {
        font-family: 'AppleSDGothicNeoB';
        font-style: normal;
        font-size: 12px;
        line-height: 160%;
        color:var(--BLACK); 
    }
`

const CharacterfaceWrap = styled.div`
    width:40px;
    height:40px;
    background-color:var(--WHITE);
    border-radius:50%;
    box-shadow:var(--SHADOW1);
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    margin-right:9.82px;
    &::before{
        content:"";
        width:36.36px;
        height:36.36px;
        background-image:url(${({eyes})=> eyes});
        background-repeat:no-repeat;
        background-size:36.36px;
        position:absolute;
        top:0;
        left:50%;
        transform:translateX(-50%);
    }
`
const NewCharacterface = styled(Characterface)`
    width:36.36px;
    height:36.36px;   
`
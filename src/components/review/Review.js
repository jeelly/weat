import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StarIcon from '../star_rating/StarIcon';
import flag from '../../img/fixed/white_flag.svg'
import {ReactComponent as Characterface} from '../../img/characterface.svg';
import { eyeList } from "../../components/signup/FaceResource";
import LikeToggleBtn from '../LikeToggleBtn';

const createArray = () => [...Array(5)];
const Review = ({data}) => {
    const [color, setColor] = useState()
    const [fontcolor, setFontColor] = useState()
    const SearchUserEye = (eyes) => {
        return eyeList.filter((row) => row.includes(eyes) && row);
    };

    useEffect(()=>{
        Likecolor();  
    },[])
    const Likecolor = (like) => {
        if(!like) {
            setColor('#8729FF')
            setFontColor('#FFFFFF')
        }else {
            setColor('#FFFFFF')
            setFontColor('#000000')
        }
    }

    return (
        <Container>
            <h3>맛 마디</h3>
            <ReviewContainer>
                <ReviewTagWrap>
                    {data.map((arr, idx)=>(
                        <div>
                        <LikeWrap onClick={()=> Likecolor(arr.likeDone)} >
                        <LikeToggleBtn likeNum={arr.likeNum} madiId={arr.madiId} Review='review' likeDone={arr.likeDone}/>
                        </LikeWrap>
                        <ReviewItem key={idx} flag={flag} likeDone={color} fontcolor={fontcolor}>
                            <ImgWrap>
                                <img src={arr.imgURL[0]} alt='음식사진'/>
                            </ImgWrap>
                            <RankWrap>
                                {createArray().map((star, i)=> (
                                    <StarIcon key={i} selected={arr.star > i} color={!arr.likeDone ? 'black' : '#fff'} size='16px'/>
                                ))}
                            </RankWrap>
                            <p>"{arr.comment}"</p>
                        </ReviewItem>
                        <UserInfo>
                            <CharacterfaceWrap eyes={SearchUserEye(arr.eyes)}>
                                <NewCharacterface fill={arr.faceColor} />
                            </CharacterfaceWrap>
                            <p>{arr.nickname}님의 발견!</p>
                        </UserInfo>
                        </div>
                    ))}
                </ReviewTagWrap>
            </ReviewContainer>
        </Container>
    );
};

export default Review;

const LikeWrap = styled.div`
    position:absolute;
    top:100px;
    right:50%;
    transform:translate(50%,0);
    padding-left:10px;
    z-index:1;
`
const Container = styled.article`
    margin-top:40px;
    /* margin-bottom:50px; */
    display:flex;
    flex-direction:column;
    /* align-items:center; */
    /* width:360px; */
    h3 {
        margin-left:16px;
        font-family:'AppleSDGothicNeoSB';
        font-style:normal;
        font-weight:500;
        font-size: 18px;
        line-height: 160%;
        color:var(--BLACK)
    }
`
const ReviewContainer = styled.div`
    display:flex;
`

const ReviewTagWrap = styled.ul`
    display:flex;
    width:360px;
    padding-right:8px;
    overflow:auto;
    white-space:nowrap;
    &::-webkit-scrollbar {
    height:0px;
    position:absolute;
    top:0;
    left:0;
    }
    &::-webkit-scrollbar-thumb {
        background:transparent;
    }
    &::-webkit-scrollbar-track {
        background:transparent;
    }
    > div {
        position:relative;
        height:272px;
    }
`

const ReviewItem = styled.li`
    overflow:hidden;
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:188px;
    min-width: 188px;
    height:217px;
    box-shadow:var(--SHADOW1);
    margin:10px 6px 6px 16px;
    border-radius:20px;
    /* background-color:blue; */
    background-color:${({likeDone})=> likeDone};
    /* background-size:188px 233px; */
    p {
        font-family: 'AppleSDGothicNeoUL';
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 160%;
        color:${({fontcolor})=> fontcolor}
    }
    &::after {
        content:'';
        background-image:url(${({flag})=> flag});
        width:12px;
        height:14px;
        position:absolute;
        top:12px;
        right:12px;
    }
`

const ImgWrap = styled.div`
    background:var(--BLACK);
    width:188px;
    height:106px;
    min-height: 106px;
    img {
            width:188px;
            height:106px;
            object-fit: cover;
            opacity:0.5;
            background-color:black;
        }
`

const RankWrap = styled.div`
    margin:37px 0 8px 0;
    display: flex;
    justify-content: center;
`

const UserInfo = styled.li`
    display:flex;
    align-items:flex-end;
    position:absolute;
    bottom:16px;
    left:28px; 
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
    margin-bottom:3px;
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
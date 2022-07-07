import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as Characterface} from '../img/characterface.svg';
import positionShift from '../img/positionShift.svg';
import plus from '../img/plus.svg';
import donut from '../img/donut.svg';
import flag from '../img/fixed/flag.svg';
import close from '../img/main_modal_close.svg';
import {Container, Btn} from '../css/Style'
import MainModal from '../components/main/MainModal';
import { ReactPortal } from '..';

const Main = () => {
    const [modal, setModal] = useState(false)
    return (
        <Container>
         <article>
            <UserInfo>
                <li>
                    <p>아침식사 하셨나요?</p>
                    <strong>매콤한 오소리</strong><span>님</span>
                </li>
                <li>
                <NewCharacterface fill="#23C7C7"/>
                </li>
            </UserInfo>
         </article>
         <Convenience>
            <Total>Total <strong>6</strong></Total>
            <MoveIcon image={positionShift}>길게 눌러 위치이동</MoveIcon> 
         </Convenience>

        <Grid>
         <PostLinkWrap>
            <PostLink to="/post">새로운 맛방을<br/>만들어보세요</PostLink>
         </PostLinkWrap>
         <PostLinkWrap>
            <PostLink to="/detail">임시<br/>디테일 페이지</PostLink>
         </PostLinkWrap>
         <PostLinkWrap>
            <PostLink to="/signup">임시<br/>회원가입 페이지</PostLink>
         </PostLinkWrap>
         </Grid>

            <ReactPortal>
                <MainModal/>
            </ReactPortal>
            {/* <PostList>
                <PostItem>
                    <PostItemInner>
                        <li><IconImg src={flag} alt="깃발아이콘"/></li>
                        <li><h3>나만알거야 디저</h3></li>
                        <li><EmojiImg src={donut} alt="도넛아이콘"/></li>
                        <li><p><span>3</span> members</p></li>
                    </PostItemInner>
                </PostItem>
            </PostList> */}

            <CreateModal modal={modal}>
                <ModalBtn>공유<br/>코드</ModalBtn>
                <ModalBtn>맛방<br/>편집</ModalBtn>
                <ModalBtn>맛방<br/>만들기</ModalBtn>
            </CreateModal>
            <CreateBtn plus={plus} close={close} modal={modal} onClick={()=> {
                modal?setModal(false):setModal(true)
            }}>plus</CreateBtn>
        </Container>
    );
};

export default Main;

const NewCharacterface = styled(Characterface)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    width:100px;
    height:100px;
`

// 유저정보
const UserInfo = styled.ul`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:24.33px 0 29px 0;
    li {
        text-align:left;
    }
    li > p {
        font-size:14px;
        line-height:22px;
        font-weight:200;
        text-align:left;
        margin-bottom:8px;
    }
    li > strong {
        font-size:30px;
        font-weight:400;
        line-height:36px;
        letter-spacing: -0.02em;
    }
    li > span {
        font-size:30px;
        font-weight:400;
        line-height:36px;
        letter-spacing: -0.02em;
    }
`

// 편의
const Convenience = styled.article`
    display:flex;
    justify-content:space-between;
    
`
const Total = styled.p`
        font-size:12px;
        font-weight:300;
        line-height:16px;
        text-transform:capitalize;
        color:#2D2D2D;
`

const MoveIcon = styled.p`
    font-size:12px;
    color:#999999;
    line-height:22px;
    &:after{
        content:"positionShift";
        display:inline-block;
        text-indent:-9999px;
        width:18px;
        height:22px;
        background-image:url(${({image}) => image});
        background-repeat:no-repeat;
        background-size:18px 14px;
        background-position:center;
        margin-left:7px;
    }
`
// 글쓰기 페이지

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-top:19px;
    /* grid-auto-rows: minmax(320px, auto); */
`
const PostLinkWrap = styled.article`
    display:flex;
    justify-content: center;
    align-items:center;
    text-align:center;
    width:160px;
    height:180px;
    background-color:var(--WHITE);
    border-radius:20px;
    box-shadow: 0px 2px 2px rgba(153, 153, 153, 0.2), 0px 3px 1px rgba(153, 153, 153, 0.2), 0px -2px 5px rgba(153, 153, 153, 0.2);
`
const PostLink = styled(Link)`
    display:flex;
    text-decoration:none;
    justify-content: center;
    align-items:center;
    color:#7F5FFF;
    font-size:14px;
    line-height:160%;
    letter-spacing:-0.02em;
    width:152px;
    height:172px;
    border:dashed 2px #7F5FFF;
    border-radius:20px;
`

const CreateBtn = styled.button`
    width:80px;
    height:80px;
    background-color:var(--BLACK);
    border-radius:50%;
    position:absolute;
    right:16px;
    bottom:20px;
    cursor:pointer;
    text-indent:-9999px;
    background-image:url(${({plus, close, modal}) => !modal?plus:close});
    background-repeat: no-repeat;
    background-position:center;
    background-size:24px;
`

const CreateModal = styled.div`
    display:${({modal}) => !modal ?'none':'block'};
    opacity: 0.9;
    width:100%;
    height:100vh;
    background-color:var(--WHITE);
    position:absolute;
    top:0;
    right:0;
    button:nth-child(2) {
        bottom:208px;
    }
    button:nth-child(1) {
        bottom:292px;
    }
`

const ModalBtn = styled.button`
    width:68px;
    height:68px;
    border-radius:50%;
    font-size:12px;
    line-height:20px;
    letter-spacing: -0.02em;
    border: 2px solid var(--BLACK);
    background-color:var(--WHITE);
    position:absolute;
    bottom:124px;
    right:22px;
`


const PostList = styled.article``
const PostItem = styled.div`
    width:160px;
    height:180px;
    border-radius:20px;
    box-shadow: 0px 6px 10px rgba(153, 153, 153, 0.2), 0px 1px 18px rgba(153, 153, 153, 0.2), 0px 3px 5px rgba(153, 153, 153, 0.2);
    display:flex;
    align-items:center;
    justify-content:center;
`
const PostItemInner = styled.ul`
    width:152px;
    height:172px;
    border:2px solid #FF7337;
    border-radius: 16px;
    position:relative;
    li {
        text-align:center;
    }
    li > h3 {
        width: 78px;
        height: 44px;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        text-transform: capitalize;
        margin:36px auto 16px auto;
        color:var(--BLACK)
    }
    li > p {
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        /* identical to box height */
        text-align: center;
        letter-spacing: -0.02em;
        color:var(--BLACK);
        margin-top:12px;
    }
`

const IconImg = styled.img`
    width:12px;
    height:16px;
    position:absolute;
    right:14px;
    top:12px;
    
`

const EmojiImg = styled.img`
    margin:0 auto;
`
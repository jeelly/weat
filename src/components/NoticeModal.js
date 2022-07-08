import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../css/Style';
import close from '../img/close.svg'
const NoticeModal = ({modal, setModal}) => {
    return (
            <Modal modal={modal}>
                <NewContainer>
                    <CloseBtn close={close} onClick={()=> {setModal(false)}}>닫기 버튼</CloseBtn>
                    <ContentItem>
                        <Content>
                            <ContentText >회먹는 물고기님이 새로운 기록 <LinkStyle to="/">2곳</LinkStyle>을 <LinkStyle to="/">회사근처 밥집</LinkStyle>에 등록하셨어요!</ContentText>
                            <ContentTime>23분전</ContentTime>
                        </Content>
                    </ContentItem>
                    <ContentItem>
                        <Content>
                            <ContentText >회먹는 물고기님이 새로운 기록 <LinkStyle to="/">2곳</LinkStyle>을 <LinkStyle to="/">회사근처 밥집</LinkStyle>에 등록하셨어요!</ContentText>
                            <ContentTime>23분전</ContentTime>
                        </Content>
                    </ContentItem>
                    <ContentItem>
                        <Content>
                            <ContentText >회먹는 물고기님이 새로운 기록 <LinkStyle to="/">2곳</LinkStyle>을 <LinkStyle to="/">회사근처 밥집</LinkStyle>에 등록하셨어요!</ContentText>
                            <ContentTime>23분전</ContentTime>
                        </Content>
                    </ContentItem>
                    <ContentItem>
                        <Content>
                            <ContentText >회먹는 물고기님이 새로운 기록 <LinkStyle to="/">2곳</LinkStyle>을 <LinkStyle to="/">회사근처 밥집</LinkStyle>에 등록하셨어요!</ContentText>
                            <ContentTime>23분전</ContentTime>
                        </Content>
                    </ContentItem>
                    <ContentItem>
                        <Content>
                            <ContentText >회먹는 물고기님이 새로운 기록 <LinkStyle to="/">2곳</LinkStyle>을 <LinkStyle to="/">회사근처 밥집</LinkStyle>에 등록하셨어요!</ContentText>
                            <ContentTime>23분전</ContentTime>
                        </Content>
                    </ContentItem>
                </NewContainer>
            </Modal>
    );
};

export default NoticeModal;

const NewContainer = styled(Container)`
    padding-top:76px;
`
const Modal = styled.article`
    display:${({modal}) => modal ?'block' : 'none' };
    width:81.111%;
    height:100vh;
    background-color:var(--LIGHTEST);
    box-shadow:var(--SHADOW3);
    position:absolute;
    top:0;
    right:0;
    z-index:101;
`
const CloseBtn = styled.button`
    background-image:url(${({close})=> close});
    background-repeat:no-repeat;
    background-position:center;
    background-size:16.73px 16.73px;
    width:16.73px;
    height: 16.73px;
    text-indent:-9999px;
    border:none;
    position:absolute;
    top:17.63px;
    right:21.63px;
    cursor:pointer;
`
const ContentItem = styled.div`
    &::after {
        content:'';
        display:block;
        width:100%;
        height:0px;
        border: 1px solid #CCCCCC;
        margin:20px 0;
    }
    &:last-child::after {
        display:none;
    }
`

const Content = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 160%;
    
`
const ContentText = styled.p`
    width:69.863%;
`
const ContentTime =styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color:var(--DEFAULT);
`
const LinkStyle = styled(Link)`
    color:#7F5FFF;
    &:last-child {
        text-decoration:none;
    }
`
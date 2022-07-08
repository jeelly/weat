import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainDefault = () => {
    return (
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
    );
};

export default MainDefault;

// 글쓰기 페이지

const Grid = styled.div`
    display: grid;
    width:328px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin:19px auto 0 auto;
    /* grid-auto-rows: minmax(312px, auto); */
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
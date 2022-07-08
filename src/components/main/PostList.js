import React from 'react';
import styled from 'styled-components';

import donut from '../../img/donut.svg';
import flag from '../../img/fixed/flag.svg';

const PostList = () => {
    return (
        <Container>
            <PostList>
                <PostItem>
                    <PostItemInner>
                        <li><IconImg src={flag} alt="깃발아이콘"/></li>
                        <li><h3>나만알거야 디저</h3></li>
                        <li><EmojiImg src={donut} alt="도넛아이콘"/></li>
                        <li><p><span>3</span> members</p></li>
                    </PostItemInner>
                </PostItem>
            </PostList>
        </Container>
    );
};

export default PostList;

const Container = styled.article``
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
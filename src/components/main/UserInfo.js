import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Characterface} from '../../img/characterface.svg';

const UserInfo = () => {
    return (
        <article>
            <Container>
                <li>
                    <p>아침식사 하셨나요?</p>
                    <strong>매콤한 오소리</strong><span>님</span>
                </li>
                <li>
                <NewCharacterface fill="#23C7C7"/>
                </li>
            </Container>
        </article>
    );
};

export default UserInfo;

const NewCharacterface = styled(Characterface)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    width:100px;
    height:100px;
    margin-left:67px;
`

// 유저정보
const Container = styled.ul`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:360px;
    margin:24.33px auto 29px auto;
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
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {ReactComponent as Characterface} from '../../img/characterface.svg';

const UserInfo = ({user}) => {

    return (
        <article>
            <Container>
                <li>
                    <p>아침식사 하셨나요?</p>
                    <strong>{user.customerId}</strong><span>님</span>
                </li>
                <li>
                <NewCharacterface fill={user.faceColor}/>
                </li>
            </Container>
        </article>
    );
};

export default UserInfo;

// 유저정보
const Container = styled.ul`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:328px;
    margin:24.33px auto 29px auto;
    li {
        text-align:left;
    }
    li > p {
        font-family: "AppleSDGothicNeoL";
        font-size:14px;
        line-height:22px;
        font-weight:200;
        text-align:left;
        margin-bottom:8px;
    }
    li > strong {
        font-family: "AppleSDGothicNeoM";
        font-size:26px;
        font-weight:400;
        line-height:36px;
        letter-spacing: -0.02em;
    }
    li > span {
        font-family: "AppleSDGothicNeoL";
        font-size:26px;
        font-weight:400;
        line-height:36px;
        letter-spacing: -0.02em;
    }
`

const NewCharacterface = styled(Characterface)`
    width:100px;
    height:100px;
    margin-left:67px;
`
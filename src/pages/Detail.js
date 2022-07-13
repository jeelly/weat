import React from 'react';
import styled from 'styled-components';
import {Container} from '../css/Style'

import house from '../img/house.svg';

import Members from '../components/detail/Members'
import RestaurantList from '../components/detail/RestaurantList'
import { Link } from 'react-router-dom';
const Detail = () => {
    return (
        <NewContainer>
            <Title>
                <div>🤡</div>
                <h2>회사근처맛집<hr/>
                </h2>
            </Title>
            <Members/>
            <RestaurantList/>
            <RestaurantAdd to="/post"><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
        </NewContainer>
    );
};

export default Detail;

const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    background-color:#FF7337 ;
    /* overflow: hidden; */
    /* height:100vh; */
    /* width:360px; */
    padding:0;
`
const Title = styled.div`
    display:flex;
    padding:0 16px;
    align-items:flex-end;
    margin-left:22px;
    div {
        font-size:36px;
    }
    h2 {
        text-align:left;
        display:block;
        width:100%;
        margin-left:24px;
        font-weight:300;
        font-size:26px;
        line-height:31px;
    }
    hr{
        border: 1px solid #2D2D2D;
        margin-top:6px;
    }
`

const RestaurantAdd = styled(Link)`
    width: 133px;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 10px 24px;
    gap: 8px;
    background:#7F5FFF;
    border-radius: 50px;

    text-decoration:none;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color:var(--LIGHTEST);
    position:fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom:31px;
`
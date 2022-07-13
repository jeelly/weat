import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {Container} from '../css/Style'
import house from '../img/house.svg';
import editdel from '../img/EditDel.svg';

import Members from '../components/edit/Members'
import RestaurantList from '../components/edit/RestaurantList'
import { Link } from 'react-router-dom';
import Modal from '../components/edit/Modal';
const Detail = () => {
    const [inputValue, setInputValue] = useState('회사근처맛집')
    const onChange = useCallback(e=> {
        setInputValue(e.target.value)
    },[]);
    return (
        <NewContainer>
            <Title>
                <div>🤡</div>
                <span>
                    {/* <input type="text" placeholder='회사근처맛집' defaultValue={inputValue}/> */}
                    <input type="text" placeholder='회사근처맛집' value={inputValue} onChange={onChange}/>
                    <button editdel={editdel} onClick={()=> {
                        setInputValue('')
                    }}></button>
                    <hr/>
                </span>
            </Title>
            <Members/>
            <RestaurantList/>
            <RestaurantAdd to="/post"><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
            <Modal/>
        </NewContainer>
    );
};

export default Detail;

const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
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
    input {
        font-family: "AppleSDGothicNeoM00", sans-serif;
        text-align:left;
        display:block;
        width:100%;
        font-weight:300;
        font-size:26px;
        line-height:31px;
        background-color:transparent;
        border:none;
        &::placeholder {
            opacity:0.2;
        }
    }
    hr{
        border: 1px solid #2D2D2D;
        margin-top:6px;
    }
    span {
        position:relative;
        margin-left:24px;
        width:100%;
        button {
            border:none;
            background-color:transparent;
            width:20px;
            height:20px;
            cursor: pointer;
            background-image:url(${editdel});
            background-size:20px;
            background-position: center;
            position:absolute;
            top:0;
            right:0;
        }
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


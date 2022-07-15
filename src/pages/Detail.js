import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Container} from '../css/Style'
import { loadRoomDetailDB, detailId } from "../redux/modules/postSlice";
import { useDispatch, useSelector } from "react-redux";

import house from '../img/house.svg';

import Members from '../components/detail/Members'
import RestaurantList from '../components/detail/RestaurantList'
import { Link, useParams } from 'react-router-dom';
import Title from '../components/detail/Title';
import { VioletRoundButton } from '../css/Style'

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {detail, users, storeList} = useSelector(state => state.post.detail);
    const aa = useSelector(state => state.post.detail);
    
    const [isloaded, setIsloaded] = useState(false);
    useEffect(() => {
    }, []);

    useEffect(() => {
        const detail_load = async () => {
            await dispatch(loadRoomDetailDB(id));
            setIsloaded(true)
        }
        detail_load();

      }, []);

    return (
        <NewContainer status={detail?.status}>
            {isloaded && <Title detail={detail} id={id}/>}
            {isloaded && <Members users={users} />}
            {isloaded && <RestaurantList storeList={storeList} id={id} />}
            <RestaurantAdd to="/post"><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
        </NewContainer>
    );
};

export default Detail;

const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    background-color:${({status}) => status==='publicOwner'?'#FF7337': status==='publicGuest'? '#23C7C7' : '#FFBB55'} ;
    //status==='publicOwner'?'#FF7337': status==='publicGuest'? '#23C7C7' : '#FFBB55'
    padding:0;
`


const RestaurantAdd = styled(VioletRoundButton)`
    padding:14px 27px 14px 24px;
`
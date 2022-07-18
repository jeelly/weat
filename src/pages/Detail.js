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
import SearchBar from '../components/makeRoom/SearchBar';
import Header from '../components/Header';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {detail, users, storeList} = useSelector(state => state.post.detail);
    const [serchBar, setSerchBar] = useState(false);
    const isloaded = useSelector(state => state.post.detail_isloaded);
    const inviteUser = useSelector(state => state.post.inviteUser);
    console.log(users)
    useEffect(() => {
        const detail_load = async () => {
            await dispatch(loadRoomDetailDB(id));
            // dispatch(detailId(id));
        }
        detail_load();
      }, []);
    console.log(detail.users?.guestInfo)
    return (
        <NewContainer status={detail?.status}>
            <Header id={id} status={detail.status} roomName={detail.roomName}/>
            {isloaded && <Title detail={detail} id={id}/>}
            {isloaded && <Members inviteUser={inviteUser} users={users} setSerchBar={setSerchBar}/>}
            {isloaded && <RestaurantList storeList={storeList} id={id} />}
            <RestaurantAdd to="/post"><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
            <SearchBar id={id} serchBar={serchBar} setSerchBar={setSerchBar}/>
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
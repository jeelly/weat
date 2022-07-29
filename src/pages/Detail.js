import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Container} from '../css/Style'
import { loadRoomDetailDB, detailId, findRoomCode } from "../redux/modules/postSlice";
import { useDispatch, useSelector } from "react-redux";

import house from '../img/house.svg';

import Members from '../components/detail/Members'
import RestaurantList from '../components/detail/RestaurantList'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Title from '../components/detail/Title';
import { VioletRoundButton } from '../css/Style'
import SearchBar from '../components/makeRoom/SearchBar';
import Header from '../components/Header';
import { modalNum } from '../redux/modules/mapSlice';

const Detail = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const {detail, users, storeList} = useSelector(state => state.post.detail);
    const [serchBar, setSerchBar] = useState(false);
    const isloaded = useSelector(state => state.post.detail_isloaded);
    const inviteUser = useSelector(state => state.post.inviteUser);
    const modalRD = useSelector(state => state.map.modalNum); // 모달리덕스라는 뜻 
    console.log(users)
    useEffect(() => {
        const detail_load = async () => {
            await dispatch(loadRoomDetailDB(id));
            // dispatch(detailId(id));
            await dispatch(findRoomCode(id))
        }
        detail_load();
      }, []);
    
    const SearchModal = async () => {
        await dispatch(modalNum(modalRD?false:true))
        navigate('/map')
    }

    return (
        <NewContainer status={detail?.status}>
            <Header id={id} status={detail.status} roomName={detail.roomName}/>
            {isloaded && <Title detail={detail} id={id}/>}
            {isloaded && <Members inviteUser={inviteUser} users={users} setSerchBar={setSerchBar}/>}
            {isloaded && <RestaurantList status={detail?.status} storeList={storeList} id={id} />}
            <RestaurantAdd onClick={SearchModal}><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
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
    height:100vh;
`


const RestaurantAdd = styled(VioletRoundButton)`
    padding:14px 27px 14px 24px;
`
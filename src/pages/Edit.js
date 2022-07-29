import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import {Container} from '../css/Style'
import house from '../img/house.svg';
import Members from '../components/edit/Members'
import RestaurantList from '../components/edit/RestaurantList'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/edit/Modal';
import Title from '../components/edit/Title';
import { detailId, loadRoomDetailDB } from '../redux/modules/postSlice';
import Emoji from '../components/makeRoom/Emoji';
import SearchBar from '../components/makeRoom/SearchBar';
import Header from '../components/Header';
import { modalNum } from '../redux/modules/mapSlice';

const Edit = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const {detail, users } = useSelector(state => state.post.detail);
    const isloaded = useSelector(state => state.post.detail_isloaded);
    const { emojiKey, tasteRoom } = useSelector(state => state.roomMaking);
    const [serchBar, setSerchBar] = useState(false);
    const inviteUser = useSelector(state => state.post.inviteUser);
    const modalRD = useSelector(state => state.map.modalNum); // 모달리덕스라는 뜻 

    useEffect(() => {
        const detail_load = async () => {
            await dispatch(loadRoomDetailDB(id));
            // dispatch(detailId(id));
        }
        detail_load();
      }, []);
    
    const SearchModal = async () => {
        await dispatch(modalNum(modalRD?false:true))
        navigate('/map')
    }
    return (
        <NewContainer>
            <Header id={id} status={detail.status} roomName={detail.roomName}/>
            {isloaded && <Title detail={detail} id={id} />}
            {isloaded && <Members inviteUser={inviteUser} users={users} setSerchBar={setSerchBar}/>}
            {isloaded && <RestaurantList id={id} />}
            <RestaurantAdd onClick={SearchModal}><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
            <Modal id={id}/>
            {emojiKey ? <Emoji detail={detail} id={id}/> : null}
            <SearchBar id={id} serchBar={serchBar} setSerchBar={setSerchBar}/>
        </NewContainer>
    );
};

export default Edit;

const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    padding:0;
`

const RestaurantAdd = styled.div`
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


import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import {Container} from '../css/Style'
import house from '../img/house.svg';
import Members from '../components/edit/Members'
import RestaurantList from '../components/edit/RestaurantList'
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/edit/Modal';
import Title from '../components/edit/Title';
import { detailId, loadRoomDetailDB } from '../redux/modules/postSlice';
import Emoji from '../components/makeRoom/Emoji';
import SearchBar from '../components/makeRoom/SearchBar';

const Edit = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {detail, users, storeList} = useSelector(state => state.post.detail);
    const [isloaded, setIsloaded] = useState(false);
    const { emojiKey, tasteRoom } = useSelector(state => state.roomMaking);
    const [serchBar, setSerchBar] = useState(false);
    const inviteUser = useSelector(state => state.post.inviteUser);

    console.log(users)
    useEffect(() => {
        const detail_load = async () => {
            await dispatch(loadRoomDetailDB(id));
            dispatch(detailId(id));
            setIsloaded(true)
        }
        detail_load();
      }, []);
      console.log(users?.guestInfo)
      console.log(inviteUser)
    return (
        <NewContainer>
            {isloaded && <Title detail={detail} id={id} />}
            {isloaded && <Members inviteUser={inviteUser} users={users} setSerchBar={setSerchBar}/>}
            {isloaded && <RestaurantList id={id}  storeList={storeList} />}
            <RestaurantAdd to="/post"><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
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


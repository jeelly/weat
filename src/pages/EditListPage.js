import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import RestaurantList from '../components/edit/RestaurantList';
import { Container } from '../css/Style';
import { useSelector, useDispatch } from "react-redux";
import { loadRoomDetailDB } from '../redux/modules/postSlice';
import Header from '../components/Header';

const EditListPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {storeList, detail} = useSelector(state => state.post.detail);
    const [isloaded, setIsloaded] = useState(false);

    useEffect(() => {
        const detail_load = async () => {
            await dispatch(loadRoomDetailDB(id));
            setIsloaded(true)
        }
        detail_load();
      }, []);

    return (
        <NewContainer>
            <Header id={id} status={detail.status} roomName={detail.roomName}/>
            {isloaded && <RestaurantList storeList={storeList} listPage={true}/>}
        </NewContainer>
    );
};

export default EditListPage;

const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    overflow: hidden;
    padding:0;
`
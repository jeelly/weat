import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RestaurantList from '../components/detail/RestaurantList';
import { Container } from '../css/Style';
import { useSelector, useDispatch } from "react-redux";
import { detailId, loadRoomDetailDB } from '../redux/modules/postSlice';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const ListPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {storeList} = useSelector(state => state.post.detail);
    const [isloaded, setIsloaded] = useState(false);
    const {detail} = useSelector(state => state.post.detail);
    
    useEffect(() => {
        const detail_load = async () => {
            await dispatch(loadRoomDetailDB(id));
            setIsloaded(true)
        }
        detail_load();
        
        dispatch(detailId(
            {
                'id':id,
                'status':detail.status,
                'roomName':detail.roomName
        }));
      }, []);

    return (
        <NewContainer status={detail.status}>
            <Header id={id} status={detail.status} roomName={detail.roomName}/>
            {isloaded && <RestaurantList storeList={storeList} listPage={true}/>}
        </NewContainer>
    );
};

export default ListPage;
const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    background-color:${({status}) => status==='publicOwner'?'#FF7337': status==='publicGuest'? '#23C7C7' : '#FFBB55'};
    overflow: hidden;
    padding:0;
`
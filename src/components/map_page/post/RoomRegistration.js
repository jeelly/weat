import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FooterBtn } from '../../../css/Style';
import Modal from './Modal';
import circle_owner from '../../../img/circle__owner.svg';
import circle_private from '../../../img/circle_private.svg';
import circle_guest from '../../../img/circle_guest.svg';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationItem from './RegistrationItem';
import { postData, RegistrationData } from '../../../redux/modules/postSlice';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavi from '../../BottomNavi';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import instance from '../../../shared/axios';

const RestaurantRoomSaveDB = (data) => {
    return instance.post("/api/store/saverooms", data);
}

const RoomRegistration = () => {
    const { id } = useParams();
    const postData = useSelector((state)=> state.post.postData);
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const QueryClient = useQueryClient();  //캐싱된 데이터 후처리 리듀서 느낌
    // const rooms = useSelector((state)=> state.post.rooms);
    const [toggle, setToggle] = useState(false);
    const [roomArr, setRoomArr] = useState([]);
    const [reset, setReset] = useState();

    useEffect(()=>{
        if(!id && postData.first.length===0) {
            navigate('/map')
        }
    },[])

    const RoomSaveDB = () => {
        return instance.get(`/api/store/getroom/${id}`);
    }

    const SaveDone_query = useQuery(["saveDone"], RoomSaveDB , {
        refetchOnWindowFocus: false,
        retry:10,
        onSuccess: (data) => {
        // console.log(data);
      }
    });

    const statusIcon = (status) => {
        if(status==='private') {
            return circle_private;
        }else if(status==='publicOwner') {
            return circle_owner;
        }else {
            return circle_guest;
        }
    }

    const upload = async () => {
        await dispatch(RegistrationData(roomArr))
        navigate('/storepost/PostReview')
    }

    const resetBtn = () => {
        setRoomArr('');
        if(reset){
            setReset(false) 
        }else {
            setReset(true)
        }
    }

    const RestaurantRoomSave = useMutation(RestaurantRoomSaveDB, {
        onSuccess: () => {
          QueryClient.invalidateQueries("room")
        }
    });
    
    const successBtn = () => {
        RestaurantRoomSave.mutate({selectedRooms:roomArr, storeId:id});
        navigate('/')
    }

    const rooms = SaveDone_query?.data?.data?.myRooms;
    
    return (
        <div>
            {/* <Modal content='맛방에 등록하시겠습니까?' nav='/storepost/PostReview' modal={modal} setModal={setModal} okBtn={upload}/> */}
            <ContentWrap>
                {SaveDone_query.status === 'success' && <ul>
                    <Nav>
                        <p><span>{roomArr.length}</span>/{rooms.length}</p>
                        <button onClick={resetBtn}>Reset</button>
                    </Nav>
                    {rooms.length!==0 ? rooms.map((room, idx)=> (    
                        <RegistrationItem key={room.roomId} saveDone={room.saveDone} room={room} statusIcon={statusIcon} roomArr={roomArr} setRoomArr={setRoomArr} reset={reset}/>
                    )) : 
                    <div>
                        <h3>만들어진 방이 없어요!</h3>
                    </div>
                    }
                </ul>}
            </ContentWrap>
            {!id ? <FooterBtn onClick={upload}><p>다 음</p></FooterBtn> : <PurPleBtn onClick={successBtn} >저 장</PurPleBtn>}
            {id && <BottomNavi/>}
        </div>
    );
};

export default RoomRegistration;

const ContentWrap = styled.article`
    padding:0 4.444%;
    padding-bottom:88px;
    ul > div {
        display:flex;
        align-items: center;
        justify-content:center;
        height:500px;
    }
`

const Nav = styled.li`
    display:flex;
    justify-content:space-between;
    margin:20px 0;
    p {
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-transform: capitalize;
        color:#2d2d2d;
    }
    p > span {
        color:var(--INFO);
    }
    button {
        border:none;
        background-color:transparent;
        text-decoration:underline;
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-align: right;
        text-transform: capitalize;
        color:var(--BLACK);
        cursor:pointer;
    }
`

const PurPleBtn = styled.button`
    border:none;
    background-color:var(--INFO);
    font-family: 'AppleSDGothicNeoSB';
    font-style: normal;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color:var(--WHITE);
    padding:13px 40px;
    border-radius:60px;
    position:fixed;
    bottom:88px;
    left:50%;
    transform: translate(-50%, 0);
    cursor:pointer;
`
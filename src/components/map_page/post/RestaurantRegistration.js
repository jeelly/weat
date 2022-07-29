import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from'react-router-dom'
import styled from 'styled-components';
import { Container, FooterBtn } from '../../../css/Style';
import location_icon from '../../../img/fixed/location_icon.svg'
import speech_bubble from '../../../img/fixed/speech_bubble.svg'
import { eyeList } from "../../../components/signup/FaceResource";
import {ReactComponent as Characterface} from '../../../img/characterface.svg';
import { modalNum } from '../../../redux/modules/mapSlice';
import instance from '../../../shared/axios';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import { FirstRestaruantData, postData } from '../../../redux/modules/postSlice';

const RestaurantRegistration = () => {
    // const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const data = useSelector(state => state.map.firstPost);
    const userInfo = useSelector(state => state.loggedIn.userInfo);
    const modalRD = useSelector(state => state.map.modalNum);

    // useEffect(()=> {
    //     if(data.length===0){
    //         navigate('/map')
    //     }
    // },[])
    // const { mutate } = useMutation(CreateRestaurant, {
    //     onSuccess: () => {
    //       QueryClient.invalidateQueries("/api/store/write") //여기 꼭 키값 넣어야함 안넣으면 데이터 다 날라감
    //     }
    //   });


    const SearchUserEye = () => {
        return eyeList.filter((row) => row.includes(userInfo.eyes) && row);
      };

    const Phone = () => {
        return 'tel' + data.phone
    }

    const SearchModal = async () => {
        await dispatch(modalNum(modalRD?false:true))
        navigate('/map')
    }
    
    // const modalOpen = () => {
    //     setModal(true) 
    // }

    const upload = async () => {
        const category = await data.category_name.filter((category,idx)=> idx !== 0)
        const upload_data = {
            storeName:data.place_name,
            address:data.address_name,
            phone:data.phone,
            placeURL:data.place_url,
            lon :data.position.lng,
            lat :data.position.lat,
            tag:category
        }
        console.log(upload_data)
        await dispatch(FirstRestaruantData(upload_data))
        navigate('/storepost/RoomRegistration')
    }
    return (
        <NewContainer>
            {/* <Modal content='맛집을 등록하시겠습니까?' nav='/storepost/RoomRegistration' modal={modal} setModal={setModal} okBtn={upload}/> */}
            <Title img={speech_bubble}>
                <PlaceName>{data.place_name}</PlaceName>
                <AddressName>{data.address_name}<span><img src={location_icon} alt="위치표시아이콘"/></span></AddressName>
                <UserInfo>
                    <CharacterfaceWrap eyes={SearchUserEye()}><NewCharacterface fill={userInfo.faceColor} /></CharacterfaceWrap>
                    <p>{userInfo.nickname}님의 발견!</p>
                </UserInfo>
            </Title>
            <Content>
                <ContentTitle>
                    <strong>가게정보</strong>
                    <button onClick={SearchModal}>재 검 색</button>
                </ContentTitle>
                <ContentBox>
                    <li>
                        <b>위치</b>
                        <p>{data.address_name}</p>
                    </li>
                    <li>
                        <b>번호</b>
                        <a href={Phone()}>{data.phone ? data.phone : "정보없음"}</a>
                    </li>
                    <li>
                        <b>주소</b>
                        <a href={data.place_url}>{data.place_url}</a>
                    </li>
                    <li>
                        <b>정보</b>
                        <p>{data.category_name.map((category, idx) => (
                            <span key={idx}>{data.category_name.length === idx+1 ? category : category + '>'}</span>
                        ))}</p>
                    </li>
                </ContentBox>
            </Content>
            <FooterBtn onClick={upload}>
                <p>다 음</p>
            </FooterBtn>
        </NewContainer>
    );
};

export default RestaurantRegistration;

const NewContainer = styled(Container)`
    display:flex;
    flex-direction:column;
    align-items: center;
    padding-bottom:88px;
`
const Title = styled.ul`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:258px;
    height:113px;
    background-image:url(${({img})=> img});
    background-size:258px 113px;
    background-position:center;
`
const PlaceName = styled.li`
    margin:22px 0 4px 0;
    font-family: 'AppleSDGothicNeoB';
    font-style: normal;
    font-size: 24px;
    line-height: 29px;
    color:var(--BLACK);
`
const AddressName = styled.li`
    font-family: 'AppleSDGothicNeoM';
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
    color:var(-DEFAULT);
    display:flex;
    align-items:center;
    span{
        width:16px;
        height:16px;
        margin-left:6px;
    }
`
const UserInfo = styled.li`
    display:flex;
    align-items:flex-end;
    position:absolute;
    bottom:-13px;
    left:20px; 
    p {
        font-family: 'AppleSDGothicNeoB';
        font-style: normal;
        font-size: 12px;
        line-height: 160%;
        color:var(--BLACK); 
    }
`

const CharacterfaceWrap = styled.div`
    width:40px;
    height:40px;
    background-color:var(--WHITE);
    border-radius:50%;
    box-shadow:var(--SHADOW1);
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    margin-right:9.82px;
    &::before{
        content:"";
        width:36.36px;
        height:36.36px;
        background-image:url(${({eyes})=> eyes});
        background-repeat:no-repeat;
        background-size:36.36px;
        position:absolute;
        top:0;
        left:50%;
        transform:translateX(-50%);
    }
`
const NewCharacterface = styled(Characterface)`
    width:36.36px;
    height:36.36px;   
`

const Content = styled.section`
    margin-top:53px;
`

const ContentTitle = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    strong {
        font-family:'AppleSDGothicNeoSB';
        font-style:normal;
        font-weight:500;
        font-size: 18px;
        line-height: 160%;
        color:var(--BLACK)
    }
    button {
        border:none;
        background-color:var(--INFO);
        border-radius:60px;
        width: 94px;
        height: 38px;
        cursor:pointer;
        font-family: 'AppleSDGothicNeoB';
        font-style: normal;
        font-size: 12px;
        line-height: 160%;
        color:var(--WHITE)
    }
`

const ContentBox = styled.ul`
    width: 328px;
    background: var(--WHITE);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    gap:10px;
    padding: 20px 0px 20px 30px;
    margin-top:12px;
    li {
        display:flex;
        margin-bottom:20px;
    }
    li:last-child {
        margin-bottom:0;
    }
    li > p, a {
        color:var(--BLACK);
        text-decoration:none;
        font-family: 'AppleSDGothicNeoUL';
        font-style: normal;
        font-size: 14px;
        line-height: 160%;
    }
    li > b {
        font-family: 'AppleSDGothicNeoB';
        font-style: normal;
        font-size: 14px;
        line-height:160%;
        opacity: 0.8;
        color:var(--BLACK);
        margin-right:24px;
    }
`
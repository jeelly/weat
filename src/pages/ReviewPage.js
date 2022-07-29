import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from '../components/review/Title';
import { Link, useNavigate, useParams } from 'react-router-dom'
import instance from "../shared/axios";
import { useQuery } from 'react-query';
import StoreInfo from '../components/review/StoreInfo';
import Review from '../components/review/Review';
import TasteTag from '../components/review/TasteTag';
import Menu from '../components/review/Menu';
import Header from '../components/review/Header';
import square from '../img/fixed/square.svg'
import pen from '../img/fixed/pen.svg'

const ReviewPage = () => {
    const { id } = useParams();
    let navigator = useNavigate();
    //말풍선 조회
    const getBubbleList = () => {
        return instance.get(`/api/store/${id}`);
    }
        //리뷰 전체 조회
    const getReviewList = () => {
        return instance.get(`/api/store/${id}/matmadi`);
    }
    const getRoomList = () => {
        return instance.get(`/api/store/getroom/${id}`);
    }
    
    const getMenuList = () => {
        return instance.get(`/api/store/${id}/menu`);
    }

    const getTagList = () => {
        return instance.get(`/api/store/${id}/tag`);
    }
    // const Bubble_query = useQuery(["Bubble"], getBubbleList , {
    const Bubble_query = useQuery(["Bubble"], getBubbleList , {
          onSuccess: (data) => {
            console.log(data.data);
          }
    });
    // const Review_query = useQuery(["review"], getReviewList , {
    const Review_query = useQuery(["review"], getReviewList , {
            refetchOnWindowFocus: false,
            retry:10,
            onSuccess: (data) => {
            console.log(data);
          }
    });
    const Room_query = useQuery(["room"], getRoomList , {
            refetchOnWindowFocus: false,
            retry:10,
            onSuccess: (data) => {
            console.log(data);
          }
    });
    const MenuList = useQuery(["Menu"], getMenuList , {
        refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (data) => {
            console.log(data.data);
          }
    });
    const Tag_query = useQuery(["tag"], getTagList , {
        refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (data) => {
            console.log(data.data);
        }
    });

    
    // useEffect(()=> {
    //     getMenuList(id)
    //     getReviewList(id)
    //     getTagList(id)
    //     getBubbleList(id)
    // },[])

    console.log(Bubble_query)
    console.log(Review_query)
    console.log(MenuList)
    console.log(Tag_query)
    // console.log(Room_query.data.data.total)
    // console.log(Room_query.data.data.myRooms)

    // useEffect(()=> {
    //     if(!Room_query.status === 'success') return;
    //     const room = Room_query.status === 'success' && Room_query.data.data.myRooms.filter((l)=> l.saveDone)
    //     setMyRooms(room) 
    // },[Room_query.status])

    // const myRooms = () => {
    //     return Room_query.status === 'success' && Room_query.data.data.myRooms.filter((l)=> l.saveDone)
    // }
    // console.log(myRooms)
    console.log(Room_query.status)
    return (
        <Container>
            {Room_query.status === 'success' && <Header Room_query={Room_query}/>}
            {Bubble_query.status === 'success' && 
                <>
                    <Title Bubble_query={Bubble_query.data.data.result}/>
                    <StoreInfo data={Bubble_query.data.data.result}/>
                </>
            }
            {Review_query.status === 'success'  && <Review data={Review_query.data.data.result}/>}
            {Tag_query.status ==='success' && <TasteTag data={Tag_query.data.data.result}/>}
            {MenuList.status === 'success' && <Menu data={MenuList.data.data.result}/>}
            <FooterBtn>
                 <Link to={`/storepost/RoomRegistration/${id}`}><img src={square} alt="맛방에 저장"/>맛방에 저장</Link>
                 <Link to={`/storepost/PostReview/${id}`}><img src={pen} alt="리뷰 남기기"/>리뷰 남기기</Link>
            </FooterBtn>
        </Container>
    );
};

export default ReviewPage;

const FooterBtn = styled.div`
    position:fixed;
    width: 279px;
    height: 48px;
    bottom:22px;
    left:50%;
    transform:translateX(-50%);
    background-color:var(--BLACK);
    border-radius:100px;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:1;
    a {
        text-decoration:none;
        font-family: 'AppleSDGothicNeoSB';
        font-style: normal;
        font-size: 14px;
        line-height: 17px;
        text-transform: capitalize;
        color:var(--WHITE);
        display:flex;
        align-items:center;
        margin-left:20px;
    }
    a:first-child {
        margin-left:0;
        margin-right:20px;
    }
    &::after {
        content:"";
        height:48px;
        width:1px;
        background-color:#666;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
    a > img {
        margin-right:8px;
    }
`
const Container = styled.div`
    width:100%;
    /* position:fixed; */
    /* top:10vh; */
    left:0;
    background-color:var(--WHITE);
    z-index:101;
    display:flex;
    flex-direction:column;
    align-items: center;
`
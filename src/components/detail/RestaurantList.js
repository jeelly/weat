import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import no_image from '../../img/fixed/no_image.svg'
import arrow from '../../img/Detail_Item_arrow.svg';
import location from '../../img/fixed/location_icon.svg';
import { useSelector } from "react-redux";

const RestaurantList = ({id, listPage, status}) => {
    const { storeList } = useSelector((state) => state.post.detail);
    let navigate = useNavigate();
    return (
        <Container status={status}>
                    <RestaurantInfo>
                        <header>
                            <Total>Total <span>{storeList.length}</span></Total>
                            <ListLink to={`/listpage/${id}`} >All</ListLink>
                        </header>
                        <RestaurantItemWrap listPage={listPage}>
                            {storeList && storeList.map((store, idx)=> (
                                <RestaurantItem key={id} onClick={()=> navigate(`/review/${store.storeId}`)}>
                                    <li>
                                    <ImgWrap>
                                        {store.imgURL.length === 0 ? <img src={no_image} alt='임시 이미지'/> : <RestaurantImg src={store.imgURL[0]} alt="음식사진"/>}
                                    </ImgWrap>
                                        <TextWrap>
                                            <li><RestaurantUser>{store.writer}님의 발견</RestaurantUser></li>
                                            <li><RestaurantName>{store.storeName}</RestaurantName></li>
                                            <LocationWrap location={location}><RestaurantContent>{store.address}</RestaurantContent></LocationWrap>
                                        </TextWrap>
                                    </li>
                                    <li>
                                        <ArrowBtn><img src={arrow} alt="화살표아이콘"/></ArrowBtn>
                                    </li>
                                </RestaurantItem>
                            ))}
                        </RestaurantItemWrap>
                    </RestaurantInfo>
                </Container>
    );
};

export default RestaurantList;

const Container = styled.div`
    width:100%;
    overflow:hidden;
    padding:0 8px;
    background-color:${({status}) => status==='publicOwner'?'#FF7337': status==='publicGuest'? '#23C7C7' : '#FFBB55'} ;
`
const RestaurantInfo = styled.div`
    background-color:var(--WHITE);
    box-shadow: 0px 12px 17px rgba(153, 153, 153, 0.2), 0px 5px 22px rgba(153, 153, 153, 0.2), 0px 7px 8px rgba(153, 153, 153, 0.2);
    width:100%;
    margin-top:${({listPage}) => listPage ? '10px': '34px'};
    border-radius:18px;
    padding:20px 16px 0 16px;
    header {
        display:flax;
        justify-content:space-between;
        margin-bottom:20px;
    }
`

const Total = styled.div`
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    span {
        font-weight:600;
    }
`
const ListLink = styled(Link)`
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    text-decoration-line: underline;
    text-transform: capitalize;
    color:var(--BLACK)
`

const RestaurantItemWrap = styled.div`
    overflow:scroll; 
    height:${({listPage}) => listPage?'100vh': '55.156vh'};
    //스크롤 숨기기
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
`

const TextWrap = styled.ul`
    width:170px;
    height:90px;
    text-align:left;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    position:relative;
`
const RestaurantItem = styled.ul`
    display:flex;
    justify-content:space-between;
    flex-direction:row;
    align-items:center;
    margin-bottom:16px;
    li:first-child {
        display:flex;
    }
    &:first-child {
        margin-top:2px;
    }
`

const HashTagWrap = styled.div`
    display:flex
`

const HashTag = styled.div`
  border: 1px solid #7F5FFF;
  border-radius: 100px;
  gap:10px;
  font-weight:700;
  font-size:10px;
  color:#7F5FFF;
  text-align: center;
  padding:4px 8px;
  margin-right:4px;
`

const ImgWrap = styled.div`
    width:102px;
    height:90px;
    margin-right:11.5px;
    border-radius:20px;
    overflow:hidden;
`
const RestaurantImg = styled.img`
  width: 104px;
  height: 90px;
  object-fit: cover;
`
const RestaurantName = styled.h3`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-transform: capitalize;
    margin:12px auto 4px auto;
    width:164px;
    overflow:hidden; 
    text-overflow:ellipsis; 
    white-space:nowrap;
`
const RestaurantUser = styled.p`
font-family: 'AppleSDGothicNeoB';
font-style: normal;
font-size: 12px;
display: flex;
color:#7F5FFF;
`
const RestaurantContent = styled.p`
    font-weight: 300;
    font-size: 14px;
    line-height: 160%;
    color:#666;
    width:148px;
    overflow:hidden; 
    text-overflow:ellipsis; 
    white-space:nowrap;
    position:relative;
`
const LocationWrap = styled.li`
/* width:178px;
min-width:178px; */
&:after {
        content:"";
        width:22px;
        height:22px;
        background-image:url(${({location})=> location});
        background-position:center;
        /* background-size:4px; */
        background-repeat:no-repeat;
        position:absolute;
        bottom:8px;
        right:0;
    }
`
const ArrowBtn = styled.div`
    margin-right:2.564%;
    /* margin-left:10px; */
    /* margin-left: 16.59px; */
    /* margin-left: 36.59px; */
`
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import del from '../../img/EditDel.svg';
import no_image from '../../img/fixed/no_image.svg'
import arrow from '../../img/Detail_Item_arrow.svg';
import location from '../../img/fixed/location_icon.svg';
import { RoomDelStoreDB } from '../../redux/modules/postSlice';

const RestaurantList = ({ id, listPage}) => {
    const dispatch = useDispatch();
    const { storeList } = useSelector(state => state.post.detail);
    const delStore = (storeId) => {
        dispatch(RoomDelStoreDB(storeId, id))
    }
    return (
        <Container>
                    <RestaurantInfo>
                        <header>
                            <Total>Total <span>{storeList && storeList.length}</span></Total>
                            <ListLink to={`/editlistpage/${id}`} >All</ListLink>
                        </header>
                        <RestaurantItemWrap listPage={listPage}>
                        {storeList && storeList.map((store, idx)=> (
                                <RestaurantItem key={`${store.storeId},${id}`}>
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
                                        <DelBtn onClick={()=> delStore(store.storeId)}><img src={del} alt="삭제아이콘"/></DelBtn>
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
    min-width:104px;
    min-height:90px;
    width:104px;
    height:90px;
    margin-right:11.5px;
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
    margin:12px auto 4px 0;
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
const DelBtn = styled.button`
    border:none;
    background-color:transparent;
    margin-right:2.564%;
    cursor:pointer;
    img {
        width:14px;
        height:14px;
    }
    z-index:100px;
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
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import arrow from '../../img/Detail_Item_arrow.svg';

const RestaurantList = ({id, storeList, listPage}) => {
    console.log(storeList)
    return (
        <Container>
                    <RestaurantInfo>
                        <header>
                            <Total>Total <span>{storeList.length}</span></Total>
                            <ListLink to={`/listpage/${id}`} >All</ListLink>
                        </header>
                        <RestaurantItemWrap listPage={listPage}>
                            {storeList.map((store, idx)=> (
                                <RestaurantItem key={id}>
                                    <li>
                                    <ImgWrap>
                                        <RestaurantImg src={store.imgURL[0]} alt="음식사진"/>
                                    </ImgWrap>
                                        <ul>
                                            <HashTagWrap>
                                                {store.tag.map((tag, i) => (
                                                    <HashTag key={i}>{tag}</HashTag>
                                                ))}
                                            </HashTagWrap>
                                            <li><RestaurantName>{store.storeName}</RestaurantName></li>
                                            <li><RestaurantContent>{store.comment}</RestaurantContent></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <LinkBtn to="/"><img src={arrow} alt="화살표아이콘"/></LinkBtn>
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
    border-radius:18px 18px 0 0;
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
const RestaurantItem = styled.ul`
    display:flex;
    justify-content:space-between;
    flex-direction:row;
    align-items:center;
    margin-bottom:16px;
    li:first-child {
        display:flex;
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
    width:104px;
    height:90px;
    margin-right:8px;
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
    margin:18px auto 6px auto;
`
const RestaurantContent = styled.p`
    font-weight: 300;
    font-size: 14px;
    line-height: 160%;
    color:#666;
`
const LinkBtn = styled(Link)`
    margin-right:2.564%;
    /* margin-left:10px; */
    /* margin-left: 16.59px; */
    /* margin-left: 36.59px; */
`
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MapModal from "../components/map_page/MapModal";
import MapContainer from "../components/map_page/MapContainer";
import styled from "styled-components";
import SearchModal from "../components/map_page/SearchModal";
import instance from "../shared/axios";
import { useQuery } from 'react-query';
import { Link, Outlet } from "react-router-dom";
import BottomNavi from "../components/BottomNavi";
import { device } from "../css/GlobalStyles";
import house from "../img/fixed/house.svg"
import alert from "../img/fixed/alert.svg"



const MapPage = () => {
  const detail = useSelector(state => state.map.loadRoomTagIcon);
  const myLocation = useSelector(state => state.map.MyLatLng);

  const getStoreAllList = () => {
    return instance.get(`/api/store/map/`);
  }

  const store_all_query = useQuery(["store_all_list"], getStoreAllList , {
    onSuccess: (data) => {
      // console.log(data);
    }
  });

  const detail_data = () => {
    if(detail) {
      return detail
    }
  }

  return (
    <>
    <Container>
      <StyleLink house={house} to='/'/>
      {/* <AlertModal alert={alert} to='/'/> */}
      <Outlet/>
        <MapModal/>
        <SearchModal store_query={store_all_query.data} />
        {myLocation.loading && <MapContainer detail_data={detail_data()} myLocation={myLocation}/>}
      <BottomNavi/>
    </Container>
    </>
  );
};
export default MapPage;
const Container = styled.div`
  position:relative;
  width:100%;
  height:100vh;
  overflow:hidden;
  @media ${device.pc} {
    overflow:hidden;
  }
`
const StyleLink = styled(Link)`
  position:absolute;
  height:22px;
  width:24px;
  background-image:url(${({house})=> house });
  background-repeat:no-repeat;
  background-position:center;
  top:15px;
  left:16px;
  z-index:2;
`

const AlertModal = styled.button`
  position:absolute;
  border:none;
  background-color:transparent;
  width:24px;
  height:24px;
  background-image:url(${({alert})=> alert });
  background-repeat:no-repeat;
  background-position:center;
  top:15px;
  right:19.2px;
  z-index:2;
  cursor:pointer;
`
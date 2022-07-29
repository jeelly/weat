import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MapModal from "../components/map_page/MapModal";
import MapContainer from "../components/map_page/MapContainer";
import styled from "styled-components";
import SearchModal from "../components/map_page/SearchModal";
import instance from "../shared/axios";
import { useQuery } from 'react-query';
import { Outlet } from "react-router-dom";
import BottomNavi from "../components/BottomNavi";
import { device } from "../css/GlobalStyles";

const getStoreAllList = (MyLatLng) => {
  // console.log('====')
  return instance.get(`/api/store/map/`);
}
// const getStoreList = (MyLatLng) => {
  // const center = MyLatLng?.center
  // console.log(center)
  // const params = {lon:center.lng, lat:center.lat}
  // return instance.get(`/api/store/map`, { params: {lon:center?.lng, lat:center?.lat} });
// }

const MapPage = () => {
  const detail = useSelector(state => state.map.loadRoomTagIcon);
  const MyLatLng = useSelector(state => state.map.MyLatLng);

  // const store_query = useQuery(["store_list"], getStoreList , {
  //   onSuccess: (data) => {
  //     console.log(data);
  //   }
  // });
  
  const store_all_query = useQuery(["store_all_list"], getStoreAllList , {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  // useEffect(()=> {
  //   getStoreList(MyLatLng)
  // },[MyLatLng])

  console.log(store_all_query)

  const detail_data = () => {
    if(detail) {
      return detail
    }
  }

  return (
    <>
    <Container>
      <Outlet/>
        <MapModal/>
        <SearchModal store_query={store_all_query.data}/>
      <MapContainer detail_data={detail_data()}/>
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
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MapModal from "../components/map_page/MapModal";
import MapContainer from "../components/map_page/MapContainer";
import styled from "styled-components";
import SearchModal from "../components/map_page/SearchModal";
import instance from "../shared/axios";
import { useQuery } from 'react-query';

const getStoreList = () => {
  return instance.get("/api/store/map");
}

const MapPage = () => {

  const store_query = useQuery("store_list", getStoreList , {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  const detail = useSelector(state => state.post.detail.storeList);

  const detail_data = () => {
    if(detail) {
      return detail
    }
  }

  return (
    <Container>
      <MapModal/>
      <SearchModal store_query={store_query.data}/>
      <MapContainer detail_data={detail_data()}/>
    </Container>
  );
};
export default MapPage;

const Container = styled.div`
  position:relative;
  width:100%;
`

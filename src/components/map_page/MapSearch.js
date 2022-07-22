import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loadFirstStore, loadMyStoreDB } from '../../redux/modules/mapSlice';
import close_btn from '../../img/white_Xclose_btn.svg'
const { kakao } = window;

const MapSearch = ({store_query, toggle}) => {
    const dispatch = useDispatch();
    const SearchRef = useRef()
    const [searchData, SetSearchData] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState() //

    const onCheckEnter = (e) => {
      if(e.key === 'Enter') {
          e.preventDefault();
          SetSearchData(SearchRef.current.value)
      }
    }

    useEffect(() => {
        // if (!map) return
        const ps = new kakao.maps.services.Places()
        ps.keywordSearch(searchData , (data, status, _pagination) => {
          console.log("aa",data)
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let markers = []
            for (let i = 0; i < data.length; i++) {
              // @ts-ignore
              markers.push({
                position: {
                  lat: data[i].y,
                  lng: data[i].x,
                },
                place_name: data[i].place_name,
                address_name:data[i].address_name,
                phone:data[i].phone,
                place_url:data[i].place_url,
                category_name:data[i].category_name.split(">"),
                LatLon:[data[i].x, data[i].y]
              })

            //   bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }
            setMarkers(markers)
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds)
          }
        })
      }, [map, searchData])

      let hadStores = []
      store_query.data.storeMap.filter((marker, idx) => {
        let flag = false;
        markers.forEach((my_store) => {
          if(marker.LatLon.join("") === my_store.LatLon.join("")) {
            hadStores.push({...my_store, ...marker})
            flag = true;
          }
        })
        return flag
      })
      const stores = markers.filter((marker, idx) => {
        let flag = true;
        hadStores.forEach((my_store) => {
          if(marker.LatLon.join("") === my_store.LatLon.join("")) {
            flag = false;
          }
        })
        return flag
      })
      console.log(stores)
      const detail = (store) => {
        dispatch(loadMyStoreDB(store))
      }

      const firstRegistration = (data) => {
        dispatch(loadFirstStore(data))
      }


    return (
        <Container onKeyPress={onCheckEnter}>
            <SearchArea placeholder='가게명, 주소, 키워드로 검색' type="text" ref={SearchRef}/>
            <SearchCloseBtn close_btn={close_btn} onClick={toggle}>검색창닫기</SearchCloseBtn>
            <SearchDataWrap>
              {hadStores.filter((arr, idx) => idx < 4).map((store)=> (
                <li 
                key={store.storeId}
                onClick={async()=> {
                    await detail(store)             
                    toggle()
                  }}>
                  <SearchData>
                    <li>
                      <div>{store.place_name}</div>
                      <div>{store.address_name}</div>
                    </li>
                    <li>이미 등록</li>
                  </SearchData>
                </li>
              ))}
              {stores.filter((marker, idx) => idx < 4).map((store, idx)=> (
                <li 
                key={idx}
                onClick={async()=> {
                  await firstRegistration(store)
                  toggle()
                }}>
                  <SearchData>
                    <li>
                      <div>{store.place_name}</div>
                      <div>{store.address_name}</div>
                      </li>
                    <li>첫 기록하기</li>
                  </SearchData>
                </li>
              ))}
            </SearchDataWrap>
        </Container>
    );
};

export default MapSearch;

const Container = styled.form`
  display:block;
  width:100%;
  height:100vh;
  background: rgba(255, 255, 255, 0.95);
`

const SearchArea = styled.input`
  margin:0 5.555%;
  margin-top:9.965%;
  width:88.89%;
  height:30px;
  border:none;
  border-left:1px solid #000;
  background-color:transparent;
  padding-left:3.333%;
`
const SearchCloseBtn = styled.button`
    width:52px;
    height:52px;
    border-radius:50%;
    border:none;
    text-indent:-9999px;
    background-color:var(--INFO);
    background-image:url(${({close_btn}) => close_btn});
    background-repeat:no-repeat;
    background-position:center;
    position:absolute;
    bottom:2.797%;
    right:8.333%;
`

const SearchDataWrap = styled.ul`
  margin-top:25px;
`

const SearchData = styled.li`
width:100%;
height: 85.36px;
display:flex;
justify-content:space-between;
`
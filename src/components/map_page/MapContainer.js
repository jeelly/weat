import React, { useEffect, useRef } from 'react';
import { useClickOutside } from '../../hook/useClickOutside';
import { useSelector } from "react-redux";
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
const { kakao } = window;

const Keyword = ({detail_data}) => {
    const myLocation = useSelector(state => state.map.MyLatLng);
    const searchStore = useSelector(state => state.map.loadMyStore);
    const firstSearchStore = useSelector(state => state.map.loadFirstStore);
    console.log(firstSearchStore)
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [myMarkers, setMyMarkers] = useState([])
    const [map, setMap] = useState()
    const [searchData, SetSearchData] = useState()
    const [state, setState] = useState({
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })

    //내위치 받아와서 띄워주기
    useEffect(()=> {
        if(!map) return
        setState(myLocation)
        const bounds = new kakao.maps.LatLngBounds() // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng))
        map.setBounds(bounds)

        let markers = []
          markers.push({
            position: {
              lat: myLocation.center.lat,
              lng: myLocation.center.lng,
            },
            content: '현 위치',
            // address_name:data[i].address_name,
            // phone:data[i].phone
          })
        setMyMarkers(markers)
    },[map, myLocation])


    //검색한 데이터 (현재 사용 X)
    useEffect(() => {
        if (!map) return
        if (!searchData) return
        const ps = new kakao.maps.services.Places()
        ps.keywordSearch(searchData , (data, status, _pagination) => {
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
                content: data[i].place_name,
                address_name:data[i].address_name,
                phone:data[i].phone
              })
              // @ts-ignore
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }
            setMarkers(markers)
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds)
          }
        })
      }, [map, searchData])

    //방데이터로 좌표 띄워주기 
      useEffect(()=>{
        if (!map) return
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let markers = []
            
            detail_data.map((data) => {
              markers.push({
                position: {
                  lat: data.LatLon[1],
                  lng: data.LatLon[0]
                },
                content: data.storeName,
                address_name:data.address,
                phone:data.comment
              })
              bounds.extend(new kakao.maps.LatLng(data.LatLon[1],data.LatLon[0]))
            })
            setMarkers(markers)
            map.setBounds(bounds)
      },[detail_data])


      //검색해서 클릭한 데이터로 좌표 띄워주기 
      useEffect(()=>{
        if (searchStore.length===0) return
        if (!map) return
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let markers = []
            
            searchStore.map((data) => {
              markers.push({
                position: {
                  lat: data.position.lat,
                  lng: data.position.lng
                },
                content: data.storeName,
                address_name:data.address,
                phone:data.phone,
                state:"searchStore"
              })
              setState({center: {
                lat: data.position.lat,
                lng: data.position.lng,
              }})
              bounds.extend(new kakao.maps.LatLng(data.position.lat, data.position.lng))
            })
            setMarkers(markers)
            map.setBounds(bounds)
      },[map, searchStore])

      //검색해서 클릭한 첫 데이터로 좌표 띄워주기 
      useEffect(()=>{
        if (firstSearchStore.length===0) return
        if (!map) return
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let markers = []
            console.log(firstSearchStore)
            firstSearchStore.map((data) => {
              markers.push({
                position: {
                  lat: data.LatLon[1],
                  lng: data.LatLon[0]
                },
                content: data.place_name,
                address_name:data.address_name,
                state:"firstSearchStore"
              })
              setState({center: {
                lat: data.LatLon[1],
                lng: data.LatLon[0]
              }})
              bounds.extend(new kakao.maps.LatLng(data.LatLon[1], data.LatLon[0]))
            })
            setMarkers(markers)
            map.setBounds(bounds)
      },[map, firstSearchStore])


      const FirstSearchModal = (props) => {
        const modalRef = useRef(null);
        useClickOutside(modalRef, () => {
          props.onClose();
        });
        if (firstSearchStore.length===0) return;
        return (
          <SearchSummaryData ref={modalRef}>
            <li>{firstSearchStore[0].place_name}</li>
            <li>{firstSearchStore[0].address_name}</li>
            <li>{firstSearchStore[0].category_name}</li>
          </SearchSummaryData>
        )
      }

      const SearchModal = (props) => {
        const modalRef = useRef(null);
        useClickOutside(modalRef, () => {
          props.onClose();
        });
        if (searchStore.length===0) return;
        return (
          <SearchSummaryData ref={modalRef}>
            <li>{searchStore[0].place_name}</li>
            <li>{searchStore[0].address}</li>
            <li>{searchStore[0].tag.map((tag)=> (
              <div>{tag}</div>
            ))}</li>
          </SearchSummaryData>
        )
      }

    return (
        <>
            <Map // 로드뷰를 표시할 Container
            center={state.center}
            style={{
                width: "100%",
                height:"100vh",
            }}
            level={3}
            onCreate={setMap}
            >
            {markers.map((marker) => (
                <div key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}>
                    <MapMarker
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                    >
                      {info && info.content === marker.content && (
                        <div style={{width:"100px"}}>{marker.content}</div>
                      )}
                    </MapMarker>
                      {info && info.content === marker.content && (
                          <SearchModal onClose={() => {setInfo(); setMarkers({position:[...markers.position]})}} />
                      )}
                      {info && info.content === marker.content && (
                          <FirstSearchModal onClose={() => {setInfo(); setMarkers({position:[...markers.position]})}} />
                      )}
                </div>
            ))}
            {myMarkers.map((marker) => (
                <div key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}>
                    <MapMarker
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                    >
                      {info && info.content === marker.content && (
                        <div style={{width:"100px"}}>{marker.content}</div>
                      )}
                    </MapMarker>
                </div>
            ))}
            </Map>
        </>
  )
};

export default Keyword;

const SearchData = styled.div`
  /* position:absolute;
  top:0;
  bottom:0; */
`
const SearchSummaryData =styled.div`
  background-color:var(--WHITE);
  width:258px;
  height:97px;
  z-index:100;
  position: absolute;
  bottom:14.510%;
  left:8.333%;
  border-radius:20px;
  box-shadow:var(--SHADOW1);
  display:flex;
  align-items:center;
  justify-content: center;
`
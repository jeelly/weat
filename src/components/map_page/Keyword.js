import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
const { kakao } = window;

const Keyword = () => {
    const SearchRef = useRef()
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
    const [dataMap, setDataMap] = useState([])
    const [searchData, SetSearchData] = useState()

    const SearchBtn = () => {
        SetSearchData(SearchRef.current.value)
      }

    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()
        console.log(searchData)
        ps.keywordSearch(searchData , (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let markers = []

            setDataMap(data)
            console.log(data)
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

    console.log(dataMap)
    return (
        <>
            <input type="text" ref={SearchRef}/>
            <button onClick={SearchBtn}>검색</button>
            <Map // 로드뷰를 표시할 Container
            center={{
                lat: 37.566826,
                lng: 126.9786567,
            }}
            style={{
                width: "500px",
                height: "500px",
            }}
            level={3}
            onCreate={setMap}
            >
            {markers.map((marker) => (
                <>
                    <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                    >
                    {info && info.content === marker.content && (
                        <div style={{color:"#000"}}>{marker.content}</div>
                    )}
                    </MapMarker>
                    <div>
                        <div onClick={() => setInfo(marker)}>{marker.address_name}</div>
                        <div onClick={() => setInfo(marker)}>{marker.content}</div>
                        <div onClick={() => setInfo(marker)}>{marker.phone}</div>
                    </div>
                </>
            ))}
            </Map>
        </>
  )
};

export default Keyword;

const NewMapMarker = styled.div``
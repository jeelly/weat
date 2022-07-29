import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loadFirstStore, loadMyStoreDB } from '../../redux/modules/mapSlice';
import close_btn from '../../img/white_Xclose_btn.svg'
import editdel from '../../img/EditDel.svg';
import flag from '../../img/fixed/save_flag.svg';
import save_icon from '../../img/fixed/save_icon.svg';
import location_icon from '../../img/fixed/location_icon.svg';
import { device } from '../../css/GlobalStyles';

const { kakao } = window;

const MapSearch = ({store_query, toggle}) => {
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState() //

    const onCheckEnter = (e) => {
      if(e.key === 'Enter') {
          e.preventDefault();
          setSearchData(e.target.value)
      }
    }

    const onChange = (e) => {
      e.preventDefault();
      setSearchData(e.target.value)
    }

    useEffect(() => {
        // if (!map) return
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
      console.log(store_query?.data.storeMap)
      console.log(markers)
      // console.log([37.51332614542552, 126.93732590421996].join(""))
      store_query?.data.storeMap.filter((marker, idx) => {
        let flag = false;
        markers.forEach((my_store) => {
          if(marker.lat.toString() === my_store.position.lat && 
          my_store.position.lng === marker.lon.toString()) {
            hadStores.push({...my_store, ...marker})
            flag = true;
          }
        })
        return flag
      })
      console.log(hadStores)
      const stores = markers.filter((marker, idx) => {
        let flag = true;
        hadStores.forEach((my_store) => {
          console.log(marker)
          if(marker.position.lat === my_store.position.lat.toString() && 
          my_store.position.lng.toString() === marker.position.lng) {
            flag = false;
          }
        })
        return flag
      })

      const detail = (data) => {
        dispatch(loadMyStoreDB(data))
      }

      const firstRegistration = (data) => {
        dispatch(loadFirstStore(data))
      }


    return (
        <Container onKeyPress={onCheckEnter}>
          <SearchAreaWrap>
            <SearchArea placeholder='가게명, 주소, 키워드로 검색' type="text" value={searchData} onChange={onChange}/>
            <button editdel={editdel} onClick={(e)=> {
                    e.preventDefault();
                    setSearchData('')
            }}></button>
          </SearchAreaWrap>

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
                    <TextWrap>
                      <PlaceName>{store.place_name}</PlaceName>
                      <AddressName location_icon={location_icon}>{store.address_name}</AddressName>
                    </TextWrap>
                    <IconWrap>
                      <img src={save_icon} alt="세이브 아이콘" />
                      <Saved>맛방에 저장됨</Saved>
                    </IconWrap>
                  </SearchData>
                </li>
              ))}
              {stores.filter((marker, idx) => idx < 6).map((store, idx)=> (
                <li 
                key={idx}
                onClick={async()=> {
                  await firstRegistration(store)
                  toggle()
                }}>
                  <SearchData>
                    <TextWrap>
                      <PlaceName>{store.place_name}</PlaceName>
                      <AddressName location_icon={location_icon}>{store.address_name}</AddressName>
                    </TextWrap>
                    <IconWrap>
                      <img src={flag} alt="세이브 깃발 아이콘" />
                      <FirstSave>첫 기록하기</FirstSave>
                    </IconWrap>
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
  background: rgba(255, 255, 255, 0.9);
  overflow:auto;
`

const SearchAreaWrap = styled.div`
  display:flex;
  /* position:relative; */
  /* height:30px;*/
  
  button {
    /* margin-top:11.189%; */
    /* margin-right:5.556%; */
    margin:64px 20px 0 0;
    border:none;
    background-color:transparent;
    width:16px;
    height:16px;
    border-radius:50%;
    cursor: pointer;
    background-image:url(${editdel});
    background-size:16px;
    background-size:contain;
    background-position: center;
    background-repeat:no-repeat;
    /* position:absolute;
    right:0;
    bottom:0; */
    /* transform:translateX(-50%); */
  }
`
const SearchArea = styled.input`
  /* margin:0 5.555%; */
  /* margin-top:9.965%; */
  /* padding-left:3.333%; */
  margin:0 20px;
  margin-top:57px;
  width:100%;
  /* max-width:500px; */
  height:30px;
  border:none;
  border-left:1px solid #000;
  background-color:transparent;
  padding-left:12px;
  outline:none;
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
    position:fixed;
    bottom:84px;
    right:30px;
    @media ${device.pc} {
        position:absolute;
        margin:0 auto;
        text-align: left;
    }
`

const SearchDataWrap = styled.ul`
  margin-top:25px;
  padding-bottom:68px;
`

const SearchData = styled.li`
margin:0 4.444%;
width:91.112%;
height: 85.36px;
display:flex;
justify-content:space-between;
`

const TextWrap = styled.li`
  display:flex;
  flex-direction:column;
  justify-content:center;
  text-align: left;
`
const PlaceName = styled.h3`
  font-family: 'AppleSDGothicNeoM';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-transform: capitalize;
  color:var(--BLACK)
` 
const AddressName = styled.p`
  font-family: 'AppleSDGothicNeoM';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color:var(--DEFAULT);
  position:relative;
  &:before {
    content:'';
    width:12px;
    height:16px;
    background-image:url(${({location_icon})=>location_icon}) ;
    background-position:center;
    background-size:12px 16px;
    position:absolute;
    right:-15px;
    bottom:0;
  }
`

const IconWrap = styled.li`
  width:54.53px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const FirstSave = styled.p`
  font-family: 'AppleSDGothicNeoB';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #000000;
  margin-top:9px;
`

const Saved = styled.p`
  font-family: 'AppleSDGothicNeoB';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: right;
  color:var(--INFO);
  margin-top:9px;
`
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const myLocation = useSelector(state => state.map.MyLatLng);

  function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d.toFixed(1);;
  }

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
        ps.keywordSearch(searchData, (data, status, _pagination) => {  
          console.log(data)
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let markers = []
            const newdata = data.filter((arr) => {
              const category = arr.category_name.split('>')
              return category[0].includes('음식점' || '카페')
            })
            for (let i = 0; i < newdata.length; i++) {
                // @ts-ignore
                markers.push({
                position: {
                  lat: newdata[i].y,
                  lng: newdata[i].x,
                },
                place_name: newdata[i].place_name,
                address_name:newdata[i].address_name,
                phone:newdata[i].phone,
                place_url:newdata[i].place_url,
                category_name:newdata[i].category_name.split(">"),
                LatLon:[newdata[i].x, newdata[i].y],
                distance:getDistanceFromLatLonInKm(myLocation.center.lat,myLocation.center.lng, newdata[i].y,newdata[i].x)
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

      const stores = markers.filter((marker, idx) => {
        let flag = true;
        hadStores.forEach((my_store) => {
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
                    setSearchData('');
                    setMarkers([]);
            }}></button>
          </SearchAreaWrap>

            <SearchCloseBtn close_btn={close_btn} onClick={toggle}>검색창닫기</SearchCloseBtn>
            {stores.length === 0 ? 
            <SearchDataWrap>
              <li>
                <SearchData style={{justifyContent:'center',marginTop:'100px'}}>
                  <PlaceName>검색 된 음식점이 없어요 !</PlaceName>
                </SearchData>
              </li>
            </SearchDataWrap> :
            <SearchDataWrap>
              {hadStores.map((store)=> (
                <li 
                key={store.storeId}
                onClick={async()=> {
                    await detail(store)             
                    toggle()
                  }}>
                  <SearchData>
                    <TextWrap>
                        <div>
                          <PlaceName>{store.place_name}</PlaceName>
                          <Distance>{store.distance}km</Distance>
                        </div>
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
                        <div>
                          <PlaceName>{store.place_name}</PlaceName>
                          <Distance>{store.distance}km</Distance>
                        </div>
                      <AddressName location_icon={location_icon}>{store.address_name}</AddressName>
                    </TextWrap>
                    <IconWrap>
                      <img src={flag} alt="세이브 깃발 아이콘" />
                      <FirstSave>첫 기록하기</FirstSave>
                    </IconWrap>
                  </SearchData>
                </li>
              ))}
            </SearchDataWrap>}
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
  /* margin-top:57px; */
  margin-top:97px;
  /* margin-top:120px; */
  /* position:relative; */
  /* height:30px;*/
  /* margin-top:50px; */
  button {
    /* margin-top:11.189%; */
    /* margin-right:5.556%; */
    margin-right:20px;
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
    cursor:pointer;
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

const SearchData = styled.ul`
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
  > div {
    display:flex;
  }
`

const Distance = styled.strong`
  font-family: 'Niramit';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-left:4px;
  color: #7F5FFF;
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
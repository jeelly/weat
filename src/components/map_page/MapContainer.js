import React, { useEffect, useRef } from 'react';
import { useClickOutside } from '../../hook/useClickOutside';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import {ReactComponent as Characterface} from '../../img/characterface.svg';
import maker_container from '../../img/maker/maker_container.svg'
import black_flag from '../../img/maker/maker_black_flag.svg'
import speech_bubble from '../../img/fixed/speech_bubble.svg'
import flag from '../../img/fixed/save_flag.svg';
import save_eye from '../../img/fixed/save_eye.svg';
import star from '../../img/star.svg';
import { eyeList } from "../../components/signup/FaceResource";
import { firstPost } from '../../redux/modules/mapSlice';
import instance from '../../shared/axios';
import { useQuery } from 'react-query';


const { kakao } = window;

const Keyword = ({detail_data, myLocation}) => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const searchStore = useSelector(state => state.map.loadMyStore);
    const firstSearchStore = useSelector(state => state.map.loadFirstStore);
    const FilterTagData = useSelector(state => state.map.tagFilterData);
    const [markers, setMarkers] = useState([])
    const [info, setInfo] = useState()
    const [myMarkers, setMyMarkers] = useState([])

    const [myLocationMarkers, setMyLocationMarkers] = useState([])
    const [myLocationInfo, setMyLocationInfo] = useState()

    const [firstSearchMarkers, setFirstSearchMarkers] = useState([])

    const [searchMarkers, setSearchMarkers] = useState([])
    const [searchMarkersInfo, setSearchMarkersInfo] = useState()


    const [filterMarkers, setFilterMarkers] = useState([])
    const [filterInfo, setFilterInfo] = useState()


    const [map, setMap] = useState()
    const [state, setState] = useState({
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })

    const store_query = useQuery(["store_list"], () => {
      const params = {lon:myLocation.center.lng, lat:myLocation.center.lat}
      return instance.get(`/api/store/map`, {params});
    }, {
      refetchOnWindowFocus:false,
      onSuccess: (data) => {
        // console.log(data);
      }
    });

    //내위치 받아와서 띄워주기
    useEffect(()=> {
        if(!map) return;
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
          setMarkers([])
    },[map])
    
    //내위치 받아와서 띄워주기
    useEffect(()=> {
      if(!map) return;
      if(store_query.status !== 'success') return;
      setState(myLocation)
      const bounds = new kakao.maps.LatLngBounds() // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng))
      map.setBounds(bounds)
      let markers = []

      store_query.data.data.storeMap.map((data) => {
        markers.push({
          position: {
            lat: data.lat,
            lng: data.lon
          },
          userInfo: {
            eyes: data.eyes,
            faceColor: data.faceColor,
            nickname: data.nickname
          },
          storeId:data.storeId,
          storeName: data.storeName,
          address_name:data.address,
          comment:data.comment,
          // starAvg:data.starAvg,
          tag:data.tag
        })
        bounds.extend(new kakao.maps.LatLng(data.lat,data.lon))
      })
      setMyLocationMarkers(markers)
      map.setBounds(bounds)
  },[store_query.data, myLocation])

  
    //방목록에서 좌표찍기
    useEffect(()=>{
        if (!map) return
        if (detail_data.length === 0) {
          window.alert('해당 방에 맛집이 없습니다 ;(')
          setState(myLocation)
          const bounds = new kakao.maps.LatLngBounds() // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng))
          map.setBounds(bounds)
          let markers = []
            markers.push({
              position: {
                lat: myLocation.center.lat,
                lng: myLocation.center.lng,
              }
            })
          setMyMarkers(markers)
        }else {
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
          detail_data.map((data) => {
            markers.push({
              position: {
                lat: data.lat,
                lng: data.lon
              },
              userInfo: {
                eyes: data.eyes,
                faceColor: data.faceColor,
                nickname: data.nickname
              },
              storeId:data.storeId,
              storeName: data.storeName,
              address_name:data.address,
              comment:data.comment,
              starAvg:data.starAvg,
              tag:data.tag
            })
            bounds.extend(new kakao.maps.LatLng(data.lat,data.lon))
          })
          setMarkers(markers)
          map.setBounds(bounds)
        }
      },[detail_data])

    //필터 좌표찍기
    useEffect(()=>{
      if (!map) return
      if (FilterTagData.length === 0) {
        window.alert('해당 카테고리에 맛집이 없습니다 ;(')
        setState(myLocation)
        const bounds = new kakao.maps.LatLngBounds() // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng))
        map.setBounds(bounds)
        let markers = []
          markers.push({
            position: {
              lat: myLocation.center.lat,
              lng: myLocation.center.lng,
            }
          })
        setMyMarkers(markers)
      }else {
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []
        FilterTagData.map((data) => {
          markers.push({
            position: {
              lat: data.lat,
              lng: data.lon
            },
            userInfo: {
              eyes: data.eyes,
              faceColor: data.faceColor,
              nickname: data.nickname
            },
            storeId:data.storeId,
            storeName: data.storeName,
            address_name:data.address,
            comment:data.comment,
            starAvg:data.starAvg,
            tag:data.tag
          })
          bounds.extend(new kakao.maps.LatLng(data.lat,data.lon))
        })
        setFilterMarkers(markers)
        setMyLocationMarkers([])
        map.setBounds(bounds)
      }
    },[FilterTagData])

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
                userData: {
                  eyes:data.eyes,
                  faceColor:data.faceColor,
                  nickname:data.nickname
                },
                content: data.storeName,
                address_name:data.address,
                phone:data.phone,
                state:"searchStore",
                storeId:data.storeId
              })
              setState({center: {
                lat: data.position.lat,
                lng: data.position.lng,
              }})
              bounds.extend(new kakao.maps.LatLng(data.position.lat, data.position.lng))
            })
            setSearchMarkers(markers)
            map.setBounds(bounds)
      },[map, searchStore])

      //검색해서 클릭한 첫 데이터로 좌표 띄워주기 
      useEffect(()=>{
        if (firstSearchStore.length===0) return
        if (!map) return
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let markers = []
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
            setFirstSearchMarkers(markers)
            map.setBounds(bounds)
      },[map, firstSearchStore])


      const FirstSearchModal = (props) => {
        // const modalRef = useRef(null);
        useClickOutside(modalRef, () => {
          props.onClose();
        });
        if (firstSearchStore.length===0) return;
        return (
          <SpeechBubble speech_bubble={speech_bubble} ref={modalRef} onClick={()=> FirstUpload(firstSearchStore[0])}>
            <li>
              <PlaceName>{firstSearchStore[0].place_name}</PlaceName>
              <AddressName>{firstSearchStore[0].address_name}</AddressName>
            </li>
            <SaveWrap>
              <img src={flag} alt="세이브 깃발 아이콘" />
              <FirstSave>첫 기록하기</FirstSave>
            </SaveWrap>
            {/* <li>{firstSearchStore[0].category_name}</li> */}
          </SpeechBubble>
        )
      }

      const SearchModal = (props) => {
        // const modalRef = useRef(null);
        useClickOutside(modalRef, () => {
          props.onClose();
        });
        if (searchStore.length===0) return;
        return (
          <SpeechBubble speech_bubble={speech_bubble} ref={modalRef} onClick={()=>navigate(`/review/${searchMarkersInfo.storeId}`)}>
            <li>
              <PlaceName>{searchStore[0].place_name}</PlaceName>
              <AddressName>{searchStore[0].address}</AddressName>
            </li>
            <SaveWrap>
              <img src={save_eye} alt="세이브 눈 아이콘" />
              <FirstSave>리뷰보기</FirstSave>
            </SaveWrap>
            <DiscoveryUserInfo>
                    <CharacterfaceWrap eyes={userEye(searchStore[0].eyes)}><NewCharacterface fill={searchStore[0].faceColor} /></CharacterfaceWrap>
                    <p>{searchStore[0].nickname}님의 발견!</p>
            </DiscoveryUserInfo>
          </SpeechBubble>
        )
      }

      const RoomStoreModal = (props) => {
        useClickOutside(modalRef, () => {
          props.onClose();
        });
        if (detail_data.length===0) return;
        return (
          <RoomSpeechBubble ref={modalRef} speech_bubble={speech_bubble} onClick={async()=>{
            // await setInfo();
            navigate(`/review/${info.storeId}`)
          }}>
            <li>
              <PlaceName>{info.storeName}</PlaceName>
              <AddressName>"{info.comment}"</AddressName>
            </li>
            <IconWrap>
                <img src={star} alt="평점 아이콘" />
                <StarText>{info.starAvg}</StarText>
              <Tag>{info.tag}</Tag>
            </IconWrap>
            <DiscoveryUserInfo>
                    <CharacterfaceWrap eyes={userEye(info.userInfo.eyes)}><NewCharacterface fill={info.userInfo.faceColor} /></CharacterfaceWrap>
                    <p>{info.userInfo.nickname}님의 발견!</p>
            </DiscoveryUserInfo>
          </RoomSpeechBubble>
        )
      }

      
      const MyLocationStoreModal = (props) => {
        useClickOutside(modalRef, () => {
          props.onClose();
        });
        // if (detail_data.length===0) return;
        return (
          <SpeechBubble ref={modalRef} speech_bubble={speech_bubble} onClick={async()=>{
            // await setInfo();
            navigate(`/review/${myLocationInfo.storeId}`)
          }}>
            <li>
              <PlaceName>{myLocationInfo.storeName}</PlaceName>
              <AddressName>"{myLocationInfo.comment}"</AddressName>
            </li>
            <SaveWrap>
              <img src={save_eye} alt="세이브 눈 아이콘" />
              <FirstSave>리뷰보기</FirstSave>
            </SaveWrap>
            <DiscoveryUserInfo>
                    <CharacterfaceWrap eyes={userEye(myLocationInfo.userInfo.eyes)}><NewCharacterface fill={myLocationInfo.userInfo.faceColor} /></CharacterfaceWrap>
                    <p>{myLocationInfo.userInfo.nickname}님의 발견!</p>
            </DiscoveryUserInfo>
          </SpeechBubble>
        )
      }

      const TagFilterStoreModal = (props) => {
        useClickOutside(modalRef, () => {
          props.onClose();
        });
        // if (detail_data.length===0) return;
        return (
          <SpeechBubble ref={modalRef} speech_bubble={speech_bubble} onClick={async()=>{
            // await setInfo();
            navigate(`/review/${filterInfo.storeId}`)
          }}>
            <li>
              <PlaceName>{filterInfo.storeName}</PlaceName>
              <AddressName>"{filterInfo.comment}"</AddressName>
            </li>
            <SaveWrap>
              <img src={save_eye} alt="세이브 눈 아이콘" />
              <FirstSave>리뷰보기</FirstSave>
            </SaveWrap>
            <DiscoveryUserInfo>
                    <CharacterfaceWrap eyes={userEye(filterInfo.userInfo.eyes)}><NewCharacterface fill={filterInfo.userInfo.faceColor} /></CharacterfaceWrap>
                    <p>{filterInfo.userInfo.nickname}님의 발견!</p>
            </DiscoveryUserInfo>
          </SpeechBubble>
        )
      }

    const SearchUserEye = () => {
        return eyeList.filter((row) => row.includes(searchMarkers[0]?.userData?.eyes) && row);
      };

    const userEye = (eye) => {
        return eyeList.filter((row) => row.includes(eye) && row);
    };
      
    const FirstUpload = async (data) => {
      await dispatch(firstPost(data))
      navigate('/storepost/restaurantregistration')
    }

    return (
      <>
        <Map  // 로드뷰를 표시할 Container
          center={state.center}
          style={{
            width:"100%",
            height:"100%",
          }}
          level={3}
          onCreate={setMap}
        >
          {/* 방목록데이터 */}
          {markers.map((marker, i) => (
            <div
              key={marker.storeId}
            >
              <CustomOverlayMap position={marker.position}>
                <SearchLocationicon eye={userEye(marker.userInfo.eyes)} onClick={() => {setInfo(marker);}}>
                  <CharacterfaceIcon fill={marker.userInfo.faceColor}/>
                </SearchLocationicon>
              </CustomOverlayMap>
              {info && info.content === marker.content && (
                <RoomStoreModal
                  onClose={() => {
                    // if(!i===0) return;
                    setInfo();
                    setMarkers({ position: [...markers.position] });
                  }}
                />
              )}
            </div>
          ))}

          {/* 검색데이터 마커 */}
          {searchMarkers.map((marker) => (
            <div
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            >
              <CustomOverlayMap position={marker.position}>
                <SearchLocationicon eye={SearchUserEye()[0]} black_flag={black_flag} onClick={() => {setSearchMarkersInfo(marker);}}>
                  <CharacterfaceIcon fill={marker.userData.faceColor}/>
                </SearchLocationicon>
              </CustomOverlayMap>

              {searchMarkersInfo && searchMarkersInfo.content === marker.content && (
                <SearchModal
                  onClose={() => {
                    setSearchMarkersInfo();
                    setSearchMarkers({ position: [...markers.position] });
                  }}
                />
              )}
            </div>
          ))}

          {/* 첫 등록 검색데이터 마커 */}
          {firstSearchMarkers.map((marker) => (
            <div
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            >
              <CustomOverlayMap position={marker.position}>
                <FirstLocationicon black_flag={black_flag} onClick={() => {setInfo(marker);}}/>
              </CustomOverlayMap>

              {info && info.content === marker.content && (
                <FirstSearchModal
                  onClose={() => {
                    setInfo();
                    setFirstSearchMarkers({ position: [...markers.position] });
                  }}
                />
              )}
            </div>
          ))}


          {myMarkers.map((marker) => (
            <div
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            >
              <CustomOverlayMap 
              position={marker.position}
              >
                <MyLocationIcon/>
              </CustomOverlayMap>
            </div>
          ))}

          {myLocationMarkers.map((marker, i) => (
            <div
              key={marker.storeId}
            >
              <CustomOverlayMap position={marker.position}>
                <SearchLocationicon eye={userEye(marker.userInfo.eyes)} onClick={() => {setMyLocationInfo(marker);}}>
                  <CharacterfaceIcon fill={marker.userInfo.faceColor}/>
                </SearchLocationicon>
              </CustomOverlayMap>
              {myLocationInfo && myLocationInfo.storeId === marker.storeId && (
                <MyLocationStoreModal
                  onClose={() => {
                    // if(!i===0) return;
                    setMyLocationInfo();
                    setMyLocationMarkers({ position: [...myLocationMarkers.position] });
                  }}
                />
              )}
            </div>
          ))}

          {/* 필터 데이터 */}
          {filterMarkers.map((marker, i) => (
            <div
              key={marker.storeId}
            >
              <CustomOverlayMap position={marker.position}>
                <SearchLocationicon eye={userEye(marker.userInfo.eyes)} onClick={() => {setFilterInfo(marker);}}>
                  <CharacterfaceIcon fill={marker.userInfo.faceColor}/>
                </SearchLocationicon>
              </CustomOverlayMap>
              {filterInfo && filterInfo.storeId === marker.storeId && (
                <TagFilterStoreModal
                  onClose={() => {
                    // if(!i===0) return;
                    setFilterInfo();
                    setFilterMarkers({ position: [...markers.position] });
                  }}
                />
              )}
            </div>
          ))}
        </Map>
      </>
    );
};

export default Keyword;

const MyLocationIcon = styled.div`
  width:12px;
  height:12px;
  border-radius: 50%;
  background-color:#7F7FFF;
  box-shadow: 0px 0px 4px 4px rgba(127, 95, 255,0.5);
`

const FirstLocationicon = styled.div`
  width:44px;
  height:44px;
  border-radius:50%;
  background-color:var(--BLACK);
  background-image:url(${({black_flag})=> black_flag});
  background-repeat:no-repeat;
  background-position:center;
  background-size:18px 21px;
  &:after {
    content:"";
    position:absolute;
    /* width:8px; */
    /* height:10px; */
    /* background-color:black; */
    border-top: 10px solid var(--BLACK);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position:absolute;
    bottom:-8px;
    left:50%;
    transform:translate(-50%)
  }
`

const SearchLocationicon = styled.div`
  width:44px;
  height:44px;
  border-radius:50%;
  border:none;
  background-color:var(--WHITE);
  background-image:url(${({black_flag})=> black_flag});
  background-repeat:no-repeat;
  background-position:center;
  background-size:18px 21px;
  display:flex;
  align-items:center;
  justify-content:center ;
  &:after {
    content:"";
    position:absolute;
    /* width:8px; */
    /* height:10px; */
    /* background-color:black; */
    border-top: 10px solid var(--WHITE);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position:absolute;
    bottom:-8px;
    left:50%;
    transform:translateX(-50%)
  }
  &:before {
      content:"";
      width:40px;
      height:40px;
      display:block;
      background-image:url(${({eye}) => eye});
      background-size:contain;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%)
    }
`
const CharacterfaceIcon = styled(Characterface)`
  width:40px;
  height:40px;
`
const SpeechBubble =styled.div`
  /* background-color:var(--WHITE); */
  /* box-shadow:var(--SHADOW1); */
  background-image:url(${({speech_bubble})=> speech_bubble}) ;
  background-position:center;
  background-repeat:no-repeat;
  width:258px;
  height:113px;
  z-index:100;

  position: absolute;
  bottom:154px;
  left:8.333%;
  border-radius:20px;
  display:flex;
  justify-content:space-between;
  padding:22px 16px 0 16px;
  
`

const RoomSpeechBubble = styled(SpeechBubble)`
  /* bottom:89px; */
  bottom:246px;
    /* &:hover {
      width:3000px;
      background-color:red;
    } */
`

const IconWrap = styled.li`
  /* width:54.53px; */
  display:flex;
  flex-direction:column;
  align-items:center;
`
const SaveWrap = styled(IconWrap)`
  /* justify-content:center; */
  margin-top:8.68px;
  width:49.19px;
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

const PlaceName = styled.h3`
  font-family: 'AppleSDGothicNeoM';
  font-style: normal;
  font-weight: 400;
  /* font-size: 24px; */
  font-size: 24px;
  line-height: 33px;
  color:var(--BLACK);
  margin-bottom:8px;
  max-width:170px;
  overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
` 
const AddressName = styled.p`
  font-family: 'AppleSDGothicNeoM';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color:var(--DEFAULT);
  width:170px;
  overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
`

const StarText = styled.p`
  font-family: 'Niramit';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  text-transform:capitalize;
  color:var(--BLACK);
  /* margin-top: 4px; */
`

const Tag = styled.p`
  border:1px solid var(--BLACK);
  border-radius: 21.5518px;
  padding:4px 12px;
  gap: 10px;
  font-family: 'AppleSDGothicNeoB';
  font-style: normal;
  font-size: 10px;
  line-height: 12px;
  color: var(--BLACK);
`
const DiscoveryUserInfo = styled.li`
    display:flex;
    align-items:flex-end;
    position:absolute;
    bottom:-13px;
    left:20px; 
    p {
        font-family: 'AppleSDGothicNeoB';
        font-style: normal;
        font-size: 12px;
        line-height: 160%;
        color:var(--BLACK); 
    }
`

const CharacterfaceWrap = styled.div`
    width:40px;
    height:40px;
    background-color:var(--WHITE);
    border-radius:50%;
    box-shadow:var(--SHADOW1);
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    margin-right:9.82px;
    &::before{
        content:"";
        width:36.36px;
        height:36.36px;
        background-image:url(${({eyes})=> eyes});
        background-repeat:no-repeat;
        background-size:36.36px;
        position:absolute;
        top:0;
        left:50%;
        transform:translateX(-50%);
    }
`
const NewCharacterface = styled(Characterface)`
    width:36.36px;
    height:36.36px;   
`
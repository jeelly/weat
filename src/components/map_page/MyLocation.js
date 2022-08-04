import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { MyLatLng } from '../../redux/modules/mapSlice';

const MyLocation = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        center: {
          lat: 0,
          lng: 0,
        },
        errMsg: null,
        isLoading: true,
    })
    useEffect(() => {
            if (navigator.geolocation) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                    ...prev,
                    center: {
                        lat: position.coords.latitude, // 위도
                        lng: position.coords.longitude, // 경도
                    },
                    isLoading: false,
                    }))
                },
                (err) => {
                    setState((prev) => ({
                    ...prev,
                    errMsg: err.message,
                    center: {
                        lat: 33.450701,
                        lng: 126.570667,
                    },
                    isLoading: false,
                    }))
                }
                )
            } else {
                // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                setState((prev) => ({
                ...prev,
                errMsg: "현재 위치를 불러올 수 없어요 권한을 허용해 주세요.",
                isLoading: false,
                }))
            }
    }, [])
    
    useEffect(()=> {
        if(state.center.lat===0) return;
        dispatch(MyLatLng({center:state.center, loading:true}))
    },[state])
}
export default MyLocation;
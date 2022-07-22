// MapContainer.js
import "../../../css/map.css";
import React, { useEffect, useRef } from "react";

const { kakao } = window;

const MapContainer = () => {
  const ref = useRef();

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // 지도에 마커를 표시합니다
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(33.450701, 126.570667),
    });

  //   // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다


  // 커스텀 오버레이에 표시할 컨텐츠 입니다
  // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에

  // let a = document.createElement("div");
  // a.addListener('wrap')

  let content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            카카오 스페이스닷원' + 
            '            <div class="close" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';

  // 마커 위에 커스텀오버레이를 표시합니다
  // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    let overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition(),
    });
  
  // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });
  // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    // kakao.maps.event.addListener(map, "click", function (e) {
    //   console.log(e)
    //   overlay.setMap(null);
    // });
    function closeOverlay() {
      overlay.setMap(null);
    }

    const remove = (e) => {
      if(e.target.title === "닫기") {
        closeOverlay();
        // console.log(e.target.title, "LOG")
        // console.dir(e.target.title === "닫기") dir = 함수가 가지고 있는 내용물을 뿌려줌 .. 지림
    }
  }
  ref.current.addEventListener('click', remove)
  return () => ref.current.removeEventListener('click', remove) // 컴포넌트가 끝날때 addEventListener를 지워줘야함 꼭 
  }, []);

  return (
    <div
      ref={ref}
      id="myMap"
      style={{
        width: "500px",
        height: "500px",
      }}
    ></div>
  );
};

export default MapContainer;

import { useState, useEffect } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
      //setTimeout이 끝났을때 callback해논 함수를 실행
    } else {
    //clearTimeout()메서드는 호출하여 이전에 설정된 시간 초과를 취소합니다
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true), 
    onTouchEnd: () => setStartLongPress(false),
    //mouseover : 해당 엘리먼트 위에 마우스 커서가 진입한 순간 이벤트 발생
    //mouseout : 해당 엘리먼트 위에서 마우스 커서가 이탈하는 순간 이벤트 발생
    //mousedown : 해당 엘리먼트 위에서 마우스 버튼을 클릭하는 순간 이벤트 발생
    //mouseup : 해당 엘리먼트 위에서 마우스 버튼 클릭 후 떼는 순간 이벤트 발생
    //mousemove : 해당 엘리먼트 위에서 마우스의 커서가 움직이는 동안 이벤트발생
  };
}
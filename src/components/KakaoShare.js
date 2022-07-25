import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";

const KakaoShare = ({roomName = '', ownerNickname = ''}) => {  
  const roomCode = useSelector(state => state.post.roomCode);
  
  useEffect(() => {
    initKakao()
  },[])

  //자바스크립트키로 카카오 초기화
  const initKakao = () => {
    if (window.Kakao){
      const kakao = window.Kakao;
      if(!kakao.isInitialized()){
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
    }
  }

//버튼을 누르면 실행되는 함수
  const shareKakao = () => {
        window.Kakao.Link.sendDefault({ 
          objectType: 'feed',
          content: {
            title: `${roomName}에 ${ownerNickname}님이 초대했습니다.`,
            description: '어떤 맛집들을 기록했는지, 같이 참여해보세요',
            imageUrl: 'https://velog.velcdn.com/images/bo-oram/post/ff869891-450e-4345-8dd3-07b38cebe279/image.png',
            link: {
              mobileWebUrl: 'https://weat.site/' + roomCode,
              webUrl: 'https://weat.site/' + roomCode,
            },
          },
          // social: {
          //   likeCount: 286,
          //   commentCount: 45,
          //   sharedCount: 845,
          // },
          buttons: [
            {
              title: '자세히 보기',
              link: {
                mobileWebUrl: 'https://weat.site/' + roomCode,
                webUrl: 'https://weat.site/' + roomCode,
              },
            },
            // {
            //   title: '앱으로 보기',
            //   link: {
            //     mobileWebUrl: url,
            //     webUrl: url,
            //   },
            // },
          ],
        });
      };
    
    
  
  
  
  return (
    <span onClick={shareKakao}>공유하기</span>
  );
}

export default KakaoShare;

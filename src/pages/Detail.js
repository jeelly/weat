import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../css/Style";
import { loadRoomDetailDB, findRoomCode,} from "../redux/modules/postSlice";
import { useDispatch, useSelector } from "react-redux";

import house from "../img/house.svg";

import Members from "../components/detail/Members";
import RestaurantList from "../components/detail/RestaurantList";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Title from "../components/detail/Title";
import { VioletRoundButton } from "../css/Style";
import SearchBar from "../components/makeRoom/SearchBar";
import Header from "../components/Header";
import { addNotiList } from "../redux/modules/socketSlice";
import Splash from "../components/Splash";
import { modalNum } from '../redux/modules/mapSlice';

const Detail = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { detail, users, storeList } = useSelector((state) => state.post.detail);
  const [serchBar, setSerchBar] = useState(false);
  const isloaded = useSelector((state) => state.post.detail_isloaded);
  const inviteUser = useSelector((state) => state.post.inviteUser);
  const myId = useSelector((state) => state.loggedIn.userInfo.userId);
  const [isLoading, setIsLoading] = useState(false);
  const modalRD = useSelector(state => state.map.modalNum); // 모달리덕스라는 뜻

  //실시간 맛집 추가 알림
  let guestId = users && users.guestInfo.map((user) => user.userId); // 게스트아이디
  let ownerId = users && users.owner.ownerId; //오너 아이디
  let allMembers = users && [...guestId, ownerId]; //모든 룸멤버
  let roomId = id; // 룸아이디
//   const [roomMembers, setRoomMembers] = useState(users && allMembers.filter((id) => id !== myId))
  let roomMembers = users && allMembers.filter((id) => id !== myId); // 나를뺀 룸멤버
 

  const newStoreNoti = () => {
    props.socket?.emit("TheStore", {
      roomId: roomId,
      userId: myId,
      memberId: roomMembers,
      storeName:'테스트맛집1'
    });
    console.log('룸아이디',roomId,'내아이디',myId,'멤버아이디',roomMembers)
    addNotiList()
  }

  const SearchModal = async () => {
    await dispatch(modalNum(modalRD?false:true))
    navigate('/map')
}

  useEffect(() => {
    const detail_load = async () => {
      await setIsLoading(true);
      await dispatch(loadRoomDetailDB(id));
      // dispatch(detailId(id));
      await dispatch(findRoomCode(id));
      
      await setIsLoading(false);
    };
    detail_load();
  }, []);
  
  return (
    <div>
      {isLoading ? <Splash /> : ""}
      <NewContainer status={detail?.status}>
        {/* <button onClick={newStoreNoti}>테스트용 버튼</button> */}
        <Header id={id} status={detail.status} roomName={detail.roomName} />
        {isloaded && <Title detail={detail} id={id} />}
        {isloaded && (
          <Members
            inviteUser={inviteUser}
            users={users}
            setSerchBar={setSerchBar}
          />
        )}
        {isloaded && <RestaurantList status={detail?.status} storeList={storeList} id={id} />}
        <RestaurantAdd onClick={SearchModal}><img src={house} alt="집아이콘"/>맛집 추가</RestaurantAdd>
        <SearchBar
          id={id}
          serchBar={serchBar}
          setSerchBar={setSerchBar}
          socket={props.socket}
        />
      </NewContainer>
    </div>
  );
};

export default Detail;

const NewContainer = styled(Container)`
  font-family: "AppleSDGothicNeoM00", sans-serif;
  height:100vh;
  background-color: ${({ status }) =>
    status === "publicOwner"
      ? "#FF7337"
      : status === "publicGuest"
      ? "#23C7C7"
      : "#FFBB55"};
  //status==='publicOwner'?'#FF7337': status==='publicGuest'? '#23C7C7' : '#FFBB55'
  padding: 0;
`;

const RestaurantAdd = styled(VioletRoundButton)`
  padding: 14px 27px 14px 24px;
`;

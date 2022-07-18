import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//component
import AppLayout from "../components/AppLayout";
import "../css/fonts/fontFace.css";
import Splash from "../components/Splash";

//슬라이스
import { loadRoomDB } from "../redux/modules/postSlice";
import { loggedInDB } from "../redux/modules/userSlice";

//Sub
import Singup from "../pages/Singup";
import FindUser from "../pages/FindUser";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Main from "../pages/Main";
import ListPage from "../pages/ListPage";
import Detail from "../pages/Detail";
import Post from "../pages/Post";
import MakeRoom from "../pages/MakeRoom";
import FaceCustom from "../components/signup/FaceCustom";
import Agreement from "../components/signup/Agreement";
import Essential from "../components/signup/Essential";
import BasicInfo from "../components/signup/BasicInfo";
import Completion from "../components/signup/Completion";
import EditListPage from "../pages/EditListPage";
import Edit from "../pages/Edit";
import MapPage from "../pages/MapPage";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLogin, userInfo } = useSelector((state) => state.loggedIn);
  const _rooms = useSelector((state) => state.post?._rooms);
  const isloaded = useSelector((state) => state.post.isloaded);
  const [isLoading, setIsLoading] = useState(false);

  //소셜 로그인
  const userToken = window.location.href.split("=")[1];
  const snsUserTokenSave = async () => {
    await localStorage.setItem("token", userToken);
    await dispatch(loggedInDB({ navigate, dispatch }));
    await dispatch(loadRoomDB(0));
  };
  useEffect(() => {
    if (userToken) {
      snsUserTokenSave();
    }
  }, [userToken]);
  

  //일반로그인
  const generalLogin = async () => {
    if (!userToken) {
      if (window.localStorage.getItem("token")) {
        await dispatch(loggedInDB({ navigate, dispatch }));
        await dispatch(loadRoomDB(0));
      }
      if (!window.localStorage.getItem("token")
      && !location.pathname.includes('signup')      
      ) {
        navigate("/login");
      }
    }
  };

  //데이터 불러오기
  useEffect(() => {
    const load = async () => {
      await setIsLoading(true);
      await generalLogin();
      await setIsLoading(false);
    };
    load();
  }, [isLogin, _rooms]);

  return (
    <>
      <Routes>
          <Route path="/detail" element={<Detail />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/listpage" element={<ListPage />} />
          <Route path="/listpage/:id" element={<ListPage />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/editlistpage" element={<EditListPage />} />
          <Route path="/editlistpage/:id" element={<EditListPage />} />
      </Routes>
      <AppLayout>
        {isLoading ? <Splash /> : ""}
        <Routes>
          <Route path="/" element={isloaded && <Main />} />
          <Route path="/post" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/signup" element={<Singup />}>
            <Route path="agreement" element={<Agreement />} />
            <Route path="essential" element={<Essential />} />
            <Route path="basicInfo" element={<BasicInfo />} />
            <Route path="faceCustom" element={<FaceCustom />} />
            <Route path="completion" element={<Completion />} />
          </Route>
          <Route path="/finduser" element={<FindUser />} />
          <Route path="/makeroom" element={<MakeRoom />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
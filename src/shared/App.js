import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//component
import AppLayout from "../components/AppLayout";

//슬라이스
import { loadpostDB } from "../redux/modules/postSlice";
import {loggedInDB} from "../redux/modules/userSlice";

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

import "../css/fonts/fontFace.css";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.loggedIn.isLogin)
  const [isloaded, setIsloaded] = useState(false);

  useEffect(() => {
    setIsloaded(true);
    // dispatch(loadpostDB(0));
    dispatch(loggedInDB())
  }, [isLogin]);


  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={isloaded && <Main />} />
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={isloaded && <Detail />} />
        <Route path="/detail:id" element={isloaded && <Detail />} />
        <Route path="/listpage" element={isloaded && <ListPage />} />
        <Route path="/listpage:id" element={isloaded && <ListPage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/editlistpage" element={isloaded && <EditListPage />} />
        <Route path="/editlistpage:id" element={isloaded && <EditListPage />} />
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
      </Routes>
    </AppLayout>
  );
}

export default App;

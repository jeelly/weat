import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { loadpostDB } from "../redux/modules/postSlice";
import { useDispatch } from "react-redux";

//component
import AppLayout from "../components/AppLayout";

//Sub
import Singup from "../pages/Singup";
import FindUser from "../pages/FindUser";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Main from "../pages/Main";
import ListPage from "../pages/ListPage";
import Detail from "../pages/Detail";
import Post from "../pages/Post";
import FaceCustom from "../components/signup/FaceCustom";
import Agreement from "../components/signup/Agreement";
import Essential from "../components/signup/Essential";
import BasicInfo from "../components/signup/BasicInfo";
import Completion from "../components/signup/Completion";

import "../css/fonts/fontFace.css";

function App() {
  const dispatch = useDispatch();
  const [isloaded, setIsloaded] = useState(false);

  useEffect(() => {
    setIsloaded(true);
    dispatch(loadpostDB(0));
  }, []);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={isloaded && <Main />} />
        <Route path="/post" element={<Post />} />
        <Route path="/listpage" element={isloaded && <ListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signup" element={<Singup />}>
          <Route path="agreement" element={<Agreement />} />
          <Route path="essential" element={<Essential />} />
          <Route path="basicInfo" element={<BasicInfo />} />
          <Route path="faceCustom" element={<FaceCustom />} />
          <Route path="completion" element={<Completion />} />
        </Route>
        <Route path="/finduser" element={<FindUser />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

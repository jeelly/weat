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

import '../css/fonts/fontFace.css'

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
        <Route path="/ListPage" element={isloaded && <ListPage />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/finduser" element={<FindUser />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
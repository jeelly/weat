import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from '../css/GlobalStyles'
import { useSelector } from "react-redux"

const AppLayout = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const detail = useSelector(state => state.post.detailId);
  const status = useSelector(state => state.post.detail.detail.status);

  useEffect(() => {
    return !detail ? setLoading(false) : setLoading(true)
  }, [detail]);

  return (
    <>
      {loading && <Header id={detail.id} status={detail.status} roomName={detail.roomName}/>}
      <div>{children}</div>
      {/* <Footer /> */}
      <GlobalStyles/>
    </>
  );
};


export default AppLayout
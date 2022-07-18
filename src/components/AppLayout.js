import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from '../css/GlobalStyles'
import { useSelector } from "react-redux"

const AppLayout = ({ children }) => {
  const id = useSelector(state => state.post.detailId.id);
  const loaded = useSelector(state => state.post.detailId.loaded);
  const detail = useSelector(state => state.post.detail.detail);
  
  return (
    <>
      <Header id={id} status={detail.status} roomName={detail.roomName}/>
      <div>{children}</div>
      {/* <Footer /> */}
      <GlobalStyles/>
    </>
  );
};


export default AppLayout
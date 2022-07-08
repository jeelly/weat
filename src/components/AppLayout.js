import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from '../css/GlobalStyles'


const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      {/* <Footer /> */}
      <GlobalStyles/>
    </>
  );
};


export default AppLayout
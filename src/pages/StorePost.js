import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import white_X_button from '../img/white_X_button.svg'
import white_arrow_button from '../img/white_arrow_button.svg'
import black_arrow_button from '../img/black_x_button.svg'
const StorePost = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;

    const noneHeader = () => {
        if(!url.indexOf('/storepost/success')) {
            return 'none'
        }
      }
      console.log(noneHeader())
    return (
        <>
        <Header xBtn={white_X_button} white_Btn={white_arrow_button} black_Btn={black_arrow_button} style={{display:noneHeader()}}>
            <button onClick={()=> {navigate(-1)}}>뒤로가기</button>
            <button onClick={()=> {navigate('/map')}}>나가기</button>
        </Header>
        <OutletWrap none={noneHeader()}>
        <Outlet/>
        </OutletWrap>
        </>
    );
};

export default StorePost;

const OutletWrap = styled.div`
    padding-top:${({none})=>none==='none'?"0px":'52px'};
`
const Header = styled.article`
    position:fixed;
    height:52px;
    width:100%;
    background-color:var(--BLACK);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 20.83px 0 24px;
    z-index:100;
    button {
        border:none;
        background-color:transparent;
        text-indent:-9999px;
        background-repeat:no-repeat;
        background-position: center;
    }
    button:first-child {
            background-image:url(${({white_Btn}) => white_Btn});
            width:7.41px;
            height:12px;
        }
    button:last-child {
            width:14.34px;
            height:14.34px;
            background-image:url(${({xBtn})=> xBtn});
        }
`

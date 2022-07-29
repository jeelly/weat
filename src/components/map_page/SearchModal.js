import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapSearch from './MapSearch';
import search_icon from '../../img/search_white_icon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { modalNum } from '../../redux/modules/mapSlice';
import { device } from'../../css/GlobalStyles.js'
const SearchModal = ({store_query}) => {
    const dispatch = useDispatch();
    const modalnums = useSelector(state => state.map.modalNum);
    const [modal, setModal] = useState(false)
    
    useEffect(()=>{
        setModal(modalnums)
    },[modalnums])

    const toggle = () => {
        setModal(modal?false:true)
        dispatch(modalNum(modal?false:true))
    }
    return (
        <Container modal={modal}>
            {modal ? 
            <MapSearchWrap modal={modal}>
                <MapSearch store_query={store_query} toggle={toggle} setModal={setModal}/>
            </MapSearchWrap> :
            <SearchBtn search_icon={search_icon} onClick={toggle}>검색창열기</SearchBtn>
            }
        </Container>
    );
};

export default SearchModal;

const Container = styled.div`
    position:fixed;
    width:${({modal})=> modal?'100%':'auto'};
    height:${({modal})=> modal?'100vh':'auto'};
    bottom:${({modal})=> modal?'0':'84px'};
    right:${({modal})=> modal?'0':'30px'};
    z-index:101;
    @media ${device.pc} {
        z-index:${({modal})=> modal?'102':'100'};
        width:480px;
        margin:0 auto;
        right:0;
        left:0;
        padding-right:30px;
        /* margin-right:${({modal})=> modal?'0':'0'}; */

        text-align:right;
    }
`
const MapSearchWrap = styled.div`
    display:${({modal})=> modal?'block':'none'};
    width:100%;
    position:absolute;
    top:0;
    right:0;
    z-index:100;
`

const SearchBtn = styled.button`
    width:52px;
    height:52px;
    border-radius:50%;
    border:none;
    text-indent:-9999px;
    background-color:var(--INFO);
    background-image:url(${({search_icon}) => search_icon});
    background-repeat:no-repeat;
    background-position:center;
`
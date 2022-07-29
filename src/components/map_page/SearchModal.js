import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapSearch from './MapSearch';
import search_icon from '../../img/search_white_icon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { modalNum } from '../../redux/modules/mapSlice';

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
    position:absolute;
    width:${({modal})=> modal?'100%':'auto'};
    height:${({modal})=> modal?'100vh':'auto'};
    bottom:${({modal})=> modal?'0':'16px'};
    right:${({modal})=> modal?'0':'30px'};
    z-index:100;
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
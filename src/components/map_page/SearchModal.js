import React, { useState } from 'react';
import styled from 'styled-components';
import MapSearch from './MapSearch';
import search_icon from '../../img/search_white_icon.svg'

const SearchModal = ({store_query}) => {
    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(modal?false:true)
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
    bottom:${({modal})=> modal?'0':'2.797%'};
    right:${({modal})=> modal?'0':'8.333%'};
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
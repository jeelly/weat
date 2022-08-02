import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyLocation from './MyLocation';
import RoomData from './RoomData';
import {ReactComponent as MyDesrpition} from '../../img/my_dscrpition.svg'
import {ReactComponent as MyTag} from '../../img/my_tag.svg'
import {ReactComponent as MyLocationIcon} from '../../img/my_location.svg'
import { useSelector } from 'react-redux';
import { device } from '../../css/GlobalStyles';
import TagTap from './TagTap';

const MapModal = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const modalNum = useSelector(state => state.map.modalNum);
    const filterActive = useSelector(state => state.map.tagFilterActive);
    console.log('==============')
    console.log(filterActive)

    useEffect(()=> {
        if(filterActive.length===0) return;
        setActiveIndex(filterActive.active)
    },[filterActive])

    useEffect(()=> {
        if(!modalNum===0) return;
        setActiveIndex(0)
        setAColor('#eee')
        0 === 0 ? setAColor('#eee') : setAColor('#999')
        0 === 1 ? setBColor('#eee') : setBColor('#999')
        0 === 2 ? setCColor('#eee') : setCColor('#999')
    },[modalNum])

    
    useEffect(()=> {
        
    },[])
    const tabClickHandler = async (index)=>{
        await setActiveIndex(index)
        console.log(activeIndex, index)
        index === 0 ? setAColor('#eee') : setAColor('#999')
        index === 1 ? setBColor('#eee') : setBColor('#999')
        index === 2 ? setCColor('#eee') : setCColor('#999')
    }


    const [aColor, setAColor] = useState('#999999')
    const [bColor, setBColor] = useState('#999999')
    const [cColor, setCColor] = useState('#999999')


    const tabContArr=[
        {
            tabTitle:(
                <ToggleBtn key="0" onClick={()=>tabClickHandler(activeIndex===0?4:0)}><MyLocationIcon stroke={aColor}/></ToggleBtn>
            ),
            tabCont:(
                <ContentWrap><MyLocation/></ContentWrap>
            )
        },
        {
            tabTitle:(
                <ToggleBtn key="1" onClick={()=>tabClickHandler(activeIndex===1?4:1)}><MyDesrpition fill={bColor}/></ToggleBtn>
            ),
            tabCont:(
                <ContentWrap><RoomData/></ContentWrap>
            )
        },
        {
            tabTitle:(
                <ToggleBtn key="2" onClick={()=>tabClickHandler(activeIndex===2?4:2)}><MyTag fill={cColor}/></ToggleBtn>
            ),
            tabCont:(
                <ContentWrap><TagTap/></ContentWrap>
            )
        }
    ];

    return (
        <Container>
            { tabContArr[activeIndex]?.tabCont }
            <ModalContainer>
                    {tabContArr.map((section, index)=>{
                        return section.tabTitle
                })}
            </ModalContainer>
        </Container>
    );
};

export default MapModal;

const Container = styled.article`
    @media ${device.pc} {
        width:480px;
        margin:0 auto;
    }
`;
const ModalContainer = styled.ul`
    background-color:var(--BLACK);
    height:52px;
    padding:0 40px;
    border-radius:100px;
    display: flex;
    align-items:center;
    position:fixed;
    left:8.333%;
    bottom:84px;
    z-index:101;
    @media ${device.pc} {
        /* bottom:152px; */
        left:50%;
        transform:translateX(-100%);
        /* width:480px; */
        /* right:0; */
        /* left:-22px; */
        /* text-align:right; */
        /* margin:0 auto; */
    }
`

const ToggleBtn = styled.div`
    width:16px;
    height:16px;
    background-color:transparent;
    margin-right:41.67px;
    cursor:pointer;
    &:last-child {
        margin-right:0;
    }
`

const ContentWrap = styled.li`
    z-index:100;
    position: absolute;
    /* bottom:13.986%; */
    bottom:0;
    left:3.333%;
`


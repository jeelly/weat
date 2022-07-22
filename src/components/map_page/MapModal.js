import React, { useState } from 'react';
import styled from 'styled-components';
import MyLocation from './MyLocation';
import RoomData from './RoomData';
import {ReactComponent as MyDesrpition} from '../../img/my_dscrpition.svg'
import {ReactComponent as MyTag} from '../../img/my_tag.svg'
import {ReactComponent as MyLocationIcon} from '../../img/my_location.svg'

const MapModal = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const tabClickHandler= async (index)=>{
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
                <ToggleBtn key="0" onClick={()=>tabClickHandler(0)}><MyLocationIcon stroke={aColor}/></ToggleBtn>
            ),
            tabCont:(
                <ContentWrap><MyLocation/></ContentWrap>
            )
        },
        {
            tabTitle:(
                <ToggleBtn key="1" onClick={()=>tabClickHandler(1)}><MyDesrpition fill={bColor}/></ToggleBtn>
            ),
            tabCont:(
                <ContentWrap><RoomData/></ContentWrap>
            )
        },
        {
            tabTitle:(
                <ToggleBtn key="2" onClick={()=>tabClickHandler(2)}><MyTag fill={cColor}/></ToggleBtn>
            ),
            tabCont:(
                <ContentWrap><div>준비중</div></ContentWrap>
            )
        }
    ];

    return (
        <Container>
            { tabContArr[activeIndex].tabCont }
            <ModalContainer>
                    {tabContArr.map((section, index)=>{
                        return section.tabTitle
                })}
            </ModalContainer>
        </Container>
    );
};

export default MapModal;

const Container = styled.article``
const ModalContainer = styled.ul`
    background-color:var(--BLACK);
    height:52px;
    padding:0 40px;
    border-radius:100px;
    display: flex;
    align-items:center;
    position: absolute;
    bottom:2.797%;
    left:8.333%;
    z-index:100;
`

const ToggleBtn = styled.div`
    width:16px;
    height:16px;
    background-color:transparent;
    margin-right:41.67px;
    &:last-child {
        margin-right:0;
    }
`

const ContentWrap = styled.li`
    z-index:100;
    position: absolute;
    bottom:13.986%;
    left:4.444%;
`
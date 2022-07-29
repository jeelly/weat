import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const Menu = ({data}) => {
    console.log(data)
    return (
        <Container>
            <SubTitleWrap>
                    <SubTitle>추천메뉴</SubTitle>
            </SubTitleWrap>
            <TagContainer>
                <MenuTagWrap>
                    {data.map((arr, idx)=>(
                        <MenuItem key={idx} data={arr}/>
                    ))}
                </MenuTagWrap>
            </TagContainer>
        </Container>
    );
};

export default Menu;

const Container = styled.div`
    width:360px;
    padding:0 16px;
`
const SubTitleWrap = styled.div`
    display:flex;
    justify-content:flex-start;
`

const SubTitle = styled.h3`
    font-family: 'AppleSDGothicNeoB';
    font-style: normal;
    font-size: 12px;
    line-height: 160%;
    color:var(--BLACK);
    opacity: 0.8;
`
const TagContainer = styled.div`
    display:flex;
    margin-bottom:65.5px;
`

const MenuTagWrap = styled.ul`
    display:flex;
    padding:16px 0 61.5px 0;
    padding-right:8px;
    overflow: auto;
    white-space: nowrap;
    &::-webkit-scrollbar {
    height:0px;
    position:absolute;
    top:0;
    left:0;
    }
    &::-webkit-scrollbar-thumb {
        background:transparent;
    }
    &::-webkit-scrollbar-track {
        background:transparent;
    }
`
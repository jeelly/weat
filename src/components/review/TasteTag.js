import React from 'react';
import styled from 'styled-components';

const StoreInfo = ({data}) => {

    return (
        <Content>
                <ContentTitle>
                    <strong>맛 태그</strong>
                </ContentTitle>
                <ContentBox>
                    {data.tagMenu.filter((l,i)=> i < 3).map((menu, i) => (
                        <>
                        <p>{menu}</p>
                        </>
                    ))}
                    {data.tagPoint.filter((l,i)=> i < 3).map((point, i) => (
                        <p>{point}</p>
                    ))}
                    {data.tagTasty.filter((l,i)=> i < 3).map((tasty, i) => (
                        <p>{tasty}</p>
                    ))}
                </ContentBox>
        </Content>
    );
};

export default StoreInfo;

const Content = styled.section`
    margin-top:66px;
    margin-bottom:40px;
`

const ContentTitle = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    strong {
        font-family:'AppleSDGothicNeoSB';
        font-style:normal;
        font-weight:500;
        font-size: 18px;
        line-height: 160%;
        color:var(--BLACK)
    }
    button {
        border:none;
        background-color:var(--INFO);
        border-radius:60px;
        width: 94px;
        height: 38px;
        cursor:pointer;
        font-family: 'AppleSDGothicNeoB';
        font-style: normal;
        font-size: 12px;
        line-height: 160%;
        color:var(--WHITE)
    }
`

const ContentBox = styled.div`
    width: 328px;
    height: 210px;
    background: var(--WHITE);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    gap:10px;
    margin-top:12px;
    position:relative;
    p {
        font-family: 'AppleSDGothicNeoUL';
        font-style: normal;
        font-weight: 300;
        line-height: 160%;
        color:var(--INFO);
        position:absolute;
    }
    p:nth-child(1) {
        left:90.91px;
        top:70px;
        font-size:32px;
    }
    p:nth-child(2) {
        left:30.9px;
        top:48px;
        font-size:14px;
    }
    p:nth-child(3) {
        left:90.08px;
        top:24.25px;
        font-size:14px;
    }

    p:nth-child(4) {
        left:35.45px;
        bottom:56.75px;
        font-size:14px;
    }
    p:nth-child(5) {
        left:93.36px;
        bottom:24.25px;
        font-size:14px;
    }
    p:nth-child(6) {
        bottom:55px;
        left:133.91px;
        font-size:18px;
    }

    p:nth-child(7) {
        right:50.09px;
        top:41px;
        font-size:24px;
    }
    p:nth-child(8) {
        right:30.09px;
        bottom:93px;
        font-size:14px;
    }
    p:nth-child(9) {
        bottom:29px;
        right:50.98px;
        font-size:14px;
    }
`
import React from 'react';
import styled from 'styled-components';

const StoreInfo = ({data}) => {
    const Phone = () => {
        return 'tel' + data.phone
    }

    return (
        <Content>
                <ContentTitle>
                    <strong>가게정보</strong>
                </ContentTitle>
                <ContentBox>
                    <li>
                        <b>위치</b>
                        <p>{data.address}</p>
                    </li>
                    <li>
                        <b>번호</b>
                        <a href={Phone()}>{data.phone ? data.phone : "정보없음"}</a>
                    </li>
                    <li>
                        <b>주소</b>
                        <a href={data.placeURL}>{data.placeURL}</a>
                    </li>
                    <li>
                        <b>정보</b>
                        <p>{data.tag.map((category, idx) => (
                            <span key={idx}>{data.tag.length === idx+1 ? category : category + '>'}</span>
                        ))}</p>
                    </li>
                </ContentBox>
        </Content>
    );
};

export default StoreInfo;

const Content = styled.section`
    margin-top:53px;
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

const ContentBox = styled.ul`
    width: 328px;
    background: var(--WHITE);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    gap:10px;
    padding: 20px 0px 20px 30px;
    margin-top:12px;
    li {
        display:flex;
        margin-bottom:20px;
    }
    li:last-child {
        margin-bottom:0;
    }
    li > p, a {
        color:var(--BLACK);
        text-decoration:none;
        font-family: 'AppleSDGothicNeoUL';
        font-style: normal;
        font-size: 14px;
        line-height: 160%;
    }
    li > b {
        font-family: 'AppleSDGothicNeoB';
        font-style: normal;
        font-size: 14px;
        line-height:160%;
        opacity: 0.8;
        color:var(--BLACK);
        margin-right:24px;
    }
`
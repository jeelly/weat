import React, { useEffect } from 'react';
import styled from 'styled-components';
import { detailId } from '../../redux/modules/postSlice';
import { useDispatch } from "react-redux";
const Title = ({detail, id}) => {
    const dispatch = useDispatch();
    console.log(detail)
    useEffect(() => {
        dispatch(detailId({
            'id':id,
            'status':detail.status,
            'roomName':detail.roomName
        }));
    }, []);

    return (
        <Container>
            <div>{detail.emoji}</div>
            <h2>{detail.roomName}<hr/></h2>
        </Container>
    );
};

export default Title;

const Container = styled.div`
    display:flex;
    padding:0 16px;
    align-items:flex-end;
    margin-left:22px;
    div {
        font-size:36px;
    }
    h2 {
        text-align:left;
        display:block;
        width:100%;
        margin-left:24px;
        font-weight:300;
        font-size:26px;
        line-height:31px;
    }
    hr{
        border: 1px solid #2D2D2D;
        margin-top:6px;
    }
`
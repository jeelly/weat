import React, { useState } from 'react';
import styled from 'styled-components';
import {ReactComponent as Like} from '../../img/fixed/Like.svg'
import instance from '../../shared/axios';
import { useMutation, useQueryClient } from 'react-query';

const MenuItem = ({data}) => {

    const QueryClient = useQueryClient();
    const menuLikeToggleDB = () => {
        return instance.post(`/api/like/menu/${data.menuId}`);
    }
      const menuLikeDelDB = () => {
          return instance.delete(`/api/like/menu/${data.menuId}`);
    }

    const LikeToggle = useMutation(menuLikeToggleDB, {
        onSuccess: (response) => {
            QueryClient.invalidateQueries("Menu") //여기 키값 넣어야함
            
        }
     });
      
      const LikeDel = useMutation(menuLikeDelDB, {
        onSuccess: (response) => {
            QueryClient.invalidateQueries("Menu") //여기 키값 넣어야함
            
        }
    });

    const [toggle, setToggle] = useState(data.likeDone);
    const [toggleNum, setToggleNum] = useState(data.menuLikeNum);

    const likeToggle = () => {
        setToggle(toggle?false:true)
        setToggleNum(toggle && !isNaN(toggleNum)?toggleNum-1:toggleNum+1)
        if(!data.likeDone){
            LikeToggle.mutate();
          }else {
            LikeDel.mutate();
        }
    }
    return (
        <MenuTag toggle={toggle}>
            <strong>{data.menuName}</strong>
            <button onClick={likeToggle}><NewLike fill={toggle?'#7F5FFF':'#999999'}/>{toggleNum}</button>
        </MenuTag>
    );
};

export default MenuItem;

const MenuTag = styled.li`
    position:relative;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    padding: 12px;
    gap: 10px;
    height: 74px;
    background:var(--WHITE);
    box-shadow:0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;

    margin-left:12px;
    &:first-child {
        margin-left:0;
    }

    strong {
        font-family: 'Noto Sans CJK KR';
        font-style: normal;
        font-weight: 350;
        font-size: 13px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color:var(--BLACK);
        opacity: 0.8;
    }
    button {
        border:none;
        background-color:transparent;
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        text-transform: capitalize;
        /* color:var(--DEFAULT); */
        color:${({toggle})=>toggle?'#7F5FFF':'#999999'};
        display:flex;
        align-items:flex-start;
    }
`
const NewLike = styled(Like)`
    margin-right:5px;
`
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import styled from 'styled-components';

import {ReactComponent as Characterface} from '../../img/characterface.svg';
import plus from '../../img/detail_plus.svg';
import diagonal from '../../img/diagonal.svg';
import {ReactComponent as Flag} from '../../img/fixed/blackFlag.svg';
import { editModal } from '../../redux/modules/postSlice';
import Member from './Member';
import { eyeList } from "../../components/signup/FaceResource";
import { device } from '../../css/GlobalStyles';

const Members = ({users, setSerchBar}) => {
    const { memberCount, guestInfo, owner } = users;
    const serchBarOpen = useCallback(() => {
        setSerchBar(true);
      }, []);

      //중복 제거
    const members = guestInfo.reduce(function(acc, current) {
        if (acc.findIndex(({ userId }) => userId === current.userId) === -1) {
            acc.push(current);
        }
        return acc;
    }, []);

    const userEye = (eye) => {
        return eyeList.filter((row) => row.includes(eye) && row);
    };
    return (
            <Container>
                <MumbersTotal>
                    <b>Members</b>
                    <p><span>{memberCount}</span>/20</p>
                </MumbersTotal>
                <MembersIcon>
                    <Shared>
                        <SharedBtn plus={plus} onClick={serchBarOpen}>공유하기 버튼</SharedBtn>
                        <p>멤버초대</p>
                    </Shared>
                    <MembersInfoWrap>
                        <MembersInfo>
                        <Owner eye={userEye(owner.eyes)}>
                            <NewFlag fill="red"/>
                            <NewCharacterface fill={owner.faceColor}/>
                            <p>{owner.nickname}</p>
                        </Owner>
                            {members.map((user,idx)=> (
                                <Guest key={user.userId} eye={userEye(user.eyes)}>
                                    <Member nickname={user.nickname} faceColor={user.faceColor} userId={user.userId} />
                                </Guest>
                            ))}

                        </MembersInfo>
                    </MembersInfoWrap>
                </MembersIcon>
            </Container>
    );
};

export default Members;

// 멤버
const Container = styled.div`
    padding:0 16px;
    overflow:hidden;
`
const MumbersTotal = styled.div`
    display:flex;
    justify-content:space-between;
    margin:20px auto 30px auto;
    padding-right:16px;
    b {
        font-weight: 700;
        font-size:14px;
        line-height:18px;
        text-transform:capitalize;
        color:var(--BLACK);
    }
    p{
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-align: right;
        text-transform: capitalize;
        color:var(--BLACK)
    }
`
const Shared = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    line-height: 160%;
    position:relative;
    &:after {
        content:"";
        display:block;
        width: 1px;
        height: 86px;
        background: #CCCCCC;
        opacity: 0.5;
        position: absolute;
        right:-13px;
        bottom:0;
    }
`
const SharedBtn = styled.button`
    width:40px;
    height:40px;
    border-radius:50%;
    border:2px solid var(--BLACK);
    text-indent:-9999px;
    background-color:transparent;
    background-image:url(${({plus}) => plus});
    background-size:13px;
    background-repeat:no-repeat;
    background-position:center;
    margin-bottom:12px;
`

const MembersIcon = styled.div`
    display:flex;
    align-items:center;
    position:relative;
    text-align:center;
`
const MembersInfoWrap = styled.div`
    width:81.097%;
    /* width:247px; */
    position:absolute;
    /* top:0; */
    left:76px;
`
const MembersInfo = styled.ul`
  height:128px;
  display:flex;
  align-items:center;
  width:100%;
  overflow-x:overlay;
  white-space: nowrap;
  display:flex;
  &::-webkit-scrollbar {
    height:36px;
  }
  &::-webkit-scrollbar-thumb {
    background-color:rgba(0,0,0,0.1);
  }
  &::-webkit-scrollbar-track {
    background-color:rgba(0,0,0,0.2);
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
  @media ${device.pc} {
        &::-webkit-scrollbar {
        transform: scaleX(-1);
        }
    }

  li {
    position:relative;
    margin-right:24px;
  }
  li > p {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color:var(--DARKEST)
    
  }
`;

const NewCharacterface = styled(Characterface)`
    width:44px;
    height:44px;
    margin-bottom:10px;
    border-radius:50%;
    border:2px solid var(${({memberdel}) => memberdel? '--DEFAULT' : '--WHITE'});
    background-color:var(--WHITE);
    box-shadow:var(--SHADOW1);
    opacity:0.;
`
// memberdel={memberdel}
const DelImg = styled.div`
        display:${({memberdel})=> memberdel ? 'block' : 'none'};
        width:44px;
        height:44px;
        /* background-color:blue; */
        background-image:url(${diagonal});
        background-size:44px;
        background-repeat:no-repeat;
        background-position:center;
        position: absolute;
        top:0;
        left:50%;
        transform:translate(-50%,0);
`
const NewFlag = styled(Flag)`
    position:absolute;
    top:-17.33px;
    left:50%;
    transform: translateX(-50%);
`
const Owner = styled.li`
    position:relative;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color:var(--DARKEST);
    /* margin-left:34px; */
    &:after {
        content:"";
        width:40px;
        height:40px;
        display:block;
        background-image:url(${({eye}) => eye});
        background-size:contain;
        position:absolute;
        top:0;
        left:50%;
        transform:translateX(-50%);
    }
`

const Guest = styled.li`
    position:relative;
    &:after {
        pointer-events :none;
        content:"";
        width:40px;
        height:40px;
        display:block;
        background-image:url(${({eye}) => eye});
        background-size:contain;
        position:absolute;
        top:0;
        left:50%;
        transform:translateX(-50%);
    }
`
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as Characterface} from '../../img/characterface.svg';
import {ReactComponent as Flag} from '../../img/fixed/blackFlag.svg';
import plus from '../../img/detail_plus.svg'

const Members = ({users}) => {
    const { memberCount, guestInfo, owner } = users;
    let navigate = useNavigate();
    console.log(users)
    return (
            <Container>
                <MumbersTotal>
                    <b>Members</b>
                    <p><span>{memberCount}</span>/20</p>
                </MumbersTotal>
                <MembersIcon>
                    <Shared>
                        <SharedBtn plus={plus} onClick={()=>{navigate("/");}}>멤버초대 버튼</SharedBtn>
                        <p>멤버초대</p>
                    </Shared>
                    <MembersInfoWrap>
                        <MembersInfo>
                            <Owner>
                                <NewFlag fill="red"/>
                                <NewCharacterface fill={owner.faceColor}/>
                                <p>{owner.nickname}</p>
                            </Owner>
                            {guestInfo.map((user,idx)=> (
                                <li key={user.userId}>
                                    <NewCharacterface fill={user.faceColor}/>
                                    <p>{user.nickname}</p>
                                </li>
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
        color:var(--WHITE)
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
    cursor:pointer;
`

const MembersIcon = styled.div`
    display:flex;
    align-items:center;
    position:relative;
    text-align:center;
`
const MembersInfoWrap = styled.div`
    width:75.304%;
    /* width:247px; */
    position:absolute;
    top:0;
    left:77px;
`
const MembersInfo = styled.ul`
  /* height:87px; */
  /* overflow: auto; */
  /* align-items: center; */
  white-space: nowrap;
  display:flex;
  &::-webkit-scrollbar {
    height:3px;
    position:absolute;
    top:0;
    left:0;
  }
  &::-webkit-scrollbar-thumb {
    background-color:var(--LIGHTEST);
  }
  &::-webkit-scrollbar-track {
    background-color:rgba(238, 238, 238,0.2);
    transform: matrix(1, 0, 0, -1, 0, 0);
  }


  li {
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
    width:40px;
    height:40px;
    margin-bottom:10px;
    border-radius:50%;
    border: 2px solid var(--WHITE);
    background-color:var(--WHITE);
`
const NewFlag = styled(Flag)`
    position:absolute;
    top:-17.33px;
    left:50%;
    transform: translateX(-50%);
`
const Owner = styled.li`
    position:relative;
`
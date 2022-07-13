import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import inviteBtn from "../../img/icon/inviteBtn.svg";
import { ReactComponent as Face } from "../../img/characterface.svg";

const Members = () => {
  const me = useSelector((state) => state.loggedIn.userInfo);
  console.log(me);
  return (
    <MembersWrap>
      <MemberCount>
        <span>Members</span>
        <span>1/20</span>
      </MemberCount>
      <InviteWrap>
        <Invite>
          <img src={inviteBtn} alt="" />
          <p>멤버초대</p>
        </Invite>
        <RoomMembers>
          <li>
            <Characterface>
                <Face fill={me.faceColor} />
            </Characterface>
            <p>나</p>
          </li>
        </RoomMembers>
      </InviteWrap>
    </MembersWrap>
  );
};

const MembersWrap = styled.div`
  margin-top: 30px;
`;

const InviteWrap = styled.div`
    display: flex;
`
const MemberCount = styled.div`
  margin-bottom: 12px;
`;
const Invite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 68px;
  height: 90px;
  padding-right: 4px;
  border-right: 1px solid var(--LIGHTER);
  img {
  }
  p {
    font-family: "AppleSDGothicNeoSB00";
    font-size: 12px;
    line-height: 17px;
    padding-top:12px;
  }
`;
const RoomMembers = styled.div`

`
const Characterface = styled.div`
    width:44px;
    height:44px;    
    background-color: #fff;
    border: 2px solid #fff;
    box-shadow: var(--SHADOW1);
    border-radius: 50%;
    ::after{
        content: url();
    }
`


export default Members;

import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import inviteBtn from "../../img/icon/inviteBtn.svg";
import { ReactComponent as Face } from "../../img/characterface.svg";
import flagIcon from "../../img/icon/flag.svg";
import { eyeList } from "../../components/signup/FaceResource";

const Members = (props) => {
  const me = useSelector(state => state.loggedIn.userInfo);
  console.log(me)
  const { tasteRoom } = useSelector(state => state.roomMaking);
  const serchBarOpen = useCallback(() => {
    props.setSerchBar(true);
  }, []);
  const userEye = (eye) => {
    return eyeList.filter((row) => row.includes(eye) && row);
  };
  return (
    <MembersWrap>
      <MemberCount>
        <span>Members</span>
        <span>
          <span className="count">{tasteRoom.invitedFriends.length + 1}</span>/20
        </span>
      </MemberCount>
      <InviteWrap>
        <Invite>
          <li className="addMember">
            <div onClick={serchBarOpen}>
              <img src={inviteBtn} alt="" />
              <p>멤버초대</p>
            </div>
          </li>
          <li className="memberList">
            <ul>
              <Member eye={userEye(me.eyes)}>
                <UserFace fill={me.faceColor} />
                <p>나</p>
              </Member>
              {tasteRoom.invitedFriends.map((f, idx) => {
                const friend = f.split(",");
                return (
                  <Member eye={userEye(friend[1])} key={friend[0]}>
                    <UserFace fill={friend[2]} />
                    <p>{friend[3]}</p>
                  </Member>
                );
              })}
            </ul>
          </li>
        </Invite>
      </InviteWrap>
    </MembersWrap>
  );
};

const MembersWrap = styled.div`
  margin-top: 30px;
`;

const MemberCount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-family: "Niramit";
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #666;
  span:last-child {
    font-weight: 500;
    color: #2d2d2d;
    font-size: 12px;
    span {
      font-weight: 700;
    }
  }
`;
const InviteWrap = styled.div``;
const Invite = styled.ul`
  display: grid;
  height: 86px;
  grid-template-columns: 76px 1fr;
  align-items: end;
  font-family: "AppleSDGothicNeoSB";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  p {
    margin-top: 12px;
  }

  .addMember {
    padding: 2px 0 0 14px;
    border-right: 1px solid var(--LIGHTER);
    div {
      width: 42px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 40px;
      }
    }
  }
  .memberList {
    width: calc(100% + 16px);
    overflow: scroll;
    ul {
      display: flex;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 16px;
      }
      /* li:last-child {
        margin-right: 16px;
      } */
    }
  }
`;
const UserFace = styled(Face)`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: var(--SHADOW1);
  position: relative;
`;

const Member = styled.li`
  position: relative;
  text-align: center;
  max-width: 60px;
  ::before {
    content: '';
    background-image: url(${(props) => props.eye});
    background-repeat: no-repeat;
    background-size: 100% auto ;
    position: absolute;
    width: 44px;
    height: 44px;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
  }
`;
export default Members;

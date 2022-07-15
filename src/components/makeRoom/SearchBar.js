import React, { useState } from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import close from "../../img/close.svg";
import search from "../../img/search.svg";
import { ReactComponent as Face } from "../../img/characterface.svg";

import { friendDB, addFriends } from "../../redux/modules/roomMakingSlice";
import { eyeList } from "../../components/signup/FaceResource";

import { VioletRoundTextBtn } from "../../css/Style";

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.roomMaking);
  const [searchInput, setSearchInput] = useState("");
  const [checkedInputs, setCheckedInputs] = useState([]);
console.log(checkedInputs)
  //검색 키워드
  const onChangeInputValue = (e) => {
    setSearchInput(e.target.value);
  };

  //aside닫힘
  const serchBarCrose = () => {
    props.setSerchBar(false);
  };

  //검색결과 불러오기
  const userSearching = useCallback(() => {
    dispatch(friendDB(searchInput));
  }, [searchInput, dispatch]);

  //검색된 목록의 눈
  const userEye = (eye) => {
    return eyeList.filter((row) => row.includes(eye) && row);
  };

  //초대 대상 선택
  const userSelector = (e) => {
    if (e.target.checked) {
      return setCheckedInputs([...checkedInputs, e.target.value]);
    } else {
      const test = checkedInputs.filter((el) => el !== e.target.value);
      return setCheckedInputs(test);
    }
  };
  const Inviting = () => {
    dispatch(addFriends(checkedInputs));
    props.setSerchBar(false);
  };

  const checked = (userId) => {
    checkedInputs.map((a) => {
      return a.includes(userId);
    });
  };

  return (
    <SearchWrap serchBarPosition={props.serchBar}>
      <section className="header">
        <p>Invite Members</p>
        <button onClick={serchBarCrose} />
      </section>
      <section>
        <SerchBar>
          <label htmlFor="">
            <input
              type="text"
              placeholder="유저 검색 가능"
              onChange={onChangeInputValue}
            />
            <button onClick={userSearching} />
          </label>
        </SerchBar>
        <UserListWrap>
          <ul>
            {
              searchResults ? 
              searchResults.map((u, idx) => {
                return (
                  <li key={u.userId}>
                    <UserFace eyes={userEye(u.eyes)}>
                      <UserFaceItem fill={u.faceColor} />
                    </UserFace>
                    <section>
                      <div>
                        <p>{u.name}</p>
                        <p>{u.nickname}</p>
                      </div>
                      <input
                        value={[
                          u.userId,
                          userEye(u.eyes),
                          u.faceColor,
                          u.nickname,
                        ]}
                        type="checkBox"
                        onChange={userSelector}
                        checked={checked(u.userId)}
                      />
                    </section>
                  </li>
                );
              })
              : null
            }
            
          </ul>
        </UserListWrap>
      </section>
      <WhiteShadow>
        <InvitationButton onClick={Inviting}>
          선택 멤버 초대하기 <span>
            {checkedInputs.length}
            <span>/20</span>
          </span>
        </InvitationButton>
      </WhiteShadow>
    </SearchWrap>
  );
};

const SearchWrap = styled.aside`
  position: fixed;
  top: 0;
  right: ${(props) => (props.serchBarPosition ? 0 : "-280px")};
  width: 280px;
  height: 100vh;
  /* min-height: ${(props) => props.bodyHeight + "px"}; */
  overflow: hidden;
  background-color: #fff;
  z-index: 3;
  box-shadow: ${(props) =>
    props.serchBarPosition
      ? "0px 6px 10px rgba(153, 153, 153, 0.2), 0px 1px 18px rgba(153, 153, 153, 0.2), 0px 3px 5px rgba(153, 153, 153, 0.2)"
      : "none"};
  padding: 0 20px;
  transition: right 0.5s;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 52px;
    font-family: "Niramit";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: var(--DARKER);
    button {
      width: 16px;
      height: 16px;
      background-image: url(${close});
      background-size: cover;
      border: none;
      background-color: transparent;
    }
  }
`;
const SerchBar = styled.div`
  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #2d2d2d;
    padding-bottom: 9px;
    font-family: "AppleSDGothicNeoUL00";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    margin-top: 20px;
    margin-bottom: 20px;

    input {
      border: none;
      outline: none;
      width: 80%;
      ::placeholder {
        font-size: 12px;
        color: var(--DEFAULT);
      }
    }
    button {
      background-image: url(${search});
      background-size: cover;
      width: 24px;
      height: 24px;
      border: none;
      background-color: transparent;
    }
  }
`;

const UserListWrap = styled.div`
  height: 100vh;
  overflow: scroll;
  div {
    p {
      :first-child {
        font-family: "AppleSDGothicNeoB";
        font-size: 14px;
        line-height: 160%;
        color: var(--DARKEST);
        padding-top:2px;
      }
      :last-child {
        font-family: "AppleSDGothicNeoT";
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        color: var(--DEFAULT);
        padding-top: 4px;
      }
    }
  }

  li {
    display: grid;
    grid-template-columns: 44px 1fr;
    padding: 12px 0;
    border-bottom: 1px solid #dedede;
    :first-child {
      padding-top: 0;
    }
    section {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
    }
  }
`;

const UserFace = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: var(--SHADOW1);
  svg {
    width: 40px;
    height: 40px;
  }
  ::after {
    /* content: url(${(props) => props.eyes}); */
    content: "";
    background-image: url(${(props) => props.eyes});
    background-size: 100% auto;
    position: absolute;
    width: 44px;
    height: 44px;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
  }
`;
const UserFaceItem = styled(Face)`
  width: 44px;
  height: 44px;
`;

const WhiteShadow = styled.div`
  position: absolute;
  width: 280px;
  height: 100px;
  background: linear-gradient(transparent, #fff);
  bottom: 0;
  right: 0;
  z-index: 2;
`;

const InvitationButton = styled(VioletRoundTextBtn)`
  position: absolute;
  right:45px;
  bottom:30px;
  z-index: 3;
  padding: 0 24px;
  box-sizing: content-box;
  width: auto;
  span {
    padding-left:8px;
    span{
      opacity: 0.4;
      padding-left: 2px;
    
    }
  }
`;
export default SearchBar;

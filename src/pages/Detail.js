import React from 'react';
import styled from 'styled-components';
import {Container} from '../css/Style'
import plus from '../img/detail_plus.svg';
import house from '../img/house.svg';
import arrow from '../img/Detail_Item_arrow.svg';
import {ReactComponent as Characterface} from '../img/characterface.svg';
import { Link } from 'react-router-dom';

const Detail = () => {
    return (
        <NewContainer>
            <Title>
                <div>🤡</div>
                <h2>회사근처맞집
                <hr/>
                </h2>
            </Title>
            <Members>
                <MumbersTotal>
                    <b>Members</b>
                    <p><span>8</span>/20</p>
                </MumbersTotal>
                <MembersIcon>
                    <Shared>
                        <SharedBtn plus={plus} >공유하기 버튼</SharedBtn>
                        <p>공유하기</p>
                    </Shared>
                    <MembersInfoWrap>
                        <MembersInfo>
                            <li>
                                <NewCharacterface fill='#23C7C7'/>
                                <p>나</p>
                            </li>
                            <li>
                                <NewCharacterface fill='#FF7337'/>
                                <p>회오리감자</p>
                            </li>
                            <li>
                                <NewCharacterface fill='#7F5FFF'/>
                                <p>나도줘닭발</p>
                            </li>
                            <li>
                                <NewCharacterface fill='#FFBB55'/>
                                <p>오늘도놀고먹고</p>
                            </li>
                            <li>
                                <NewCharacterface fill='#23C7C7'/>
                                <p>나</p>
                            </li>
                            <li>
                                <NewCharacterface fill='#FF7337'/>
                                <p>회오리감자</p>
                            </li>
                            <li>
                                <NewCharacterface fill='#7F5FFF'/>
                                <p>나도줘닭발</p>
                            </li>
                            <li>
                                <NewCharacterface fill='#FFBB55'/>
                                <p>오늘도놀고먹고</p>
                            </li>
                        </MembersInfo>
                    </MembersInfoWrap>
                </MembersIcon>
            </Members>
                <Restaurant>
                    <RestaurantInfo>
                        <header>
                            <Total>Total <span>62</span></Total>
                            <ListLink to="/ListPage" >All</ListLink>
                        </header>
                        <RestaurantItemWrap>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow}/></LinkBtn>
                                </li>
                            </RestaurantItem>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow}/></LinkBtn>
                                </li>
                            </RestaurantItem>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow}/></LinkBtn>
                                </li>
                            </RestaurantItem>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow}/></LinkBtn>
                                </li>
                            </RestaurantItem>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow}/></LinkBtn>
                                </li>
                            </RestaurantItem>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow}/></LinkBtn>
                                </li>
                            </RestaurantItem>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow}/></LinkBtn>
                                </li>
                            </RestaurantItem>
                            <RestaurantItem>
                                <ImgWrap>
                                    <RestaurantImg src="http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019" alt="음식사진"/>
                                </ImgWrap>
                                <li>
                                    <ul>
                                        <HashTagWrap>
                                            <HashTag>사내할인</HashTag>
                                            <HashTag>한식</HashTag>
                                        </HashTagWrap>
                                        <li><RestaurantName>우리네 손두부</RestaurantName></li>
                                        <li><RestaurantContent>8000원으로 점심식사해</RestaurantContent></li>
                                    </ul>
                                </li>
                                <li>
                                    <LinkBtn to="/"><img src={arrow} alt='화살표'/></LinkBtn>
                                </li>
                            </RestaurantItem>
                        </RestaurantItemWrap>
                    </RestaurantInfo>
                </Restaurant>
                <RestaurantAdd><img src={house} alt="집아이콘"/>맛집 추r</RestaurantAdd>
        </NewContainer>
    );
};

export default Detail;

const NewContainer = styled(Container)`
    background-color:#FF7337 ;
    /* overflow: hidden; */
    /* height:100vh; */
    /* width:360px; */
    padding:0;
`
const Title = styled.div`
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
// 멤버
const Members = styled.div`
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
    left:97px;
`
const MembersInfo = styled.ul`
  height:86px;
  overflow: scroll;
  overflow: auto;
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
`

const Restaurant = styled.div`
    width:100%;
    overflow:hidden;
    padding:0 8px;
`
const RestaurantInfo = styled.div`
    background-color:var(--WHITE);
    box-shadow: 0px 12px 17px rgba(153, 153, 153, 0.2), 0px 5px 22px rgba(153, 153, 153, 0.2), 0px 7px 8px rgba(153, 153, 153, 0.2);
    width:100%;
    margin-top:34px;
    border-radius:18px 18px 0 0;
    padding:20px 16px 0 16px;
    header {
        display:flax;
        justify-content:space-between;
        margin-bottom:20px;
    }
`

const Total = styled.div`
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
`
const ListLink = styled(Link)`
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    text-decoration-line: underline;
    text-transform: capitalize;
    color:var(--BLACK)
`

const RestaurantItemWrap = styled.div`
    overflow:scroll; 
    height:578px;

    //스크롤 숨기기
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
`
const RestaurantItem = styled.ul`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-bottom:16px;
`

const HashTagWrap = styled.div`
    display:flex
`

const HashTag = styled.div`
  border: 1px solid #7F5FFF;
  border-radius: 100px;
  gap:10px;
  font-weight:700;
  font-size:10px;
  color:#7F5FFF;
  text-align: center;
  padding:4px 8px;
  margin-right:4px;
`

const ImgWrap = styled.li`
    width:104px;
    height:90px;
    margin-right:8px;
`
const RestaurantImg = styled.img`
  width: 104px;
  height: 90px;
  object-fit: cover;
`
const RestaurantName = styled.h3`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-transform: capitalize;
    margin:18px auto 6px auto;
`
const RestaurantContent = styled.p`
    font-weight: 300;
    font-size: 14px;
    line-height: 160%;
    color:#666;
`
const LinkBtn = styled(Link)`
    /* margin-left:10px; */
    /* margin-left: 16.59px; */
    margin-left: 36.59px;
`

const RestaurantAdd = styled.div`
    width: 133px;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 10px 24px;
    gap: 8px;
    background:#7F5FFF;
    border-radius: 50px;

    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color:var(--LIGHTEST);
    position:fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom:31px;
`
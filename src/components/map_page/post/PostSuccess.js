import React from 'react';
import styled from 'styled-components';
import { FooterBtn } from '../../../css/Style';
import { useSelector } from 'react-redux';
import black_x_button from '../../../img/black_x_button.svg'
import { useNavigate } from 'react-router-dom';
import {ReactComponent as Characterface} from '../../../img/characterface.svg';
import { eyeList } from "../../../components/signup/FaceResource";
import {ReactComponent as Flag} from '../../../img/fixed/blackFlag.svg';


const PostSuccess = () => {
    let navigate = useNavigate();
    const postData = useSelector((state)=> state.post.postData.first);
    const user = useSelector(state => state.loggedIn.userInfo);
    console.log(user.nickname)
    console.log(postData.storeName)

    const userEye = () => {
        return eyeList.filter((row) => row.includes(user.eyes) && row);
    };
    return (
        <>
            <Header xBtn={black_x_button}>
                    <button onClick={()=> {navigate('/map')}}>나가기</button>
            </Header>
            <Container>
                <Content>
                    <h3>발견 완료</h3>
                    <NewFlag/>
                    <CharacterWrap eye={userEye()[0]}>
                        <NewCharacterface fill={user.faceColor}/>
                    </CharacterWrap>
                    <p><span>{postData.storeName}</span>의 첫 발견자는 <br/> <b>{user.nickname}</b> 님이에요 :)</p>
                </Content>
                <NewFooterBtn onClick={()=> {navigate('/map')}}>
                    <p>확 인</p>
                </NewFooterBtn>
            </Container>
        </>
    );
};

export default PostSuccess;

const Container = styled.article`
    height:90vh;
    padding-bottom:88px;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Header = styled.article`
    position:fixed;
    height:52px;
    width:100%;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    padding:0 20.83px 0 24px;
    z-index:100;
    button {
        border:none;
        background-color:transparent;
        text-indent:-9999px;
        background-repeat:no-repeat;
        background-position: center;
        width:14.34px;
        height:14.34px;
        background-image:url(${({xBtn})=> xBtn});
    }
`


const NewFooterBtn = styled(FooterBtn)`
    background-color:var(--INFO);
`
const Content = styled.div`
    width:43.888%;
    text-align:center;
    h3 {
        font-family: 'AppleSDGothicNeoT';
        font-style: normal;
        font-size: 32px;
        line-height: 150%;
        color:var(--BLACK);
    }
    p {
        margin-top:20px;
        font-family: 'AppleSDGothicNeoM';
        font-style: normal;
        
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        text-transform: capitalize;
        color:var(--BLACK)
    }
    p > span {
        font-weight:700;
        color: #7F5FFF;
    }
    p > b {
        font-weight:700;
        font-size:19px;
    }
`

const NewFlag = styled(Flag)`
    width:18px;
    height:21px;
    margin-top:48px;
    margin-bottom:12px;
`

const NewCharacterface = styled(Characterface)`
    width:80px;
    height:80px;
`
const CharacterWrap = styled.li`
    position: relative;
    &:after {
        content:"";
        width:80px;
        height:80px;
        display:block;
        background-image:url(${({eye}) => eye});
        background-size:contain;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
`
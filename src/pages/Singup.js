import React,{useEffect} from 'react';
import { Container } from '../css/GlobalStyles';
import { Outlet,useNavigate,useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useBeforeunload } from "react-beforeunload";


const Singup = () => {
    const userSignupData = useSelector(state => state.userSignup)
    const {isLogin} = useSelector(state => state.loggedIn)
    const navigate = useNavigate()
    useBeforeunload((event) => event.preventDefault());    

  useEffect(()=>{    
    pageChange()
  },[isLogin])
  
// 소셜로그인 중이라면 새로고침해도 페이스커스텀 페이지로
// 일반로그인이라면 아이디와 비밀번호가 없다면 해당 페이지로 이동
  const pageChange = () =>{
    if(isLogin){
      return navigate('/signup/faceCustom')
    }
    if(!isLogin){
      if(!userSignupData.id || !userSignupData.password ){
        return navigate('/signup/agreement')
      }
    }    
  } 


    return (
        <Container>
            <Outlet/>
        </Container>
    );
};

export default Singup;
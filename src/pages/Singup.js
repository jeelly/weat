import React,{useEffect} from 'react';
import { Container } from '../css/GlobalStyles';
import { Outlet,useNavigate,useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useBeforeunload } from "react-beforeunload";


const Singup = () => {
    const userSignupData = useSelector(state => state.userSignup)
    const location = useLocation();
    const navigate = useNavigate()
    useBeforeunload((event) => event.preventDefault());    

    
  // useEffect(()=>{    
  //   pageChange()
  // },[])
  
//아이디와 비밀번호가 없다면 해당 페이지로 이동
  // const pageChange = () =>{
  //   if(location.pathname === "/signup/agreement"){
  //       return null
  //   }else if(!userSignupData.id || !userSignupData.password ){
  //     return navigate('/signup/essential')
  //   }else if(!userSignupData.email || !userSignupData.name || !userSignupData.birthDay){
  //       return navigate('/signup/basicInfo')
  //   }else if(!userSignupData.nickname || !userSignupData.eyes || !userSignupData.faceColor){
  //       return navigate('/signup/faceCustom')
  //   }
  // } 


    return (
        <Container>
            <Outlet/>
        </Container>
    );
};

export default Singup;
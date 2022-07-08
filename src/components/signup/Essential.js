import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { BlackButton } from '../../css/Style';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

import {useDispatch} from 'react-redux'
import { addUserEmail } from '../../redux/modules/userSlice'


const Essential = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const userInfo = {email, password, confirmPassword}
 


  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }


  const buttonAction = async ()=>{
    const reg_email =  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const reg_password = /^[ㄱ-ㅎ가-힣0-9a-zA-Z@$!%#?&]{6,10}$/;
    if(!reg_email.test(email)){
      return alert('이메일 형식을 확인해주세요!')
    }
    if(!reg_password.test(password)){
      return alert('비밀번호는 6자이상 한/영, 숫자, 특수문자가 가능')
    }
    if(password !== confirmPassword){
      return alert('비밀번호 불일치')
    }     
    try{
      const respons = await axios.post('http://realprojectapiserver.com/api/users/check',userInfo)
      console.log(respons)
    }catch(e){
      console.log(e)   
    }
    dispatch(addUserEmail(userInfo));
    navigate('/signup/basicInfo')
  }

  return (
    <div>
      <InfoMessage>
        <p className='message'>가입해주셔서 감사합니다</p>
        <p className='subMessage'>
          아이디(이메일)은 변경이 불가합니다:&#40;
          <br />
          정확히 입력해주세요!
        </p>
      </InfoMessage>
      <InputBox>
        <section>
          <label htmlFor=''>Email</label>
          <input type='text' placeholder='정확한 이메일 주소를 써주세요' onChange={onChangeEmail}/>
        </section>
        <section>
          <label htmlFor=''>Password</label>
          <input type='password' placeholder='6글자 이상 적어주셔야 해요' onChange={onChangePassword}/>
          <input type='password' placeholder='다시 한번 입력해주세요' onChange={onChangeConfirmPassword}/>
        </section>
      </InputBox>
      <BlackButton onClick={buttonAction}>다 음</BlackButton>
    </div>
  );
};

const InfoMessage = styled.section`
  height: 178px;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  .message {
    font-family: 'AppleSDGothicNeoL';
    line-height: 150%;
    font-size: 28px;
    padding-bottom: 12px;
  }
  .subMessage {
    font-family: 'AppleSDGothicNeoL';
    font-size: 16px;
    line-height: 150%;
    color: var(--DEFAULT);
  }
`;

const InputBox = styled.div`
  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    label {
      font-family: 'Niramit';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      padding-bottom: 8px;
      padding-left:14px;
    }
    input {
      height:48px;
      font-family: 'AppleSDGothicNeoL';
      font-size: 12px;
      line-height: 22px;
      padding: 13px 20px;
      background: var(--WHITE);
      border: 2px solid #eeeeee;
      border-radius: 50px;
      margin-bottom: 10px;
      outline: none;
      ::placeholder{
        color: var(--DEFAULT);

      }
    }
  }
`;

export default Essential;

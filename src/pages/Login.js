import React from 'react';
import styled from 'styled-components';

const Login = () => {
    return (
        <Test color={'red'}>
            <div>로그인페이지</div>
        </Test>
    );
};


const Test = styled.div`
 div{
    background-color:${(props) => props.color}

 }

`

export default Login;
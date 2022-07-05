import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as Characterface} from '../img/characterface.svg';
import {Container, Btn} from '../css/Style'

const Main = () => {
    return (
        // <div style={{width:"300px", border:"1px solid red", backgroundColor:"blue"}}>
        //     <img src={characterface} alt="smile" style={{position:"relative"}}/>
        // </div>
        <Containers>
         <nav>
            <button>종버튼</button>
         </nav>
         <article>
            <ul>
                <li>
                    <p>아침식사 하셨나요?</p>
                    <p>매콤한 오소리님</p>
                </li>
                <li>
                <Characterface fill="blue"/>
                </li>
            </ul>
         </article>
         <article>
            <p>Total <strong>6</strong></p>
            <p>길게 눌러 위치이동(after로 아이콘)</p>
            <Link to="/post">새로운 맛방을 만들어보세요</Link> 
            
         </article>
         <Aside>
            <Btn>닫기</Btn>
            <div>image</div>
            <Characterface fill="white"/>
         </Aside>
        </Containers>
    );
};

export default Main;

const Containers = styled(Container)`
    width:100%;
    background-color:red;
`
const Aside = styled.aside`
    width:100%;
    height:70vh;
    /* position:absolute; */
    /* top:0; */
    /* right:0; */
    background-color:blue;
`
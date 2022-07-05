import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import characterface from '../img/characterface.svg';
import {ReactComponent as Characterface} from '../img/characterface.svg';
const Main = () => {
    return (
        // <div style={{width:"300px", border:"1px solid red", backgroundColor:"blue"}}>
        //     <img src={characterface} alt="smile" style={{position:"relative"}}/>
        // </div>
        <Container>
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
                <Characterface fill="black"/>
                </li>
            </ul>
         </article>
         <article>
            <p>Total <strong>6</strong></p>
            <p>길게 눌러 위치이동(after로 아이콘)</p>
            <Link to="/post">새로운 맛방을 만들어보세요</Link> 
            
         </article>
         <aside>
            <button>닫기</button>
            <div>image</div>
            <Characterface fill="white"/>
         </aside>
        </Container>
    );
};

export default Main;

const Container = styled.div`
`
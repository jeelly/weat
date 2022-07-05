import React from 'react';
import { Link } from 'react-router-dom';
import characterface from '../img/characterface.svg';
import mouth from '../img/mouth.svg';

const Main = () => {
    return (
        <div style={{width:"300px", border:"1px solid red", backgroundColor:"blue"}}>
            <img src={characterface} alt="smile" style={{position:"relative"}}/>
        </div>
    );
};

export default Main;
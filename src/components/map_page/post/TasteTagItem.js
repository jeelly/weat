import React, { useState } from 'react';
import CodeSearch from '../../roomShare/CodeSearch';
import { TagStyle } from './PostReview';

const TasteTagItem = ({taste, tastesArr, setTastesArr}) => {
    const [toggle, setToggle] = useState(false);

    const selectToggle = (taste) => {
        if(tastesArr.indexOf(taste) === -1) {
            if(tastesArr.length>3) {
                return alert("최대 4개 카테고리 설정가능해요!")
            }
            setToggle(true)
            setTastesArr(atmosArr => [...atmosArr, taste]);
        }else {
            setToggle(false)
            setTastesArr(atmosArr => atmosArr.filter((atmos) => atmos !== taste));
        }
    }
    return (
        <TagStyle toggle={toggle} 
            onClick={()=> {
                selectToggle(taste)
            }}
        >{taste}</TagStyle>    
    );
};

export default TasteTagItem;
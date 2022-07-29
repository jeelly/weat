import React, { useEffect, useState } from 'react';
import { TagStyle } from './PostReview';

const AtmosTagItem = ({arr, atmosArr, setAtomosArr}) => {
    const [toggle, setToggle] = useState(false);

    const selectToggle = (arr) => {
        if(atmosArr.indexOf(arr) === -1) {
            if(atmosArr.length>3) {
                return alert("최대 4개 카테고리 설정가능해요!")
            }
            setToggle(true)
            setAtomosArr(atmosArr => [...atmosArr, arr]);
        }else {
            setToggle(false)
            setAtomosArr(atmosArr => atmosArr.filter((atmos) => atmos !== arr));
        }
    }

    return (
        <TagStyle toggle={toggle}
            onClick={()=> {
                selectToggle(arr)
            }}
        >{arr}</TagStyle>
    );
};

export default AtmosTagItem;
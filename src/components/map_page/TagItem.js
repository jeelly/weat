import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TagItem = ({tag, tagsArr, setTagsArr}) => {
    const [toggle, setToggle] = useState(false);

    const selectToggle = (tag) => {
        if(tagsArr.indexOf(tag) === -1) {
            if(tagsArr.length>3) {
                return alert("최대 4개 카테고리 설정가능해요!")
            }
            setToggle(true)
            setTagsArr(tagsArr => [...tagsArr, tag]);
        }else {
            setToggle(false)
            setTagsArr(tagsArr => tagsArr.filter((atmos) => atmos !== tag));
        }
    }
    return (
        <TagStyle 
            toggle={toggle}
            onClick={()=> {
                selectToggle(tag)
            }}
        >
            {tag}
        </TagStyle>
    );
};

export default TagItem;

const TagStyle = styled.li`
    box-sizing:border-box;
    height: 41px;
    padding: 12px 20px;
    border-radius: 40px;
    font-family:'NeoAppleSDGothicNeoM';
    color: var(--BLACK);
    font-style:normal;
    font-weight:400;
    font-size:14px;
    line-height: 17px;
    text-transform:capitalize;
    margin:0 0 9px 8px;
    background-color:var(--WHITE);
    ${({toggle})=> toggle ? 
    'border: 2px solid var(--INFO);color: var(--INFO);'
    : null}
`
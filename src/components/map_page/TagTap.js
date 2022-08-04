import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { device } from '../../css/GlobalStyles';
import { FilterSearchDB } from '../../redux/modules/mapSlice';
import TagItem from './TagItem';


const TagData = ['양식','한식','일식','중식','비건','배달','건강식','음료','패스트푸드','퓨전','디저트'];

const TagTap = () => {
    const dispatch = useDispatch();
    const [tags, setTags] = useState(TagData);
    const [tagsArr, setTagsArr] = useState([]);

    // X버튼 클릭 시  삭제
    const handleDeleteImage = (idx) => {
        setTagsArr(tagsArr.filter((l, index) => index !== idx));
    };


    const upload = () => {
        dispatch(FilterSearchDB({tag:tagsArr}))
    }
    return (
        <TagTapWrap>
            <FilterWrap>
                <Precautions>*최대 4개 카테고리 설정가능</Precautions>
                <FilterTagWrap>
                    {tagsArr.map((tag, idx)=> (
                        <TagStyle>{tag}
                        {/* <div onClick={() => handleDeleteImage(idx)}>
                                X
                        </div> */}
                        </TagStyle>
                    ))}
                </FilterTagWrap>
                <SearchBtn onClick={upload}>필터 검색</SearchBtn>
            </FilterWrap>
            <TagItemWrap>
                <Title>음식 스타일로 찾기</Title>
                <ItemInner>
                    {tags.map((tag, idx)=> (
                        <TagItem key={idx} tag={tag} tagsArr={tagsArr} setTagsArr={setTagsArr} />
                    ))}
                </ItemInner>
            </TagItemWrap>
        </TagTapWrap>
    );
};

export default TagTap;
const SearchBtn = styled.button`
    cursor:pointer;
    background-color:var(--BLACK);
    border:none;
    padding:13px 24px;
    border-radius:60px;
    position:absolute;
    bottom:-20px;
    left:50%;
    transform:translateX(-50%);

    font-family: 'AppleSDGothicNeoSB';
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
    text-transform: capitalize;
    color:var(--WHITE);
`

const TagTapWrap = styled.li`
    background-color:var(--WHITE);
    width:95.556%;
    height:438px;
    position:fixed;
    bottom:68px;
    left:50%;
    transform:translateX(-50%);
    box-shadow: 0px 6px 10px rgba(153, 153, 153, 0.2), 0px 1px 18px rgba(153, 153, 153, 0.2), 0px 3px 5px rgba(153, 153, 153, 0.2);
    border-radius:20px 20px 0 0;
    @media ${device.pc} {
        width:464px;
        left:50%;
        transform:translateX(-50%);
        /* width:480px; */
        /* right:0; */
        /* left:-22px; */
        /* text-align:right; */
        /* margin:0 auto; */
    }
`

const FilterWrap = styled.div`
    height:126px;
    padding:0 16px;
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
`
const FilterTagWrap = styled.ul`
    display:flex;
`

const TagStyle = styled.li`
    box-sizing:border-box;
    height:32px;
    padding:9px 20px;
    border-radius: 40px;
    font-family:'AppleSDGothicNeoSB';
    color: var(--BLACK);
    font-style:normal;
    font-size:12px;
    text-transform:capitalize;
    margin-right:8px;
    background-color:var(--WHITE);
    border:1px solid var(--INFO);
    color: var(--INFO);
    display:flex;
    &:last-child {
        margin-right:0;
    }
`

const Precautions = styled.strong`
    font-family: 'AppleSDGothicNeoB';
    font-style: normal;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color:var(--ERROR);
    margin:26px 0 9px 0;
`

const TagItemWrap = styled.div`
    background-color:#F5F5F5;
    height:312px;
`
const Title = styled.h3`
    font-family: 'AppleSDGothicNeoB';
    font-style: normal;
    /* font-weight: 700; */
    font-size: 12px;
    line-height: 160%;
    color: var(--DARKEST);
    padding:30px 0 11.5px 12px;
`

const ItemInner = styled.ul`
    display:flex;
    flex-wrap:wrap;
    /* padding:0 12px */
`
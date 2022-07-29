import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FooterBtn } from '../../../css/Style';
import purple_plus from '../../../img/fixed/purple_plus.svg'
import white_Xclose_btn from '../../../img/white_Xclose_btn.svg';
import { useDispatch, useSelector } from 'react-redux';
import AtmosTagItem from './AtmosTagItem';
import TasteTagItem from './TasteTagItem';
import InputModal from './InputModal';
import { postData, tagData } from '../../../redux/modules/postSlice';
const PostReview = () => {
    const { id } = useParams();
    const postData = useSelector((state)=> state.post.postData);
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [inputContent, setInputContent] = useState('');
    const tastesData = ['매콤','달콤','깔끔','느끼','짭짤한','향신료','새콤','건강한'];
    const atmosData = ['데이트코스','뷰맛집','인생샷','노포느낌','아기자기','이국적인','아재스타일','회식장소','고급'];
    const [tastes, setTastes] = useState(tastesData);
    const [atmos, setAtmos] = useState(atmosData);
    const [menuArr, setMenuArr] = useState([]);
    const [tastesArr, setTastesArr] = useState([]);
    const [atmosArr, setAtomosArr] = useState([]);

    useEffect(()=>{
        if(!id && postData.first.length===0) {
            navigate('/map')
        }
    },[])

    const ModalOpen = (content) => {
        setInputContent(content)
        setModal(true)
    }

    const okBtn = (content) => {
        if(content.content === '추천메뉴') {
            setMenuArr(menuArr => [...menuArr, content.value]);
        }else if(content.content === '맛') {
            setTastes(tastes => [...tastes, content.value]);
        }else {
            setAtmos(atmos => [...atmos, content.value]);
        }
    }

    // X버튼 클릭 시  삭제
    const handleDeleteImage = (idx) => {
        setMenuArr(menuArr.filter((l, index) => index !== idx));
    };

    const upload = async () => {
        const tag = {
            tagMenu:menuArr,
            tagTasty:tastesArr,
            tagPoint:atmosArr
        }
        await dispatch(tagData(tag))
        if(!id){
            navigate('/storepost/PostReviewPhoto')
        }else {
            navigate(`/storepost/PostReviewPhoto/${id}`)
        }
    }
    return (
        <Container>
            <InputModal content={inputContent} modal={modal} setModal={setModal} okBtn={okBtn} />
            <TiTle>맛 태그를 추가해주세요</TiTle>
            <SubTitleWrap>
                    <SubTitle>추천메뉴</SubTitle>
            </SubTitleWrap>
            <TagContainer>
                <MenuPlusBtn style={{marginTop:"16px"}} purple_plus={purple_plus}
                    onClick={()=> {
                        ModalOpen('추천메뉴')
                    }}
                >플러스 버튼</MenuPlusBtn>
                <MenuTagWrap>
                    {menuArr.map((arr, idx)=>(
                        <MenuTag key={idx}>{arr}
                        <ImgDelBtn
                            white_Xclose_btn={white_Xclose_btn}
                            onClick={() => handleDeleteImage(idx)}
                        />
                        </MenuTag>
                    ))}
                </MenuTagWrap>
            </TagContainer>

            <SubTitleWrap>
                <SubTitle>맛</SubTitle>
                <Precautions>*최대 4개 카테고리 설정가능</Precautions>
            </SubTitleWrap>
            <NewTagWrap>
                <PlusBtn purple_plus={purple_plus}
                    onClick={()=> {
                        ModalOpen('맛')
                    }}
                >플러스 버튼</PlusBtn>
                {tastes.map((taste, idx)=> (
                    <TasteTagItem key={idx} taste={taste} tastesArr={tastesArr} setTastesArr={setTastesArr} />
                ))}
            </NewTagWrap>

            <SubTitleWrap>
                <SubTitle>분위기</SubTitle>
                <Precautions>*최대 4개 카테고리 설정가능</Precautions>
            </SubTitleWrap>
            <NewTagWrap>
                <PlusBtn purple_plus={purple_plus}
                    onClick={()=> {
                        ModalOpen('분위기')
                    }}
                >플러스버튼</PlusBtn>
                {atmos.map((arr, idx)=> (
                    <AtmosTagItem  key={idx} arr={arr} atmosArr={atmosArr} setAtomosArr={setAtomosArr}/>
                ))}
            </NewTagWrap>
            <FooterBtn onClick={upload}>
                <p>다 음</p>
            </FooterBtn>
        </Container>
    );
};

export default PostReview;

const Container = styled.div`
    padding:0 16px;
    width:100%;
    margin:0 auto;
    padding-bottom:72px;
`
const TagContainer = styled.div`
    display:flex;
    margin-bottom:65.5px;
`
const TiTle = styled.h1`
    text-align:center;
    font-family: 'AppleSDGothicNeoM';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color:var(--BLACK);
    margin:30px 0 42px 0;
`
const SubTitleWrap = styled.div`
    display:flex;
    justify-content:space-between;
`
const SubTitle = styled.h3`
    font-family: 'AppleSDGothicNeoB';
    font-style: normal;
    font-size: 12px;
    line-height: 160%;
    color:var(--BLACK);
    opacity: 0.8;
`

const Precautions = styled.strong`
    font-family: 'AppleSDGothicNeoB';
    font-style: normal;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color:var(--ERROR);
    order: 1;
    flex-grow: 0;
`

const MenuPlusBtn = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 10px;

    background-color:var(--WHITE);
    border: 1px solid #7F5FFF;
    border-radius: 20px;
    min-width:40px;
    width: 40px;
    height: 74px;

    text-indent:-9999px;
    background-image:url(${({purple_plus})=> purple_plus});
    background-repeat:no-repeat;
    background-position:center;
    cursor:pointer;
`

const PlusBtn = styled(MenuPlusBtn)`
    width:40px;
    height:40px;
`
const TagWrap = styled.ul`
    display:flex;
    /* margin-bottom:65.5px; */
    padding:16px 0 61.5px 0
`
const NewTagWrap = styled(TagWrap)`
    flex-wrap: wrap;
`

const MenuTagWrap = styled(TagWrap)`
    padding-right:8px;
    overflow: auto;
    white-space: nowrap;
    &::-webkit-scrollbar {
    height:0px;
    position:absolute;
    top:0;
    left:0;
    }
    &::-webkit-scrollbar-thumb {
        background:transparent;
    }
    &::-webkit-scrollbar-track {
        background:transparent;
    }
`

const MenuTag = styled.li`
    position:relative;
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 12px;
    gap: 10px;
    height: 74px;
    background:var(--WHITE);
    box-shadow:0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;

    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 350;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color:var(--BLACK);
    opacity: 0.8;
    margin-left:12px;
`

export const TagStyle = styled.li`
    box-sizing:border-box;
    height: 41px;
    padding: 12px 20px;
    background: #F5F5F5;
    border-radius: 40px;
    font-family:'NeoAppleSDGothicNeoM';
    color: var(--BLACK);
    font-style:normal;
    font-weight:400;
    font-size:14px;
    line-height: 17px;
    text-transform:capitalize;
    margin:0 0 9px 8px;
    ${({toggle})=> toggle ? 
    'border: 2px solid var(--INFO);background-color:var(--WHITE);color: var(--INFO);'
    : null}
`
//사진삭제버튼
const ImgDelBtn = styled.div`
    position:absolute;
    right:-8px;
    top:-8px;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:var(--BLACK);
    background-image:url(${({white_Xclose_btn})=> white_Xclose_btn});
    background-repeat:no-repeat;
    background-size:12px;
    background-position:center;
`;
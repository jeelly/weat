import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FooterBtn } from '../../../css/Style';
import Modal from './Modal';
import photo from '../../../img/fixed/Photo.svg';
import white_Xclose_btn from '../../../img/white_Xclose_btn.svg';
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import Rating from '../../star_rating/Rating';
import { useSelector } from 'react-redux';
import instance from '../../../shared/axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const CreateRestaurantDB = (data) => {
    return instance.post("/api/store/write", data);
  }
const RestaurantRoomSaveDB = (data) => {
    return instance.post("/api/store/saverooms", data);
  }
const CraeteReviewDB = (data) => {
    return instance.post(`/api/store/matmadi`, data);
  }

const PostReviewPhoto = () => {
    const { id } = useParams();

    let navigate = useNavigate();
    const postData = useSelector((state)=> state.post.postData);
    const [modal, setModal] = useState(false);
    const [image, setImage] = useState([]);
    const [showImages, setShowImages] = useState([]);
    const [comment, setComment] = useState("");
    const [star, setStar] = useState(0);
    const [ratingTasty, setRatingTasty] = useState(0);
    const [ratingPrice, setRatingPrice] = useState(0);
    const [ratingService, setRatingService] = useState(0);

    const QueryClient = useQueryClient();  //캐싱된 데이터 후처리 리듀서 느낌

    useEffect(()=>{
        if(!id && postData.first.length===0) {
            navigate('/map')
        }
    },[])

    const upload_data = {
        ...postData.tag,
        star:parseInt(star),
        ratingTasty:parseInt(ratingTasty),
        ratingPrice:parseInt(ratingPrice),
        ratingService:parseInt(ratingService),
        comment:comment,
    }
    console.log(upload_data)
    const CreateRestaurant = useMutation(CreateRestaurantDB, {
        onSuccess: (response) => {
            upload_data['storeId'] = response.data.storeId
            QueryClient.invalidateQueries("Bubble") //여기 키값 넣어야함
            RestaurantRoomSave.mutate({selectedRooms:postData.registration, storeId:response.data.storeId});
            CraeteReview.mutate(upload_data);
        }
    });
    const RestaurantRoomSave = useMutation(RestaurantRoomSaveDB, {
        onSuccess: () => {
          QueryClient.invalidateQueries("room")
        }
    });
    const CraeteReview = useMutation(CraeteReviewDB, {
        onSuccess: () => {
          QueryClient.invalidateQueries("review") 
        }
    });

    const onChange = (e) => {
        setComment(e.target.value);  
    };  

    //사진 여러장 미리보기
    const handleAddImages = async (e) => {
        await setImage(image => [...image, ...e.target.files]);
        
        let imageLists  = e.target.files
        let imageUrlLists = [...showImages];
        for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
        }
        //5장 제한
        if (imageUrlLists.length > 5) {
        imageUrlLists = imageUrlLists.slice(0, 5);
        }
        setShowImages(imageUrlLists);
        e.target.value = '';
    };

    // X버튼 클릭 시 이미지 삭제
    const handleDeleteImage = (idx) => {
        setShowImages(showImages.filter((l, index) => index !== idx));
        setImage(showImages.filter((l, index) => index !== idx));
        // let del = file_link_ref.current.filter((l, index) => l !== file_link_ref.current[id]);
        // file_link_ref.current = [...del];  
        // let img = [...imageFB]
        // setImageFB(img.filter((l, index) => l !== imageFB[id]));
    };


    const imageUpload = () => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        const formData = new FormData();
        // for(let i=0; i<image.length;i++) {
        //     formData.append('image', image[0]);
        // }
            // console.log(image[0])
            formData.append('image',image[0]);
            // image.forEach((item) => formData.append("image", item));
            instance
            .post("api/upload/image", formData, config)            
            .then((response) => {
                upload_data['imgURL'] = response.data.imgUrl
                console.log(id)
                console.log(!id)
                if(!id){
                    CreateRestaurant.mutate(postData.first);
                }else {
                    upload_data['storeId'] = id
                    CraeteReview.mutate(upload_data);
                }
            })
            .catch(function(error) {
                console.log(error);
                if(!id){
                    CreateRestaurant.mutate(postData.first);
                }else {
                    upload_data['storeId'] = id
                    CraeteReview.mutate(upload_data);
                }
            })
    };
    
    const upload = async () => {
        await imageUpload();
        if(!id){
            await navigate('/storepost/success')
        }else {
            await navigate(`/storepost/success/${id}`)
        }
    }

    const onSortEnd = (oldIndex, newIndex) => {
        setShowImages((array) => arrayMove(array, oldIndex, newIndex));
    };

    return (
        <Container>
        <ContentWrap>
            <TiTle>찍은 사진이 있으신가요?</TiTle>
            <AttachWrap>
            <label htmlFor="file" onChange={handleAddImages}>
                <ImageBtn>
                    <img src={photo} alt="이미지첨부사진"/>
                    <p>{showImages.length}/5</p>
                </ImageBtn>
                <input
                type="file"
                multiple
                id="file"
                accept="image/jpg, image/png, image/jpeg"
                />
            </label>
            <SortableListStyle
                onSortEnd={onSortEnd}
                draggedItemClassName="dragged"
            >
            {showImages.map((image, idx) => (
                <SortableItem key={idx}>
                    <ImgWrap>
                        <div>
                            <img
                            style={{
                                width: "104px",
                                height: "98px",
                                objectFit: "cover",
                            }}
                            src={image}
                            alt="첨부한 사진"
                            />
                            <ImgDelBtn
                            white_Xclose_btn={white_Xclose_btn}
                            onClick={() => handleDeleteImage(idx)}
                            />
                        </div>
                    </ImgWrap>
                </SortableItem>
            ))}
            </SortableListStyle>
            </AttachWrap>

            <TiTle>전체적인 평가를 해주세요</TiTle>
            <StarRating>
                <Rating set={setStar}/>
            </StarRating>
            <GaugeWrap>
                <li>
                    <p>맛</p>
                    <Rating color={'#FF7337'} set={setRatingTasty}/>
                </li>
                <li>
                    <p>가격</p>
                    <Rating color={'#23C7C7'} set={setRatingPrice} />
                </li>
                <li>
                    <p>서비스</p>
                    <Rating color={'#FFBB55'} set={setRatingService} />
                </li>
            </GaugeWrap>
            <CommentInput placeholder='도움이 될만한 짧은 후기를 남겨주세요' onChange={onChange}/>

        </ContentWrap>
        {/* <FooterBtn onClick={upload}> */}
        <FooterBtn onClick={upload}>
                <p>마지막 한 단계!</p>
        </FooterBtn>
        </Container>
    );
};

export default PostReviewPhoto;

const Container = styled.div`
    padding:0 16px;
    padding-bottom:88px;
    display:flex;
    justify-content:center;
    align-items: center;
`
const ContentWrap = styled.article`
    display:flex;
    flex-direction: column;
    align-items: center;
    label {
        display: inline-block;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        cursor: pointer;
    }
    input[type="file"] {
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
`
const AttachWrap = styled.div`
    display:flex;
    justify-content:center;
    label{
        height:98px;
    }
`
const SortableListStyle = styled(SortableList)`
    display:flex;
    flex-wrap: wrap;
`
const ImgWrap = styled.div`
    width: 104px;
    height: 98px;
    margin-left:8px;
    margin-bottom:8px;
    position:relative;
    img {
        border-radius: 20px;
        pointer-events: none;
    }
`
const TiTle = styled.h3`
    text-align:center;
    font-family: 'AppleSDGothicNeoM';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color:var(--BLACK);
    margin:30px 0 34px 0;
`
//사진 첨부 버튼
const ImageBtn = styled.div`
    border: 2px solid var(--LIGHTER);
    width: 104px;
    height: 98px;
    border-radius: 20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    img {
        margin-bottom:10px;
    }
    p {
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        text-transform: capitalize;
        color:var(--BLACK)
    }
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

const StarRating = styled.div`
    margin-bottom:40px;
    width:100%;
    height:24px;
`

const GaugeWrap = styled.ul`
    display:flex;
    width:100%;
    justify-content:center;
    li {
        display: flex;
        flex-direction:column;
        align-items:center;
        margin-right:40px;
    }
    li:last-child {
        margin-right:0;
    }
    li > p {
        font-family:'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-transform: capitalize;
        color: var(--DARKEST);
        margin-bottom:10px;
    }
`
const CommentInput = styled.textarea`
    width:329px;
    height:117px;
    margin-top:30px;
    outline:none;
    border:none;
    resize: none;
    background-color:#F5F5F5;
    padding:16px;
    font-family:'AppleSDGothicNeoM';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color:var(--BLACK);

    &::placeholder {
        font-family:'AppleSDGothicNeoM';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color:var(--DEFAULT);
    }
`
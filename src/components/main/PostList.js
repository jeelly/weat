import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch }from 'react-redux'

import {ReactComponent as Flag} from '../../img/fixed/flag.svg';
import {ReactComponent as Guest} from '../../img/fixed/guest.svg';
import {ReactComponent as Private} from '../../img/fixed/private.svg';

import {ItemRotate} from '../../css/animation/PostItemAnimation'
import {useSelector} from 'react-redux'
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import { Link } from 'react-router-dom';
import { loadRoomDB, mainRoomListPutDB, roomDeleteDB, roomExitDB, itemAnimation } from '../../redux/modules/postSlice';
import del from '../../img/EditDel.svg';
import Modal from '../map_page/post/Modal';
import { useClickOutside } from '../../hook/useClickOutside';
import useLongPress from "../../hook/useLongPress";

const PostList = ({onClose, longPressBackspaceCallback}) => {
    const dragRef = useRef(null);

    useClickOutside(dragRef, () => {
        onClose();
    });

    const dispatch = useDispatch();
    const rooms = useSelector(state => state.post.rooms);
    const itemAnimationRD = useSelector(state => state.post.itemAnimation);
    const [items, setItems] = React.useState(rooms)
    const [arrChange, setArrChange] = useState(false);
    const [privateColor, setPrivateColor] = useState("#FFBB55")
    const [guestColor, setGuestColor] = useState('#FF7337')
    const [ownerColor, setOwnerColor] = useState("#23C7C7")
    const [modal, setModal] = useState(false)
    const [id, setId] = useState()
    const [status, setStatus] = useState()
    const [toggle, setToggle] = useState(itemAnimationRD)

    const onLongPress = async () => {
        await setToggle(true)
        dispatch(itemAnimation(true))
    };

    const backspaceLongPress = useLongPress(onLongPress, longPressBackspaceCallback, 5000);

    // useEffect(()=> {
    //     setToggle(true)
    // },[onLongPress])

    useEffect(()=> {
        setToggle(itemAnimationRD)
    },[itemAnimationRD])

    useEffect(() => {
        setItems(rooms)
    }, [rooms]);

    useEffect(() => {
        if(!toggle) {
            return;
        }
        const roomId = items.map((a)=> (
            a.roomId
        ))
        const contents_obj = {
            'roomSeq' : roomId
        }
        console.log(contents_obj)
            dispatch(mainRoomListPutDB(contents_obj, items))
    }, [arrChange]);

    
    const onSortEnd = (oldIndex, newIndex) => {
        setItems((array) => arrayMove(array, oldIndex, newIndex));
        setArrChange(arrChange?false:true)
      };

    const exitBtn = async (id, status) => {
        if(status === "publicOwner" || status === "private") {
            await dispatch(roomDeleteDB(id))
        } else {
            await dispatch(roomExitDB(id))
        }
    }
    const modalOn = (id, status) => {
        setId(id)
         setStatus(status)
        setModal(true)
    }

    const DragItem = ({item}) => {
        return (
                <SortableItem key={item.roomId} >
                    <Inner>
                        <PostItem itemAnimationRD={toggle}>
                        {/* <Deletebtn onClick={()=> exitBtn(item.roomId, item.status)}>X</Deletebtn> */}
                        <Deletebtn onClick={()=> modalOn(item.roomId, item.status)}>X</Deletebtn>
                        <PostItemInner itemAnimationRD={toggle} color={item.status}>
                                <li>
                                    <IconImg>{item.status === 'private' && <Private fill="#FFBB55"/>}</IconImg>
                                    <IconImg>{item.status === 'publicOwner' && <Flag  fill="#FF7337"/>}</IconImg>
                                    <IconImg>{item.status === 'publicGuest' && <Guest fill="#23C7C7"/>}</IconImg>
                                </li>
                                <li><h3>{item.roomName}</h3></li>
                                <EmojiWrap>{item.emoji}</EmojiWrap>
                                <li><p><span>{item.memberNum}</span>members</p></li>
                            </PostItemInner>
                        </PostItem>
                    </Inner>
                </SortableItem>
        )
      }
    return (
            <div ref={dragRef}>
                <Container
                onSortEnd={onSortEnd}
                className="list"
                draggedItemClassName="dragged"
                >
                <Modal content="정말 맛방을 나가시겠어요? 그동안 모아뒀던 맛집들이 사라져요;(" modal={modal} setModal={setModal} okBtn={()=> exitBtn(id, status)} />
                        {items.map((item, index) => (
                            toggle?
                            (
                                <DragItem 
                                    item={item}
                                />
                            ) 
                            : (
                                    <PostLink to={`/detail/${item.roomId}`} key={item.roomId} {...backspaceLongPress}>
                                            <PostItem>
                                                    <PostItemInner itemAnimationRD={toggle} color={item.status}>       
                                                        <li>
                                                            <IconImg>{item.status === 'private' && <Private fill={privateColor}/>}</IconImg>
                                                            <IconImg>{item.status === 'publicOwner' && <Flag  fill={ownerColor}/>}</IconImg>
                                                            <IconImg>{item.status === 'publicGuest' && <Guest fill={guestColor}/>}</IconImg>
                                                        </li>
                                                        <li><h3>{item.roomName}</h3></li>
                                                        <EmojiWrap>{item.emoji}</EmojiWrap>
                                                        <li><p><span>{item.memberNum}</span>members</p></li>
                                                    </PostItemInner>
                                            </PostItem>
                                    </PostLink>
                            )
                        ))}
                </Container>
            </div>
    );
};

export default PostList;

const SortableItemStyle = styled(SortableItem)`
    z-index:300;
`
const Container = styled(SortableList)`
    width:328px;
    display:grid;
    /* flex-direction:row; */
    grid-template-columns: repeat(2, 1fr);
    grid-template-columns: 160px 160px;
	grid-template-rows: 180px 180px;
    grid-gap:8px;
    margin:19px auto 0 auto;
`
const PostItem = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;

    width:160px;
    height:180px;
    border-radius:20px;
    box-shadow:var(--SHADOW1);
    background-color:var(--WHITE);
    animation:${({itemAnimationRD}) => itemAnimationRD ? ItemRotate : 'normal'} 0.4s 1s infinite linear alternate;
    margin:0;
`
const PostLink = styled(Link)`
    text-decoration:none;
    margin:0
`
const PostItemInner = styled.ul`
    width:152px;
    height:172px;
    border:2px solid ${({color}) => 
            color === 'private' ? 
            '#FFBB55' : color === 'publicOwner' ? 
            '#FF7337' : '#23C7C7'
        };
    border-radius: 16px;
    position:relative;
    transition:0.3s;
    &:hover {
        background-color:${({itemAnimationRD, color}) => 
            itemAnimationRD ? 
            '': color === 'private' ? 
            '#FFBB55' : color === 'publicOwner' ? 
            '#FF7337' : '#23C7C7'
        };
        li > h3{
            /* color:${({itemAnimation}) => itemAnimation ? '': 'var(--WHITE)'} */
        }
    }
    li {
        text-align:center;
    }
    li > h3 {
        font-family: "AppleSDGothicNeoM";
        width: 78px;
        height: 44px;
        font-weight: 400;
        font-size: 18px;
        line-height:22px;
        text-align: center;
        text-transform: capitalize;
        margin:36px auto 16px auto;
        color:var(--BLACK)
    }
    li > p {
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        /* identical to box height */
        text-align: center;
        letter-spacing: -0.02em;
        color:var(--BLACK);
        margin-top:12px;
    }
`

const IconImg = styled.div`
    pointer-events :none;
    width:12px;
    height:16px;
    position:absolute;
    right:14px;
    top:12px;
`

const EmojiImg = styled.img`
    margin:0 auto;
    pointer-events : none;
`

const Inner = styled.div`
    position:relative;
    z-index:11;
`

const Deletebtn = styled.button`
    width:24px;
    height:24px;
    border:none;
    background-color:transparent;
    background-image:url(${del}) ;
    background-repeat:no-repeat;
    background-position:center ;
    background-size:24px;
    position: absolute;
    cursor: pointer;
    top:-8px;
    right:-8px;
    z-index:100;
`
const EmojiWrap = styled.li`
    /* width:36px; */
    height:36px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:36px;
`
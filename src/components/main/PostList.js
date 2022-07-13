import React from 'react';
import styled from 'styled-components';

import donut from '../../img/donut.svg';
import flag from '../../img/fixed/flag.svg';
import {ItemRotate} from '../../css/animation/PostItemAnimation'
import {useSelector} from 'react-redux'
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import { Link } from 'react-router-dom';

const _PostItem = [
    {
        title:"1", 
        image: flag, 
        emojiImg: donut, 
        member:3
    },
    {
        title:"2", 
        image: flag, 
        emojiImg: donut, 
        member:3
    },
    {
        title:"3", 
        image: flag, 
        emojiImg: donut, 
        member:3
    },
    {
        title:"4", 
        image: flag, 
        emojiImg: donut, 
        member:3
    }
]

const PostList = () => {

    const itemAnimation = useSelector(state => state.post.itemAnimation);
    const [items, setItems] = React.useState(_PostItem)

    const onSortEnd = (oldIndex, newIndex) => {
        setItems((array) => arrayMove(array, oldIndex, newIndex));
        console.log(items)
      };


    return (
            <Container
            onSortEnd={onSortEnd}
            className="list"
            draggedItemClassName="dragged"
            >
                    {items.map((item, index) => (
                        itemAnimation?
                        (
                            <SortableItem key={index}>
                                <div>
                                    <PostItem itemAnimation={itemAnimation}>
                                            <PostItemInner itemAnimation={itemAnimation}>
                                                <li><IconImg src={item.image} alt="깃발아이콘"/></li>
                                                <li><h3>{item.title}</h3></li>
                                                <li><EmojiImg src={item.emojiImg} alt="도넛아이콘"/></li>
                                                <li><p><span>{item.member}</span>members</p></li>
                                            </PostItemInner> 
                                    </PostItem>
                                </div>
                            </SortableItem>
                        ) 
                        : (
                            <PostLink to='/detail' key={index}>
                                <PostItem>
                                        <PostItemInner itemAnimation={itemAnimation}>
                                            <li><IconImg src={item.image} alt="깃발아이콘"/></li>
                                            <li><h3>{item.title}</h3></li>
                                            <li><EmojiImg src={item.emojiImg} alt="도넛아이콘"/></li>
                                            <li><p><span>{item.member}</span>members</p></li>
                                        </PostItemInner> 
                                </PostItem>
                            </PostLink>
                        )
                    ))}
            </Container>
    );
};

export default PostList;

const Container = styled(SortableList)`
    display: grid;
    width:328px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin:19px auto 0 auto;
`
const PostItem = styled.div`
    width:160px;
    height:180px;
    border-radius:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    animation:normal;
    box-shadow:var(--SHADOW2);
    background-color:var(--WHITE);
    animation:${({itemAnimation}) => itemAnimation ? ItemRotate : 'normal'} 0.4s 1s infinite linear alternate;
`
const PostLink = styled(Link)`
    text-decoration:none;
`
const PostItemInner = styled.ul`
    width:152px;
    height:172px;
    border:2px solid #FF7337;
    border-radius: 16px;
    position:relative;
    transition:0.3s;
    &:hover {
        background-color:${({itemAnimation}) => itemAnimation ? '': '#FF7337'};
        li > h3{
            color:${({itemAnimation}) => itemAnimation ? '': 'var(--WHITE)'}
        }
    }
    li {
        text-align:center;
    }
    li > h3 {
        width: 78px;
        height: 44px;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        text-transform: capitalize;
        margin:36px auto 16px auto;
        color:var(--BLACK)
    }
    li > p {
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

const IconImg = styled.img`
    pointer-events : none;
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
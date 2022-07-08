import React from 'react';
import styled from 'styled-components';

import donut from '../../img/donut.svg';
import flag from '../../img/fixed/flag.svg';



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
    const [ lists, setLists ] = React.useState(_PostItem);
    const [ grab, setGrab ] = React.useState(null)


    //마우스를 올렸을때
    const _onDragOver = e => {
        e.preventDefault();
    }


    //드래그를 시작할때
    const _onDragStart = e => {
        setGrab(e.target);
        e.target.classList.add("grabbing");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);
    }

    // 드래그가 끝날 경우 발생
    const _onDragEnd = e => {
        e.target.classList.remove("grabbing");

        e.dataTransfer.dropEffect = "move";
    }

    //요소를 드롭할 경우 발생(ondragover에서 preventDefault()가 발생해야 함)
    const _onDrop = e => {
        let grabPosition = Number(grab.dataset.position);
        let targetPosition = Number(e.target.dataset.position);

        let _list = [ ...lists ];
        _list[grabPosition] = _list.splice(targetPosition, 1, _list[grabPosition])[0];

        setLists(_list);
    }

    return (
            <Container>
                    {/* <PostItemInner>
                        <li><IconImg src={flag} alt="깃발아이콘"/></li>
                        <li><h3>나만알거야 디저</h3></li>
                        <li><EmojiImg src={donut} alt="도넛아이콘"/></li>
                        <li><p><span>3</span> members</p></li>
                    </PostItemInner> */}
                    {lists.map((item, index) => (
                        <PostItem
                            key={index}
                            data-position={index}

                            onDragOver={_onDragOver}
                            onDragStart={_onDragStart}
                            onDragEnd={_onDragEnd}
                            onDrop={_onDrop}

                            draggable
                        >
                            <PostItemInner>
                                <li><IconImg src={item.image} alt="깃발아이콘"/></li>
                                <li><h3>{item.title}</h3></li>
                                <li><EmojiImg src={item.emojiImg} alt="도넛아이콘"/></li>
                                <li><p><span>{item.member}</span>members</p></li>
                            </PostItemInner> 
                        </PostItem>
                    ))}
            </Container>
    );
};

export default PostList;

const Container = styled.article`
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
    box-shadow: 0px 6px 10px rgba(153, 153, 153, 0.2), 0px 1px 18px rgba(153, 153, 153, 0.2), 0px 3px 5px rgba(153, 153, 153, 0.2);
    display:flex;
    align-items:center;
    justify-content:center;
`
const PostItemInner = styled.ul`
    width:152px;
    height:172px;
    border:2px solid #FF7337;
    border-radius: 16px;
    position:relative;
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
    width:12px;
    height:16px;
    position:absolute;
    right:14px;
    top:12px;
    
`

const EmojiImg = styled.img`
    margin:0 auto;
`
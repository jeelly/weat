import React from 'react';
import { ReactPortal } from '..';

import {Container} from '../css/Style'

import MainModal from '../components/main/MainModal';
import UserInfo from '../components/main/UserInfo';
import PostList from '../components/main/PostList';


const Main = () => {
    return (
        <Container>
            <UserInfo/>
            <ReactPortal>
                <MainModal/>
            </ReactPortal>
            <PostList/>
        </Container>
    );
};

export default Main;








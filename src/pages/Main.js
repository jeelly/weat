import React from 'react';
import { ReactPortal } from '..';

import {Container} from '../css/Style'

import MainModal from '../components/main/MainModal';
import UserInfo from '../components/main/UserInfo';
import PostList from '../components/main/PostList';
import ModalBtn from '../components/main/ModalBtn';
import MainDefault from '../components/main/MainDefault';
import styled from 'styled-components';
import Convenience from '../components/main/Convenience';

const Main = () => {
    return (
        <NewContainer>
            <UserInfo/>
            <Convenience/>
            <ReactPortal>
                <MainModal/>
            </ReactPortal>
            <PostList/>
            {/* <MainDefault/> */}
            <ModalBtn/>
        </NewContainer>
    );
};

export default Main;

const NewContainer = styled(Container)`
    overflow:hidden;
`







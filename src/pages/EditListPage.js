import React from 'react';
import styled from 'styled-components';
import RestaurantList from '../components/edit/RestaurantList';
import { Container } from '../css/Style';

const EditListPage = () => {
    return (
        <NewContainer>
            <RestaurantList listPage={true}/>
        </NewContainer>
    );
};

export default EditListPage;

const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    overflow: hidden;
    padding:0;
`
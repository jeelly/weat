import React from 'react';
import styled from 'styled-components';
import RestaurantList from '../components/detail/RestaurantList';
import { Container } from '../css/Style';

const ListPage = () => {
    return (
        <NewContainer>
            <RestaurantList listPage={true}/>
        </NewContainer>
    );
};

export default ListPage;

const NewContainer = styled(Container)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    background-color:#FF7337 ;
    overflow: hidden;
    padding:0;
`
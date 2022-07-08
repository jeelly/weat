import React, { useCallback, useState } from 'react';

import { Container } from '../css/GlobalStyles';
import { Outlet } from 'react-router-dom'


const Singup = () => {

    return (
        <Container>
            <Outlet/>
        </Container>
    );
};

export default Singup;
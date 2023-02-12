import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header: React.FC = () => {
    return (
        <Navbar bg='primary' variant='dark'>
            <Container>
                <Navbar.Brand>
                    <h1>SLING-EXPLORER</h1>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;
import React from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AppNavBar = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/movies?query=${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <Navbar bg="white" expand="lg" className="mb-4 shadow-sm py-3 border-bottom">
            <Container>
                <Navbar.Brand as={Link} to="/">MovieApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/movies">Movies</Nav.Link>
                        <Nav.Link as={NavLink} to="/people">People</Nav.Link>
                        <Nav.Link as={NavLink} to="/bookmarks">Bookmark List</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/login">Signin</Nav.Link>
                        {/* <Nav.Link as={NavLink} to="/register">Register</Nav.Link> */}
                    </Nav>
                    <Form className="d-flex ms-2" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavBar;

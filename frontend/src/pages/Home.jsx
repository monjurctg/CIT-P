import React from 'react';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/movies?query=${searchTerm}`);
        }
    };

    return (
        <Container className="py-5">
            <div className="p-5 mb-5 bg-white text-dark rounded-4 text-center shadow-lg border" style={{ minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 className="display-4 fw-bold mb-4">Welcome to MovieApp</h1>
                <div className="d-flex justify-content-center">
                    <div style={{ maxWidth: '600px', width: '100%' }}>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                size="lg"
                                type="search"
                                placeholder="Search for movies or people..."
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="primary" size="lg" type="submit">Search</Button>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <p className="lead">Or browse our collections</p>
                <div className="d-flex gap-3 justify-content-center">
                    <Button as={Link} to="/movies" variant="primary" size="lg" className="px-5 fw-semibold shadow-sm">Browse Movies</Button>
                    <Button as={Link} to="/people" variant="outline-dark" size="lg" className="px-5 fw-semibold">Find People</Button>
                </div>
            </div>
        </Container>
    );
};

export default Home;

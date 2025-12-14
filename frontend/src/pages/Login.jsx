import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backendApi from '../api/backendApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await backendApi.login(email, password);
            console.log('Logged in:', result);
            // Ideally store token in Context or localStorage
            localStorage.setItem('userToken', result.token);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center py-5">
            <Card style={{ width: '400px', backgroundColor: '#e9ecef', border: 'none' }} className="p-4">
                <Card.Body>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-uppercase text-primary" style={{ letterSpacing: '1px' }}>Sign In</h2>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control
                                size="lg"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-0"
                            />
                        </Form.Group>
                        <div className="d-grid mb-3">
                            <Button variant="primary" type="submit" size="lg" className="rounded-0">
                                Login
                            </Button>
                        </div>
                        <div className="text-center">
                            <span className="text-muted small">New here? </span>
                            <a href="/register" className="text-dark fw-bold small" style={{ textDecoration: 'none' }}>Sign up here</a>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;

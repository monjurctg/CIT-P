import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backendApi from '../api/backendApi';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await backendApi.register(formData);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center py-5">
            <Card style={{ width: '500px', backgroundColor: '#e9ecef', border: 'none' }} className="p-4">
                <Card.Body>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-uppercase text-success" style={{ letterSpacing: '1px' }}>Sign Up</h2>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex gap-2">
                            <Form.Group className="mb-3 w-50" controlId="formFirstName">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="rounded-0"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 w-50" controlId="formLastName">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="rounded-0"
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control
                                size="lg"
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="rounded-0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Control
                                size="lg"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="rounded-0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control
                                size="lg"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="rounded-0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formConfirmPassword">
                            <Form.Control
                                size="lg"
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="rounded-0"
                            />
                        </Form.Group>

                        <div className="d-grid mb-3">
                            <Button variant="success" type="submit" size="lg" className="rounded-0">
                                Register
                            </Button>
                        </div>
                        <div className="text-center">
                            <span className="text-muted small">Already have an account? </span>
                            <a href="/login" className="text-dark fw-bold small" style={{ textDecoration: 'none' }}>Sign in here</a>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;

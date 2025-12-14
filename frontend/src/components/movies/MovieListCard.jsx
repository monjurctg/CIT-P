import React from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Helper to ensure genres is array
const getGenres = (g) => Array.isArray(g) ? g : (g || '').split(',').map(s => s.trim());

const MovieListCard = ({ movie }) => {
    return (
        <Card className="mb-3 border-0 shadow-sm rounded-4 overflow-hidden" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Row className="g-0 h-100">
                <Col xs={12} md={3} lg={3} className="bg-dark d-flex align-items-center justify-content-center text-white p-0" style={{ minHeight: '180px' }}>
                    <div style={{ width: '100%', height: '100%', minHeight: '180px', backgroundColor: '#dfe6ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8898aa' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>NO POSTER</span>
                    </div>
                </Col>
                <Col xs={12} md={9} lg={9}>
                    <Card.Body className="d-flex flex-column h-100 py-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <Card.Title className="fw-bold mb-1 fs-5 text-dark">{movie.primaryTitle}</Card.Title>
                                <div className="text-muted small">
                                    <span className="me-2">{movie.startYear}</span>
                                    <span className="text-secondary">•</span>
                                    <span className="ms-2 text-capitalize">{movie.titleType}</span>
                                </div>
                            </div>
                            <Badge bg="warning" text="dark" className="px-2 py-1 rounded-pill">
                                ★ {movie.rating}
                            </Badge>
                        </div>

                        <div className="mb-3">
                            {getGenres(movie.genres).map((genre, idx) => (
                                <Badge key={idx} bg="light" text="dark" className="me-1 border fw-normal">
                                    {genre}
                                </Badge>
                            ))}
                        </div>

                        <Card.Text className="text-muted small flex-grow-1" style={{ lineHeight: '1.5' }}>
                            A captivating story that takes you on a journey through emotions and suspense.
                            Discover the details behind this masterpiece.
                        </Card.Text>

                        <div className="d-flex justify-content-end mt-2">
                            <Button as={Link} to={`/movies/${movie.tconst}`} variant="dark" size="sm" className="px-4 rounded-pill">
                                View Details
                            </Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default MovieListCard;

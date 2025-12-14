import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';

const PersonListCard = ({ person }) => {
    const [imageUrl, setImageUrl] = useState(person.imageUrl || null);

    useEffect(() => {
        if (!imageUrl && person.nconst) {
            tmdbApi.getPersonImageByImdbId(person.nconst)
                .then(url => {
                    if (url) setImageUrl(url);
                });
        }
    }, [person.nconst, imageUrl]);

    const displayImage = imageUrl || 'https://via.placeholder.com/150x150?text=No+Image';

    return (
        <Card className="mb-3 border-0 shadow-sm rounded-4 overflow-hidden" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Row className="g-0 h-100">
                <Col xs={12} md={3} lg={3} className="bg-light d-flex align-items-center justify-content-center p-0" style={{ minHeight: '180px', backgroundColor: '#dfe6ed' }}>
                    <div style={{ width: '100%', height: '100%', minHeight: '180px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#dfe6ed' }}>
                        {imageUrl ? (
                            <img src={imageUrl} alt={person.primaryName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div className="text-secondary fw-bold" style={{ fontSize: '1.2rem', color: '#8898aa' }}>NO IMAGE</div>
                        )}
                    </div>
                </Col>
                <Col xs={12} md={9} lg={9}>
                    <Card.Body className="d-flex flex-column h-100 py-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <Card.Title className="fw-bold mb-1 fs-5 text-dark">{person.primaryName}</Card.Title>
                                <div className="text-muted small">
                                    {person.birthYear} {person.deathYear ? `- ${person.deathYear}` : ''}
                                </div>
                            </div>
                        </div>

                        <Card.Text className="flex-grow-1">
                            <strong>Known For:</strong> <span className="text-muted">{person.primaryProfession.join(', ')}</span>
                        </Card.Text>

                        <div className="d-flex justify-content-end mt-2">
                            <Button as={Link} to={`/people/${person.nconst}`} variant="dark" size="sm" className="px-4 rounded-pill">
                                View Profile
                            </Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default PersonListCard;

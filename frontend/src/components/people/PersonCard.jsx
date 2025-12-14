import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';

const PersonCard = ({ person }) => {
    const [imageUrl, setImageUrl] = useState(person.imageUrl || null);

    useEffect(() => {
        if (!imageUrl && person.nconst) {
            tmdbApi.getPersonImageByImdbId(person.nconst)
                .then(url => {
                    if (url) setImageUrl(url);
                });
        }
    }, [person.nconst, imageUrl]);

    // Placeholder image
    const displayImage = imageUrl || 'https://via.placeholder.com/200x300?text=No+Image';

    return (
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={displayImage} style={{ height: '250px', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{person.primaryName}</Card.Title>
                <Card.Text className="small text-muted">
                    {person.birthYear} - {person.deathYear || ''}
                </Card.Text>

                <div className="mt-auto d-grid">
                    <Button as={Link} to={`/people/${person.nconst}`} variant="outline-primary" size="sm">
                        View Profile
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PersonCard;

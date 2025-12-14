import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Image } from 'react-bootstrap';
import backendApi from '../api/backendApi';
import tmdbApi from '../api/tmdbApi';
import { Person } from '../domain/Person';

const PersonDetails = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerson = async () => {
            setLoading(true);
            try {
                const data = await backendApi.getPersonById(id);
                // Mock fallback
                let personData = data;
                if (!personData) {
                    personData = {
                        nconst: id,
                        primaryName: `Person Name for ${id}`,
                        birthYear: 1980,
                        primaryProfession: 'Actor',
                        knownForTitles: 'tt01,tt02'
                    };
                }
                const p = new Person(personData);
                setPerson(p);

                // Fetch image
                const img = await tmdbApi.getPersonImageByImdbId(p.nconst);
                if (img) setImageUrl(img);

            } catch (err) {
                setError('Failed to load person details.');
            } finally {
                setLoading(false);
            }
        };
        fetchPerson();
    }, [id]);

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Container className="py-4"><Alert variant="danger">{error}</Alert></Container>;
    if (!person) return <Container className="py-4"><p>Person not found.</p></Container>;

    return (
        <Container className="py-5">
            <div className="mb-4">
                <Link to="/people" className="text-decoration-none text-secondary fw-semibold">
                    &larr; Back to People Directory
                </Link>
            </div>
            <div className="bg-white rounded-4 shadow-sm overflow-hidden border">
                <Row className="g-0">
                    <Col md={4} lg={3} className="bg-light d-flex align-items-center justify-content-center p-0" style={{ minHeight: '400px', backgroundColor: '#dfe6ed' }}>
                        <div style={{ width: '100%', height: '100%', minHeight: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#dfe6ed' }}>
                            {imageUrl ? (
                                <img src={imageUrl} alt={person.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div className="text-secondary fw-bold" style={{ fontSize: '1.2rem', color: '#8898aa' }}>NO IMAGE</div>
                            )}
                        </div>
                    </Col>
                    <Col md={8} lg={9} className="p-4 p-lg-5 d-flex flex-column">
                        <div className="mb-4">
                            <h1 className="fw-bold text-dark mb-1">{person.displayName}</h1>
                            <div className="text-primary fw-semibold fs-5">
                                {person.primaryProfession.join(' • ')}
                            </div>
                        </div>

                        <div className="row mb-4 text-muted">
                            <div className="col-auto">
                                <span className="fw-bold text-dark d-block">Born</span>
                                {person.birthYear}
                            </div>
                            {person.deathYear && (
                                <div className="col-auto">
                                    <span className="fw-bold text-dark d-block">Died</span>
                                    {person.deathYear}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <h5 className="fw-bold mb-3">Biography</h5>
                            <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                                {person.displayName} is a celebrated figure in the film industry, known for their work as a {person.primaryProfession[0]}.
                                Note: This is a placeholder biography. Real data would be fetched from an external API.
                            </p>
                        </div>

                        <div className="mt-auto">
                            <h5 className="fw-bold mb-3">Known For</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {person.knownForTitles.map(t => (
                                    <Button key={t} as={Link} to={`/movies/${t}`} variant="outline-secondary" size="sm" className="rounded-pill px-3">
                                        Movie Title {t}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default PersonDetails;

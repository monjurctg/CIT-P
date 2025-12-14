import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import backendApi from '../api/backendApi';
import { Movie } from '../domain/Movie';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const data = await backendApi.getMovieById(id);
                // Mock data fallback
                let movieData = data;
                if (!movieData) {
                    movieData = {
                        tconst: id,
                        primaryTitle: `Movie Details Title for ${id}`,
                        originalTitle: 'Original Title',
                        isAdult: false,
                        startYear: 2022,
                        runtimeMinutes: 120,
                        genres: 'Action,Adventure,Sci-Fi',
                        averageRating: 8.5,
                        numVotes: 1500
                    };
                }
                setMovie(new Movie(movieData));
            } catch (err) {
                setError('Failed to load movie details.');
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Container className="py-4"><Alert variant="danger">{error}</Alert></Container>;
    if (!movie) return <Container className="py-4"><p>Movie not found.</p></Container>;

    return (
        <Container className="py-5">
            <div className="mb-4">
                <Link to="/movies" className="text-decoration-none text-secondary fw-semibold">
                    &larr; Back to Movies
                </Link>
            </div>
            <div className="bg-white rounded-4 shadow-sm overflow-hidden border">
                <Row className="g-0">
                    <Col md={4} lg={3} className="bg-light d-flex align-items-center justify-content-center p-0" style={{ minHeight: '400px', backgroundColor: '#dfe6ed' }}>
                        <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#dfe6ed', color: '#8898aa' }}>
                            <div className="text-center">
                                <span className="d-block mb-2" style={{ fontSize: '3rem' }}>🎬</span>
                                <span className="fw-bold">NO POSTER</span>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} lg={9} className="p-4 p-lg-5 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h1 className="fw-bold text-dark mb-2">{movie.displayTitle}</h1>
                                <div className="text-muted d-flex align-items-center gap-3">
                                    <span>{movie.startYear}</span>
                                    <span>•</span>
                                    <span>{movie.runtimeMinutes} min</span>
                                    <span>•</span>
                                    <span className="text-uppercase">{movie.titleType}</span>
                                </div>
                            </div>
                            <div className="text-center bg-light p-2 rounded-3 border">
                                <div className="h4 fw-bold mb-0 text-warning">★ {movie.rating}</div>
                                <div className="small text-muted">{movie.numVotes} votes</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            {Array.isArray(movie.genres) && movie.genres.map(g => (
                                <Badge bg="white" text="dark" className="me-2 border py-2 px-3 fw-normal" key={g}>
                                    {g}
                                </Badge>
                            ))}
                        </div>

                        <div className="mb-4">
                            <h5 className="fw-bold mb-2">Synopsis</h5>
                            <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                                This is a placeholder for the plot summary. In a real application, this would contain a detailed description of the movie's storyline, characters, and themes.
                            </p>
                        </div>

                        <div className="mt-auto pt-4 border-top">
                            <div className="d-flex gap-3">
                                <Button variant="primary" size="lg" className="px-5 rounded-pill shadow-sm">
                                    <span className="me-2">★</span> Rate Movie
                                </Button>
                                <Button
                                    variant={JSON.parse(localStorage.getItem('watchlist') || '[]').includes(movie.tconst) ? "dark" : "outline-dark"}
                                    size="lg"
                                    className="px-4 rounded-pill"
                                    onClick={() => {
                                        const current = JSON.parse(localStorage.getItem('watchlist') || '[]');
                                        let updated;
                                        if (current.includes(movie.tconst)) {
                                            updated = current.filter(id => id !== movie.tconst);
                                        } else {
                                            updated = [...current, movie.tconst];
                                        }
                                        localStorage.setItem('watchlist', JSON.stringify(updated));
                                        // Force re-render (quick and dirty for MVP without context)
                                        setMovie(new Movie({ ...movie }));
                                    }}
                                >
                                    {JSON.parse(localStorage.getItem('watchlist') || '[]').includes(movie.tconst) ? "✓ In Watchlist" : "+ Add to Watchlist"}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default MovieDetails;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import backendApi from '../api/backendApi';
import { Movie } from '../domain/Movie';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const data = await backendApi.getMovieById(id);
                // Mock data fallback
                let movieData = data;
                if (!movieData) {
                    // Generate deterministic mock stats based on ID
                    const idNum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

                    movieData = {
                        tconst: id,
                        primaryTitle: `Movie Details Title for ${id}`,
                        originalTitle: 'Original Title',
                        isAdult: false,
                        startYear: 2022,
                        runtimeMinutes: 120,
                        genres: 'Action,Adventure,Sci-Fi',
                        averageRating: (idNum % 5) + 5.0 + (idNum % 10) / 10, // 5.0 - 9.9
                        numVotes: 1000 + (idNum % 2000)
                    };
                }
                setMovie(new Movie(movieData));

                const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
                if (ratings[movieData.tconst]) {
                    setUserRating(ratings[movieData.tconst]);
                }
            } catch (err) {
                setError('Failed to load movie details.');
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    const handleBookmark = () => {
        const current = JSON.parse(localStorage.getItem('watchlist') || '[]');
        let updated;
        if (isBookmarked) {
            updated = current.filter(mid => mid !== movie.tconst);
        } else {
            updated = [...current, movie.tconst];
        }
        localStorage.setItem('watchlist', JSON.stringify(updated));
        setIsBookmarked(!isBookmarked);
    };

    const handleRate = (rating) => {
        const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
        ratings[movie.tconst] = rating;
        localStorage.setItem('movieRatings', JSON.stringify(ratings));
        setUserRating(rating);
        setShowRatingModal(false);
    };

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
                                <div className="h4 fw-bold mb-0 text-warning">
                                    ★ {(() => {
                                        // Dynamic rating calculation
                                        let displayRating = movie.rating;
                                        if (userRating > 0) {
                                            const votes = movie.numVotes || 0;
                                            const totalScore = (movie.rating * votes) + userRating;
                                            displayRating = (totalScore / (votes + 1)).toFixed(1);
                                        }
                                        return displayRating;
                                    })()}
                                </div>
                                <div className="small text-muted">{movie.numVotes + (userRating > 0 ? 1 : 0)} votes</div>
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
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="px-5 rounded-pill shadow-sm"
                                    onClick={() => setShowRatingModal(true)}
                                >
                                    <span className="me-2">★</span> {userRating > 0 ? `Rated ${userRating}/10` : 'Rate Movie'}
                                </Button>
                                <Button
                                    variant={isBookmarked ? "dark" : "outline-dark"}
                                    size="lg"
                                    className="px-4 rounded-pill"
                                    onClick={handleBookmark}
                                >
                                    {isBookmarked ? "✓ Bookmarked" : "+ Add to Bookmark"}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* Rating Modal */}
            <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Rate this Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <div className="mb-2 text-muted small text-uppercase">What did you think of</div>
                    <h5 className="mb-4 fw-bold">{movie.displayTitle}</h5>

                    <div className="d-flex justify-content-center mb-3">
                        {[...Array(10)].map((_, i) => {
                            const ratingValue = i + 1;
                            const isSelected = ratingValue <= (hoverRating || userRating);

                            return (
                                <span
                                    key={i}
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '2rem',
                                        color: isSelected ? '#ffc107' : '#e4e5e9',
                                        transition: 'color 0.2s'
                                    }}
                                    className="mx-1"
                                    onMouseEnter={() => setHoverRating(ratingValue)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => handleRate(ratingValue)}
                                >
                                    ★
                                </span>
                            );
                        })}
                    </div>

                    <div className="fw-bold text-warning" style={{ fontSize: '1.2rem', minHeight: '1.8rem' }}>
                        {(hoverRating || userRating) > 0 ? `${hoverRating || userRating}/10` : ''}
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default MovieDetails;

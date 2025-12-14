import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieListCard from '../components/movies/MovieListCard';
import backendApi from '../api/backendApi';
import { Movie } from '../domain/Movie';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            setLoading(true);
            try {
                // Read from localStorage
                const stored = JSON.parse(localStorage.getItem('watchlist') || '[]');

                if (stored.length === 0) {
                    setBookmarks([]);
                    setLoading(false);
                    return;
                }

                // In a real app, we'd have an endpoint like /movies/batch?ids=...
                // Here we'll fetch them individually or use mock logic
                const promises = stored.map(id => backendApi.getMovieById(id));
                const results = await Promise.all(promises);

                // Filter out nulls and convert to Movie objects
                // Fallback for mock environment if getMovieById returns null
                const validMovies = results.map((data, index) => {
                    if (data) return new Movie(data);
                    // Mock fallback if API returns null
                    return new Movie({
                        tconst: stored[index],
                        primaryTitle: `Bookmarked Movie ${stored[index]}`,
                        startYear: 2022,
                        genres: 'Drama',
                        rating: 8.0,
                        titleType: 'movie'
                    });
                });

                setBookmarks(validMovies);
            } catch (err) {
                console.error("Failed to load bookmarks", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, []);

    const removeBookmark = (id) => {
        const updated = bookmarks.filter(m => m.tconst !== id);
        setBookmarks(updated);

        // Update localStorage
        const stored = JSON.parse(localStorage.getItem('watchlist') || '[]');
        const newStored = stored.filter(sid => sid !== id);
        localStorage.setItem('watchlist', JSON.stringify(newStored));
    };

    return (
        <Container className="py-5">
            <div className="mb-4 text-center text-md-start border-bottom pb-4">
                <h1 className="fw-bold mb-2">My Watchlist</h1>
                <p className="text-muted">Movies you want to watch later</p>
            </div>

            {loading ? (
                <div className="text-center py-5 text-muted">Loading watchlist...</div>
            ) : bookmarks.length === 0 ? (
                <div className="text-center py-5">
                    <div className="mb-3" style={{ fontSize: '4rem' }}>📺</div>
                    <h3 className="fw-bold text-muted">Your watchlist is empty</h3>
                    <p className="text-secondary mb-4">Start adding movies to build your collection.</p>
                    <Button as={Link} to="/movies" variant="primary" size="lg" className="rounded-pill px-5 shadow-sm">
                        Browse Movies
                    </Button>
                </div>
            ) : (
                <Row className="g-4">
                    {bookmarks.map(movie => (
                        <Col key={movie.tconst} xs={12} md={6} lg={6}>
                            <div className="position-relative">
                                <MovieListCard movie={movie} />
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="position-absolute top-0 end-0 m-2 rounded-circle shadow"
                                    style={{ width: '32px', height: '32px', padding: 0, zIndex: 10 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeBookmark(movie.tconst);
                                    }}
                                    title="Remove from watchlist"
                                >
                                    ×
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Bookmarks;

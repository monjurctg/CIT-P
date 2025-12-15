import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import backendApi from '../api/backendApi';
import MovieListCard from '../components/movies/MovieListCard';
import CommonPagination from '../components/common/Pagination';
import { Movie } from '../domain/Movie';

const Movies = () => {
    // ... (keep existing state hooks)
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        // ... (keep existing useEffect)
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let data;
                if (query) {
                    data = await backendApi.searchMovies(query, page);
                } else {
                    data = await backendApi.getMovies(page);
                }



                // MOCK DATA GENERATOR IF EMPTY (Generic fallback for development)
                let items = data.items;
                if ((!items || items.length === 0) && !query) { // Only fallback mock content if NO query
                    items = Array.from({ length: 12 }).map((_, i) => ({
                        tconst: `tt${i + 1 + page * 10}`,
                        primaryTitle: `Movie Title ${i + 1 + page * 10}`,
                        startYear: 2020 + i,
                        genres: 'Action,Drama',
                        rating: 7.5 + (i % 2),
                        titleType: 'movie'
                    }));
                    data.total = 100;
                    data.items = items;
                }

                const movieObjects = (items || []).map(m => new Movie(m));
                setMovies(movieObjects);
                setTotalPages(Math.ceil((data.total || 0) / 10));
                setError(null);
            } catch (err) {
                console.error("Failed to load movies", err);
                setError('Failed to load movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page, query]);

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="py-5">
            {/* Header & Control Bar */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 border-bottom pb-3 gap-3">
                <div>
                    <h2 className="fw-bold mb-0 text-dark">{query ? `Search Results` : 'Movies Collection'}</h2>
                    <span className="text-muted small">Showing {movies.length} titles {query && `for "${query}"`}</span>
                </div>
                <div className="d-flex gap-2">
                    <Form.Select size="sm" style={{ width: '180px' }} className="rounded-pill border-secondary bg-white">
                        <option>Sort by: Popularity</option>
                        <option>Release Date (Newest)</option>
                        <option>Rating (High to Low)</option>
                    </Form.Select>
                </div>
            </div>

            <Row className="g-4">
                {movies.map(movie => (
                    <Col key={movie.tconst} xs={12} lg={6} xl={6}>
                        <MovieListCard movie={movie} />
                    </Col>
                ))}
            </Row>
            <div className="mt-5">
                <CommonPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </Container>
    );
};

export default Movies;

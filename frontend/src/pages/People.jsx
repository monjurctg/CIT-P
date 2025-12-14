import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import backendApi from '../api/backendApi';
import PersonListCard from '../components/people/PersonListCard';
import CommonPagination from '../components/common/Pagination';
import { Person } from '../domain/Person';

const People = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPeople = async () => {
            setLoading(true);
            try {
                // Determine if search or list
                // For now, assuming generic list if empty query, but typically people endpoint might be search-heavy.
                // We'll use mock data if backendApi returns empty.

                const data = await backendApi.searchPeople(searchQuery, page);

                let items = data.items;
                if (!items || items.length === 0) {
                    items = Array.from({ length: 12 }).map((_, i) => ({
                        nconst: `nm${i + page * 10}000`, // random ID
                        primaryName: `Person Name ${i + 1 + page * 10}`,
                        birthYear: 1970 + i,
                        primaryProfession: 'Actor,Director'
                    }));
                }

                const personObjects = items.map(p => new Person(p));
                setPeople(personObjects);
                setTotalPages(Math.ceil((data.total || 100) / 10));
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to load people.');
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchPeople();
        }, 500); // Debounce search if we wire it up to typing

        return () => clearTimeout(timeoutId);
    }, [page, searchQuery]);

    return (
        <Container className="py-4">
            {/* Header & Control Bar */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 border-bottom pb-3 gap-3">
                <div>
                    <h2 className="fw-bold mb-0 text-dark">{searchQuery ? 'Search Results' : 'People Directory'}</h2>
                    <span className="text-muted small">Found {people.length} profiles {searchQuery && `for "${searchQuery}"`}</span>
                </div>
                <div className="d-flex gap-2">
                    <Form.Control
                        type="search"
                        placeholder="Search people..."
                        style={{ maxWidth: '250px' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-pill border-secondary"
                    />
                    <Form.Select size="sm" style={{ width: '150px' }} className="rounded-pill border-secondary bg-white">
                        <option>Sort by: Popularity</option>
                        <option>Name (A-Z)</option>
                    </Form.Select>
                </div>
            </div>

            {loading ? (
                <div className="text-center mt-5"><Spinner animation="border" /></div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Row className="g-4">
                        {people.map(person => (
                            <Col key={person.nconst} xs={12} lg={6} xl={6}>
                                <PersonListCard person={person} />
                            </Col>
                        ))}
                    </Row>
                    <div className="mt-5">
                        <CommonPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    </div>
                </>
            )}
        </Container>
    );
};

export default People;

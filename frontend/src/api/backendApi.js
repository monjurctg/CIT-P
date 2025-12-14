import apiClient from './apiClient';

const backendApi = {
    // Auth
    login: async (username, password) => {
        // Placeholder implementation
        // const response = await apiClient.post('/auth/login', { username, password });
        // return response.data;
        console.log('Login called', { username, password });
        return { token: 'fake-jwt-token', username };
    },

    register: async (userData) => {
        // const response = await apiClient.post('/auth/register', userData);
        // return response.data;
        console.log('Register called', userData);
        return { success: true };
    },

    // Movies
    getMovies: async (page = 0, limit = 10) => {
        // const response = await apiClient.get('/movies', { params: { page, limit } });
        // return response.data;
        return {
            items: [],
            total: 0,
            page
        };
    },

    getMovieById: async (id) => {
        // const response = await apiClient.get(`/movies/${id}`);
        // return response.data;
        return null;
    },

    searchMovies: async (query, page = 0) => {
        // Mock search implementation
        console.log('Searching movies for:', query);
        // Generate a larger pool of mock data to filter from
        const allMockMovies = Array.from({ length: 50 }).map((_, i) => ({
            tconst: `tt${i}`,
            primaryTitle: i % 2 === 0 ? `The ${query} Movie ${i}` : `Movie ${i} with ${query}`,
            startYear: 2020 + (i % 5),
            genres: 'Action,Drama',
            rating: 7.0 + (i % 3),
            titleType: 'movie'
        }));

        // Filter (trivial since we generated titles with query, but good for structure)
        const filtered = allMockMovies.filter(m =>
            m.primaryTitle.toLowerCase().includes(query.toLowerCase())
        );

        const limit = 10;
        const start = page * limit;
        const pagedItems = filtered.slice(start, start + limit);

        return {
            items: pagedItems,
            total: filtered.length,
            page
        };
    },

    // People
    getPersonById: async (id) => {
        return null;
    },

    searchPeople: async (query, page = 0) => {
        return { items: [] };
    }
};

export default backendApi;

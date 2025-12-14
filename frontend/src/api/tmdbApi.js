import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
// To be provided by user or environment variable
const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';

const tmdbClient = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    }
});

// Cache for person images to avoid redundant calls
const personImageCache = new Map();

export default {
    /**
     * Get person details (image) by IMDB ID
     * @param {string} imdbId - e.g., 'nm0000229'
     */
    getPersonImageByImdbId: async (imdbId) => {
        if (personImageCache.has(imdbId)) {
            return personImageCache.get(imdbId);
        }

        try {
            // 1. Find TMDB ID from IMDB ID
            const findResponse = await tmdbClient.get(`/find/${imdbId}`, {
                params: { external_source: 'imdb_id' }
            });

            const personResults = findResponse.data.person_results;
            if (!personResults || personResults.length === 0) {
                return null;
            }

            const tmdbId = personResults[0].id;

            // 2. Get Person Details (Images)
            // Note: person_results already includes 'profile_path', so strictly we might not need a second call
            // if we trust the search result profile.
            // But instruction says "Given this TMDB-specific ID, you can get profiles...".
            // Let's rely on the search result first as it's more efficient,
            // but if we need full images list, we'd query /person/{person_id}/images
            // For now, let's return the main profile path from the search result.

            const profilePath = personResults[0].profile_path;
            if (profilePath) {
                const imageUrl = `https://image.tmdb.org/t/p/w200${profilePath}`; // w200 size
                personImageCache.set(imdbId, imageUrl);
                return imageUrl;
            }
            return null;

        } catch (error) {
            console.error(`Error fetching person image for ${imdbId}:`, error);
            return null;
        }
    }
};

const DETAILS_BASE = '/api/get-movie-details';

export async function fetchMovieDetails(movieId: string) {
    try {
        // Use query param for movie_id as required by your API
        const response = await fetch(`${DETAILS_BASE}?movie_id=${encodeURIComponent(movieId)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch movie details: " + (error as Error).message);
    }
}
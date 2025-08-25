const MOVIES_BASE = '/api/get-movies';

export async function fetchMovies(page = 1) {
    try {
        const response = await fetch(`${MOVIES_BASE}?page=${page}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch movies: " + (error as Error).message);
    }
}
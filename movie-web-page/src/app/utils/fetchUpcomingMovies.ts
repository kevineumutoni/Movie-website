const UPCOMING_BASE = '/api/upcoming-movies';

export async function fetchUpcomingMovies() {
    try {
        const response = await fetch(UPCOMING_BASE);
        if (!response.ok) {
            throw new Error(`Failed to fetch upcoming movies: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch upcoming movies: " + (error as Error).message);
    }
}
const RECENT_BASE = '/api/recent-movie';

export async function fetchRecentMovies() {
    try {
        const response = await fetch(RECENT_BASE);
        if (!response.ok) {
            throw new Error(`Failed to fetch recent movies: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch recent movies: " + (error as Error).message);
    }
}
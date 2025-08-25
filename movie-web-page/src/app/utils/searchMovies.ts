const SEARCH_BASE = '/api/search-movies';

export async function searchMovies(searchQuery: string) {
    try {
        const response = await fetch(`${SEARCH_BASE}?searchQuery=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
            throw new Error(`Failed to search movies: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to search movies: " + (error as Error).message);
    }
}
const LATEST_BASE = '/api/latest-movies';

export async function fetchLatestMovie() {
    try {
        const response = await fetch(LATEST_BASE);
        if (!response.ok) {
            throw new Error(`Failed to fetch latest movie: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch latest movie: " + (error as Error).message);
    }
}
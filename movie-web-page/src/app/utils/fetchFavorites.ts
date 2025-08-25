const FAVORITE_BASE = '/api/favorite-movies';

export async function fetchFavorites(userId: string) {
    try {
        const response = await fetch(`${FAVORITE_BASE}?userId=${encodeURIComponent(userId)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch favorites: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch favorites: " + (error as Error).message);
    }
}
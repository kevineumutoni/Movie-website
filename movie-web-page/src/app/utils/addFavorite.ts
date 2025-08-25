const FAVORITE_BASE = '/api/favorite-movies';

export async function addFavorite(userId: string, movieId: string) {
    try {
        const response = await fetch(FAVORITE_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, movieId }),
        });
        if (!response.ok) {
            throw new Error(`Failed to add favorite: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to add favorite: " + (error as Error).message);
    }
}
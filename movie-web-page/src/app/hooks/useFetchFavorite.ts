import { fetchFavorites } from "@/app/utils/fetchFavorites";
import { useState, useEffect } from "react";

export interface Favorite {
    userId: string;
    movieId: string;
    posterUrl?: string;
}

const useFetchFavorites = (userId: string) => {
    const [favorites, setFavorites] = useState<Array<Favorite>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        (async () => {
            try {
                const data = await fetchFavorites(userId);
                setFavorites(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, [userId]);

    return { favorites, loading, error };
};

export default useFetchFavorites;
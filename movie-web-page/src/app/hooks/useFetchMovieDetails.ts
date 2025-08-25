import { fetchMovieDetails } from "@/app/utils/fetchMovieDetails";
import { useState, useEffect } from "react";

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null;
    posterUrl: string;
    backdropUrl: string;
}

const useFetchMovieDetails = (id: string) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const data = await fetchMovieDetails(id);
                setMovie({
                    ...data,
                    posterUrl: data.poster_path ? `${IMAGE_BASE}${data.poster_path}` : '/fallback-poster.jpg',
                    backdropUrl: data.backdrop_path ? `${IMAGE_BASE}${data.backdrop_path}` : '/fallback-backdrop.jpg',
                });
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    return { movie, loading, error };
};

export default useFetchMovieDetails;
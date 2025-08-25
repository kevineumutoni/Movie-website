import { fetchRecentMovies } from "@/app/utils/fetchRecentMovies";
import { useState, useEffect } from "react";

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null;
    posterUrl: string;
    backdropUrl: string;
}

const useFetchRecentMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchRecentMovies();
                const moviesWithImages = (data?.results || [])
                    .slice(0, 8)
                    .map((movie: Movie) => ({
                        ...movie,
                        posterUrl: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '/fallback-poster.jpg',
                        backdropUrl: movie.backdrop_path ? `${IMAGE_BASE}${movie.backdrop_path}` : '/fallback-backdrop.jpg',
                    }));
                setMovies(moviesWithImages);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { movies, loading, error };
};

export default useFetchRecentMovies;
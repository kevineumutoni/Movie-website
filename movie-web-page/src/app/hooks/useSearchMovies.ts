import { searchMovies } from "@/app/utils/searchMovies";
import { useState } from "react";

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

const useSearchMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (searchQuery: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchMovies(searchQuery);
            const moviesWithImages = (data?.results || []).map((movie: Movie) => ({
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
    };

    return { movies, loading, error, handleSearch };
};

export default useSearchMovies;
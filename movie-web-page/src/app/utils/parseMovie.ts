import { Movie } from "../types/Movie";

const IMAGE_BASE = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
const DEFAULT_FALLBACK = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/bDG3yei6AJlEAK3A5wN7RwFXQ7V.jpg';

export function parseMovie(movie: Movie): Movie {
    return {
        ...movie,
        posterUrl: movie.poster_path
            ? `${IMAGE_BASE}${movie.poster_path}`
            : DEFAULT_FALLBACK,
        backdropUrl: movie.backdrop_path
            ? `${IMAGE_BASE}${movie.backdrop_path}`
            : DEFAULT_FALLBACK,
    };
}
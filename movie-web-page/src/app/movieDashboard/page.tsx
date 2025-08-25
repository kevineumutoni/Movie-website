"use client";

import React, { useState, useEffect } from "react";
import SignInPage from "../signIn/page";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  InputBase,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SmartImage from "../smartImage/page";
import { mockMovies } from "../utils/mockMovies";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchRecentMovies from "../hooks/useFetchRecentMovies";
import useFetchUpcomingMovies from "../hooks/useFetchUpcomingMovies";
import useSearchMovies from "../hooks/useSearchMovies";
import { Movie } from "../types/Movie";

const GENRES = ["All"];
const DEFAULT_IMAGE_URL = "/images/default.png";

function limitText(text: string, maxWords: number): {
  truncated: string;
  isTruncated: boolean;
  full: string;
} {
  const words = text.split(" ");
  if (words.length <= maxWords) return { truncated: text, isTruncated: false, full: text };
  return {
    truncated: words.slice(0, maxWords).join(" ") + " ...",
    isTruncated: true,
    full: text,
  };
}

// Strictly type movies!
function filterMoviesWithImages(movies: Movie[]) {
  return movies.filter(
    (m) =>
      m.posterUrl &&
      m.posterUrl !== DEFAULT_IMAGE_URL &&
      m.backdropUrl &&
      m.backdropUrl !== DEFAULT_IMAGE_URL
  );
}

export default function MovieDashboard() {
  const { movies: allMovies = mockMovies } = useFetchMovies();
  const { movies: recentMovies = mockMovies } = useFetchRecentMovies();
  const { movies: upcomingMovies = mockMovies } = useFetchUpcomingMovies();
  const {
    movies: searchedMovies = [],
    loading: loadingSearch,
    handleSearch,
  } = useSearchMovies();

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<"recent" | "upcoming">("recent");
  const [mainIndex, setMainIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMainBox, setShowMainBox] = useState(true);
  const [showTitleId, setShowTitleId] = useState<number | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if ((searchTerm && searchedMovies.length) || showFavorites) {
      setShowMainBox(false);
    } else {
      setShowMainBox(true);
    }
  }, [searchTerm, searchedMovies.length, showFavorites]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleHome = () => {
    setShowFavorites(false);
    setSearchTerm("");
    setShowMainBox(true);
  };

  // Strictly type movies everywhere!
  const filteredAllMovies = filterMoviesWithImages(allMovies);
  const filteredRecentMovies = filterMoviesWithImages(recentMovies).slice(0, 8);
  const filteredUpcomingMovies = filterMoviesWithImages(upcomingMovies);
  const filteredSearchedMovies = filterMoviesWithImages(searchedMovies);

  const sliderMovies: Movie[] =
    sort === "recent"
      ? filteredRecentMovies.length
        ? filteredRecentMovies
        : filteredAllMovies.slice(0, 8)
      : filteredUpcomingMovies.length
      ? filteredUpcomingMovies
      : filteredAllMovies;

  let displayMovies: Movie[] = sliderMovies;

  if (showFavorites) {
    displayMovies = displayMovies.filter((m) => favorites.includes(m.id));
  }
  if (searchTerm && filteredSearchedMovies.length) {
    displayMovies = filteredSearchedMovies;
  }

  const toggleFavorite = (movieId: number) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleCardClick = (movieId: number) => {
    if (!showFavorites && !(searchTerm && filteredSearchedMovies.length)) {
      const idx = sliderMovies.findIndex((m) => m.id === movieId);
      if (idx !== -1) setMainIndex(idx);
    }
  };

  useEffect(() => {
    if (!showMainBox || !sliderMovies || sliderMovies.length === 0) return;
    const timer = setInterval(() => {
      setMainIndex((i) => (i + 1) % sliderMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderMovies, showMainBox]);



  return (
    <Box sx={{ bgcolor: "#18181b", minHeight: "100vh", color: "#fff", p: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="h3"
            fontWeight={900}
            color="#FFC83D"
            sx={{ fontFamily: "'Oswald', 'Roboto Slab', serif", letterSpacing: 2 }}
          >
            Moovie
          </Typography>
          <Box
            sx={{
              bgcolor: "#222",
              borderRadius: 2,
              px: 2,
              py: 1,
              minWidth: 320,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <InputBase
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                color: "#fff",
                width: "100%",
                fontSize: 20,
                fontFamily: "'Oswald', 'Roboto Slab', serif",
                fontWeight: 600,
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFC83D",
                color: "#18181b",
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 18,
                boxShadow: "0 2px 12px #FFC83D66",
                ":hover": {
                  bgcolor: "#18181b",
                  color: "#FFC83D",
                  border: "2px solid #FFC83D"
                }
              }}
              onClick={() => handleSearch(searchTerm)}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={3}>
          <Button
            variant="text"
            sx={{
              color: !showFavorites ? "#FFC83D" : "#fff",
              fontWeight: 700,
              fontSize: 20,
              fontFamily: "'Oswald', 'Roboto Slab', serif",
              borderBottom: !showFavorites ? "3px solid #FFC83D" : "none",
              borderRadius: 0,
              transition: "border-bottom 0.2s",
            }}
            onClick={handleHome}
          >
            Home
          </Button>
          <Button
            variant="text"
            sx={{
              color: showFavorites ? "#FFC83D" : "#fff",
              fontWeight: 700,
              fontSize: 20,
              fontFamily: "'Oswald', 'Roboto Slab', serif",
              borderBottom: showFavorites ? "3px solid #FFC83D" : "none",
              borderRadius: 0,
              transition: "border-bottom 0.2s",
            }}
            onClick={() => setShowFavorites((v) => !v)}
          >
            Favorites
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowSignIn(true)}
            sx={{
              bgcolor: "#FFC83D",
              color: "#18181b",
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 18,
              px: 3,
              boxShadow: "0 2px 14px #FFC83D99",
              fontFamily: "'Oswald', 'Roboto Slab', serif",
              ":hover": {
                bgcolor: "#18181b",
                color: "#FFC83D",
                border: "2px solid #FFC83D"
              }
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>

      {loadingSearch && searchTerm && (
        <Typography sx={{ mb: 2, color: "#FFC83D", fontSize: 20, fontWeight: 700 }}>
          Loading results for &quot;{searchTerm}&quot;...
        </Typography>
      )}
      {searchTerm && !loadingSearch && filteredSearchedMovies.length > 0 && (
        <Typography sx={{ mb: 2, color: "#FFC83D", fontSize: 20, fontWeight: 700 }}>
          Scroll below to see search results for &quot;<b>{searchTerm}</b>&quot;!
        </Typography>
      )}

      {showMainBox && sliderMovies && sliderMovies.length > 0 && (
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            minHeight: 800,
            mb: 4,
            bgcolor: "#000",
          }}
        >
          <Box sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            backdropFilter: "blur(12px) brightness(0.5)",
            width: "100%",
            height: "100%",
          }} />
          <IconButton
            sx={{
              position: "absolute",
              left: 30,
              top: "50%",
              zIndex: 3,
              bgcolor: "#222",
              color: "#FFC83D",
              fontSize: 38,
              p: 2,
              transform: "translateY(-50%)",
              boxShadow: "0 2px 8px #FFC83D88",
            }}
            onClick={() =>
              setMainIndex((i) => (i - 1 + sliderMovies.length) % sliderMovies.length)
            }
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              right: 30,
              top: "50%",
              zIndex: 3,
              bgcolor: "#222",
              color: "#FFC83D",
              fontSize: 38,
              p: 2,
              transform: "translateY(-50%)",
              boxShadow: "0 2px 8px #FFC83D88",
            }}
            onClick={() => setMainIndex((i) => (i + 1) % sliderMovies.length)}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              height: 800,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SmartImage
              src={sliderMovies[mainIndex]?.backdropUrl}
              alt={sliderMovies[mainIndex]?.title || "Movie"}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ zIndex: 1 }}
            />
            <Box
              sx={{
                position: "absolute",
                left: { xs: 12, md: 80 },
                top: { xs: 18, md: 80 },
                zIndex: 4,
                color: "#fff",
                maxWidth: 480,
                p: 2,
                backdropFilter: "blur(3px)",
                background: "rgba(0,0,0,0.4)",
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h3"
                fontWeight={900}
                color="#FFC83D"
                mb={2}
                sx={{ fontFamily: "'Oswald', 'Roboto Slab', serif", letterSpacing: 2 }}
              >
                {sliderMovies[mainIndex]?.title}
              </Typography>
              <Typography
                variant="body1"
                mb={2}
                sx={{ fontSize: 22, fontWeight: 500, fontFamily: "'Roboto Slab', serif" }}
              >
                {sliderMovies[mainIndex]?.overview}
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Chip
                  label={sliderMovies[mainIndex]?.release_date || "N/A"}
                  sx={{ bgcolor: "#FFC83D", color: "#18181b", fontWeight: 700, fontSize: 18 }}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#FFC83D",
                  color: "#18181b",
                  fontWeight: 900,
                  fontSize: 22,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: "0 2px 16px #FFC83D55",
                  ":hover": {
                    bgcolor: "#18181b",
                    color: "#FFC83D",
                    border: "2px solid #FFC83D"
                  }
                }}
              >
                Watch Now
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        {GENRES.map((g) => (
          <Button
            key={g}
            size="large"
            variant={g === "All" ? "contained" : "text"}
            sx={{
              bgcolor: g === "All" ? "#FFC83D" : "#fff",
              color: "#18181b",
              borderRadius: 2,
              fontWeight: 800,
              px: 2,
              fontSize: 18,
            }}
            disabled
          >
            {g}
          </Button>
        ))}
        <Box flex={1}></Box>
        <Tabs
          value={sort}
          onChange={(_, value) => setSort(value)}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            "& .MuiTab-root": {
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              fontFamily: "'Oswald', 'Roboto Slab', serif",
            },
            "& .Mui-selected": { color: "#FFC83D" },
            "& .MuiTabs-indicator": { bgcolor: "#FFC83D", height: 4 },
          }}
        >
          <Tab label="Recent" value="recent" />
          <Tab label="Upcoming" value="upcoming" />
        </Tabs>
      </Box>

      <Typography
        variant="h5"
        fontWeight={600}
        mt={4}
        mb={2}
        sx={{
          fontSize: 32,
          fontFamily: "'Oswald', 'Roboto Slab', serif",
          color: showFavorites ? "#FFC83D" : "#fff",
        }}
      >
        {showFavorites ? "Favorites" : "Movies"}
      </Typography>
      <Box display="flex" gap={4} flexWrap="wrap">
        {displayMovies.length === 0 ? (
          <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#FFC83D" }}>
            Loading movies... please wait.
          </Typography>
        ) : (
          displayMovies.map((movie) => {
            const titleLimit = limitText(movie.title, 4);
            const showFullTitle = showTitleId === movie.id;
            return (
              <Card
                key={movie.id}
                sx={{
                  minWidth: 430,
                  maxWidth: 460,
                  minHeight: 340,
                  bgcolor: showFavorites ? "#fff" : "#222",
                  color: showFavorites ? "#18181b" : "#fff",
                  borderRadius: 5,
                  boxShadow: showFavorites ? 10 : 4,
                  position: "relative",
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, background 0.2s, color 0.2s",
                  border: showFavorites ? "2px solid #FFC83D" : "none",
                }}
                onClick={() => {
                  handleCardClick(movie.id);
                  setShowTitleId(null);
                }}
              >
                <CardMedia
                  sx={{
                    height: 310,
                    borderRadius: 5,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <SmartImage
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 260px) 100vw, 260px"
                  />
                </CardMedia>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    pt: 2,
                    pb: 1,
                  }}
                >
                  <Box flex={1}>
                    <Typography
                      fontWeight={900}
                      color="#FFC83D"
                      sx={{
                        fontSize: 22,
                        fontFamily: "'Oswald', 'Roboto Slab', serif",
                        letterSpacing: 1,
                        overflowWrap: 'break-word',
                      }}
                    >
                      {!showFullTitle ? (
                        <>
                          {titleLimit.truncated}
                          {titleLimit.isTruncated && (
                            <Button
                              size="small"
                              sx={{
                                color: "#FFC83D",
                                fontWeight: 700,
                                textTransform: "none",
                                ml: 1,
                                fontSize: 16,
                                p: 0,
                                minWidth: "unset",
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                setShowTitleId(movie.id);
                              }}
                            >
                              Read more
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          {titleLimit.full}
                          <Button
                            size="small"
                            sx={{
                              color: "#FFC83D",
                              fontWeight: 700,
                              textTransform: "none",
                              ml: 1,
                              fontSize: 16,
                              p: 0,
                              minWidth: "unset",
                            }}
                            onClick={e => {
                              e.stopPropagation();
                              setShowTitleId(null);
                            }}
                          >
                            Show less
                          </Button>
                        </>
                      )}
                    </Typography>
                    <Typography
                      variant="body1"
                      color={showFavorites ? "#18181b" : "#fff"}
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        fontFamily: "'Roboto Slab', serif",
                        mt: 0.5,
                      }}
                    >
                      {movie.release_date}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(movie.id);
                    }}
                    sx={{
                      ml: 2,
                      bgcolor: "#000000",
                      color: "#FFC83D",
                      boxShadow: "0 0 12px 4px #000000",
                      fontSize: 40,
                      p: 1.7,
                      borderRadius: 2,
                      transition: "0.2s, background 0.2s, color 0.2s",
                    }}
                  >
                    {favorites.includes(movie.id) ? "❤️" : "🤍"}
                  </IconButton>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
}
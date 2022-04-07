import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import MovieItem from "../../components/MovieItem/MovieItem";
import CustomPagination from "../../components/Pagination/CustomPagination";
import classes from "./Movie.module.css";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";
const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const fetchMovie = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
    setIsLoading(false);
  }, [page,genreforURL]);

  useEffect(() => {
    fetchMovie();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className={classes.trending}>
        {!isLoading &&
          content &&
          content.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type="movie"
              vote_average={movie.vote_average}
            />
          ))}
        {isLoading && <p className="loading">Loading...</p>}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;

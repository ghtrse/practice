import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import MovieItem from "../../components/MovieItem/MovieItem";
import CustomPagination from "../../components/Pagination/CustomPagination";
import classes from './Trending.module.css'
const Trending = () => {
  const [content, setContent] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [page,setPage] = useState(1);
  const fetchTrending = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
    setIsLoading(false);
  },[page]);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);
  return (
    <React.Fragment>
      <span className='pageTitle'>Trending</span>
      <div className={classes.trending}>
        {!isLoading && content &&
          content.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type={movie.media_type}
              vote_average={movie.vote_average}
            />
          ))}
          {isLoading && <p className="loading">Loading...</p>}
      </div>
      <CustomPagination setPage={setPage}/>
    </React.Fragment>
  );
};

export default Trending;

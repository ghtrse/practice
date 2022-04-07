import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import classes from "./Genres.module.css";
const Genres = ({
  type,
  genres,
  selectedGenres,
  setGenres,
  setSelectedGenres,
  setPage,
}) => {
  const addGenreHandler = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const removeGenreHandler = (genre) => {
    setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
  }, []);
  return (
    <React.Fragment>
      <div className={classes.genres}>
      {selectedGenres && selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            variant="filled"
            color="primary"
            size="small"
            clickable
            onDelete={() => removeGenreHandler(genre)}
          />
        ))}
        {genres && genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            variant="filled"
            color="secondary"
            size="small"
            clickable
            onClick={() => addGenreHandler(genre)}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Genres;

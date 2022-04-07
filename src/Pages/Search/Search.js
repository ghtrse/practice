import { Button, Tab, Tabs, ThemeProvider } from "@mui/material";
import { createTheme, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useCallback, useEffect, useState } from "react";
import classes from "./Search.module.css";
import axios from "axios";
import MovieItem from "../../components/MovieItem/MovieItem";
import CustomPagination from "../../components/Pagination/CustomPagination";
const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = useCallback(async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  },[page,searchText,type]);

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [fetchSearch]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.search}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            variant="filled"
            label="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch} >
            <SearchIcon fontSize="large" />
          </Button>
        </div>

        <Tabs
          style={{ paddingBottom: 10 }}
          variant="fullWidth"
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Movies" />
          <Tab style={{ width: "50%" }} label="TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className={classes.trending}>
        { content &&
          content.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={movie.vote_average}
            />
          ))}

          {searchText && !content && (type ? <h2>No series found</h2> : <h2>No movies found</h2>)}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;

import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import SimpleBottomNavigation from "./components/NavBottom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./Pages/Trending/Trending";
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import { Container } from "@mui/material";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
};

export default App;

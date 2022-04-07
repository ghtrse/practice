import React from "react";
import {useLocation} from 'react-router-dom';
import classes from './Header.module.css';
const Header = () => {
  const location = useLocation();
  const scrollHandler = () => {
    window.scroll(0,0);
  }
  return (
      <React.Fragment>
          <p onClick={scrollHandler} className={classes.header}>IMDb {location.pathname.split('/')[1]} </p>
      </React.Fragment>
  );
};

export default Header;

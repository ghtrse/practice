import { Pagination, createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#fff'
    }
  },
});

const CustomPagination = ({setPage, numOfPages = 20 }) => {
  const pageChangeHandler = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 15,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          color="primary"
          onChange={(e) => pageChangeHandler(e.target.textContent)}
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;

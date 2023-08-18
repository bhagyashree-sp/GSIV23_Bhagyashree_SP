import React from "react";

const movieContext = React.createContext({
  searchInput: "",
  onChangeSearchInput: () => {},
});

export default movieContext;

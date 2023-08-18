import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import List from "./components/List.js";
import Details from "./components/Details.js/index.js";
import movieContext from "./context/movieContext.js";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <movieContext.Provider value={{ searchInput, onChangeSearchInput }}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/movie/:id" element={<Details />} />
      </Routes>
    </movieContext.Provider>
  );
}

export default App;

import { useEffect, useState } from "react";
import ListCard from "../ListCard.js";
import Header from "../Header/index.js";
import "./index.css";
import movieContext from "../../context/movieContext.js";
import { useContext } from "react";

const List = () => {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const { searchInput } = useContext(movieContext);

  const filteredList = list.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getList = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?page=${pageCount}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTIwMGMyMDc1NTQ4MmY2YzEzZmM1YjQxNDBiMTQzMCIsInN1YiI6IjY0ZGQ5NjFiYTNiNWU2MDBlMjljNWM4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7WdHraBNOUzq3EgHFWSlvKGktnkN96mMuBz-5Mwc_Vw",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
    const formattedData = data.results.map((eachItem) => ({
      id: eachItem.id,
      title: eachItem.original_title,
      description: eachItem.overview,
      rating: eachItem.vote_average,
      image: eachItem.poster_path,
    }));
    // console.log("formatdata", formattedData);
    setList((pre) => [...pre, ...formattedData]);
    // console.log(formattedData);
  };

  useEffect(() => {
    getList();
  }, [pageCount]);

  const onClickLoadMore = () => {
    // console.log("hai");
    setPageCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="list-page-container">
      <Header />
      <div className="list-container">
        {searchInput === " "
          ? list.map((eachMovieList) => (
              <ListCard eachMovieList={eachMovieList} key={eachMovieList.id} />
            ))
          : filteredList.map((eachMovieList) => (
              <ListCard eachMovieList={eachMovieList} key={eachMovieList.id} />
            ))}

        <button
          type="button"
          onClick={onClickLoadMore}
          className="load-more-button"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default List;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
// import { BiHighlight } from "react-icons/bi";
import "./index.css";

const Details = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  const getDetails = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`;
    // const url =
    //   "https://api.themoviedb.org/3/movie/976573/credits?language=en-US";
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
    console.log(data);

    const castName = data.credits.cast
      .slice(0, 4)
      .map((eachCastName) => eachCastName.name);

    const director = data.credits.crew.filter(
      (eachItem) => eachItem.job === "Director"
    );

    // const directorName = director.map((eachDr) => eachDr.name);

    const updatedData = {
      id: data.id,
      directorName: director.map((eachDr) => eachDr.name)[0],
      year: data.release_date,
      length: data.runtime,
      cast: castName,
      poster: data.poster_path,
      title: data.original_title,
      rating: data.vote_average,
      overview: data.overview,
    };

    console.log(updatedData);
    setMovieDetails(updatedData);
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  const { title, poster, directorName, year, length, cast, rating, overview } =
    movieDetails;

  const d = new Date(year);
  const years = d.getFullYear();

  return (
    <div className="details-outer-container">
      <Header />
      <div className="details-container">
        <img
          src={`https://www.themoviedb.org/t/p/w440_and_h660_face${poster}`}
          alt="movie-poster"
          className="details-poster"
        />
        <div className="details-content-container">
          <div className="details-title-rating">
            <p className="details-title">{title}</p>
            <p className="detail-rating">({rating})</p>
          </div>
          <div className="years-length-name-container">
            <p className="y-l-n">{years} | </p>
            <p className="y-l-n">{length} | </p>
            <p className="y-l-n">{directorName} | </p>
          </div>

          {cast && cast.length > 0 && (
            <p className="details-cast">Cast : {cast.join(", ")}</p>
          )}

          {/* <p className="details-cast">Cast : {cast.join(", ")}</p> */}
          <p className="details-description">Description: {overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;

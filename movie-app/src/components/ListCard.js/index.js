import { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import "./index.css";

const ListCard = (props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { eachMovieList } = props;
  const { id, title, description, rating, image } = eachMovieList;

  const toggleDescription = () => {
    setShowFullDescription(true);
  };

  return (
    <div className="card-container">
      <Link to={`/movie/${id}`}>
        <img
          src={`https://www.themoviedb.org/t/p/w440_and_h660_face${image}`}
          alt="movie-poster"
          className="poster"
        />
      </Link>
      <div className="card-content">
        <div className="title-rating-container">
          <p className="title">{title}</p>
          <p className="rating">{rating}</p>
        </div>
        {showFullDescription ? (
          <p className="description">{description} </p>
        ) : (
          <div className="bb">
            <p className="description">
              {description.slice(0, 70)}
              <button
                type="button"
                onClick={toggleDescription}
                className="button-description"
              >
                {/* <BsThreeDots className="three-dots" /> */}
                ...
              </button>
            </p>
          </div>
        )}

        {/* <p className="description">
          {showFullDescription ? (
            description
          ) : (
            <div className="less-description-three-dots-container">
              {description.slice(0, 70)}
              <button
                type="button"
                onClick={toggleDescription}
                className="button-description"
              >
                <BsThreeDots className="three-dots" />
              </button>
            </div>
          )}
        </p> */}
        {/* {showFullDescription && (
        <button
          type="button"
          onClick={toggleDescription}
          className="button-description"
        >
          ...load less
        </button>
      )} */}
      </div>
    </div>
  );
};

export default ListCard;

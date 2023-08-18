import { BiSolidHome } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import "./index.css";
import movieContext from "../../context/movieContext.js";
import { useContext } from "react";

const Header = () => {
  const { pathname } = useLocation();
  const { onChangeSearchInput } = useContext(movieContext);

  return (
    <nav className="nav-outer-container">
      {pathname === "/" ? (
        <div className="search-bar-container">
          <input
            type="search"
            placeholder="Search"
            className="search"
            onChange={onChangeSearchInput}
          />
          <button className="search-button">
            <HiSearch className="search-icon" />
          </button>
        </div>
      ) : (
        <h2 className="heading">Movie Details</h2>
      )}

      <BiSolidHome className="home-icon" />
    </nav>
  );
};

export default Header;

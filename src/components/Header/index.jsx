import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserImage from "../../images/user.png";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies, fetchAsyncSeries } from "../../features/movies/movieSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerm("");
    if (term.length > 0) {
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncSeries(term));
    }
  };

  return (
    <div className="header">
      <Link to="/" reloadDocument>
        <div className="logo">Movie App</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input type="text" value={term} placeholder="Search" onChange={(e) => setTerm(e.target.value)} />
          <button type="submit">
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={UserImage} alt="User" />
      </div>
    </div>
  );
}

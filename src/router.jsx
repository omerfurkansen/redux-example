import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import PageNotFound from "./images/pnf.jpeg";

export default function Router() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
        <Route path="*" element={<img src={PageNotFound} alt="Page Not Found" style={{ width: "100%" }} />} />
      </Routes>
    </div>
  );
}

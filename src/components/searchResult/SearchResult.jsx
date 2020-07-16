import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import LazyLoad from "react-lazy-load";

import { fetchSearchResult } from "../../service";

import './SearchResult.css'

export default function SearchResult({ match }) {
  const query = match.params.query;
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setResults([]);
    setCurrentPage(1);
    setTotalPages(1);
  }, [query]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchSearchResult(query, currentPage);
      setTotalPages(data ? data[0]["totalPages"] : 1);
      setResults((prev) => [...prev, ...data]);
    };
    fetchAPI();
  }, [currentPage]);

  const searchResultsList = results.map(
    ({ poster, title, id, rating }, index) => {
      return (
        <div className="col-md-3 col-6" key={index}>
          <LazyLoad offsetVertical={0}>
            <div>
              <div className="card">
                <Link to={`/movie/${id}`}>
                  <img src={poster} alt={title} className="img-fluid" />
                </Link>
              </div>
              <div className="my-3">
                <p style={{ fontWeight: "bolder" }}>{title}</p>
                <p>Rated: {rating}</p>
                <ReactStars
                  count={rating}
                  size={20}
                  color1={"#f4c10f"}
                ></ReactStars>
              </div>
            </div>
          </LazyLoad>
        </div>
      );
    }
  );

  return (
    <div className="container">
      <div className="row mt-3">{searchResultsList}</div>
      {currentPage < totalPages ? (
        <div className="row my-3 justify-content-center">
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
}

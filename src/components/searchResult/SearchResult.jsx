import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import { fetchSearchResult } from "../../service";

export default function SearchResult({ match }) {
  const query = match.params.query;
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setResults(await fetchSearchResult(query));
    };
    fetchAPI();
  }, [query]);

  const searchResultsList = results.map(
    ({ poster, title, id, rating }, index) => {
      return (
        <div className="col-md-3 col-6">
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
      );
    }
  );

  return (
    <div className="container">
      <div className="row mt-3">{searchResultsList}</div>
    </div>
  );
}

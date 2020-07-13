import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Carousel } from "react-bootstrap";

import {
  fetchMovies,
  fetchGenre,
  fetchMovieByGenre,
  fetchPersons,
  fetchTopRatedMovie,
} from "../../service";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(""));
      setPersons(await fetchPersons());
      setTopRated(await fetchTopRatedMovie());
    };
    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };

  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <Carousel.Item key={index}>
        <img src={item.backPoster} alt={item.title} className="d-block w-100" />
        <Carousel.Caption>
          <h1>{item.title}</h1>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <Link to={`/movie/${item.id}`}>
          <img src={item.poster} alt={item.title} className="img-fluid" />
        </Link>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  const trendingPersons = persons.slice(0, 4).map((person, index) => {
    return (
      <div className="col-md-3 text-center" key={index}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={person.profileImg}
          alt={person.name}
        />
        <p className="font-weight-bold text-center">{person.name}</p>
        <p
          style={{ color: "#5q606b" }}
          className="font-weight-light text-center"
        >
          Trending for {person.known}
        </p>
      </div>
    );
  });

  const topRatedList = topRated.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title} />
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <Carousel interval={1000}>{movies}</Carousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>

      <div className="row mt-3">{movieList}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b" }} className="font-weight-old">
            TRENDING PERSON THIS WEEK
          </p>
        </div>
      </div>

      <div className="row mt-3">{trendingPersons}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b" }} className="font-weight-bold">
            TOP RATED MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">{topRatedList}</div>

      <hr style={{ borderTop: "1px solid #5a606b" }} className="mt-5" />

      <div className="row mt-3">
        <div className="col-md-8 col-sm-6">
          <h3>ABOUT ME</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, quos
            labore. Aut, consectetur. Quo iste, nesciunt libero nostrum
            explicabo officia ad, vero, ipsum veniam pariatur voluptatem rerum!
            Quia, quae praesentium?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit,
            fuga ad error praesentium asperiores quo tempore vero quisquam
            pariatur! Necessitatibus unde dolor aut autem consectetur distinctio
            eius error facere obcaecati?
          </p>
          <ul className="lsit-inline">
            <li className="list-inline-item">
              <a style={{ color: "#f4c10" }} href="/">
                <i className="fab fa-facebook"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a style={{ color: "#f4c10" }} href="/">
                <i className="fab fa-google"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a style={{ color: "#f4c10" }} href="/">
                <i className="fab fa-youtube"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a style={{ color: "#f4c10" }} href="/">
                <i className="fab fa-instagram"> </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

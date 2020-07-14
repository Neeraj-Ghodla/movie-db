import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchSimilarMovies,
  fetchCast,
} from "../../service";

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "./moviedetail.css";

export default function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  let genresList = [];

  const [detail, setDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCast(await fetchCast(params.id));
      setSimilarMovies(await fetchSimilarMovies(params.id));
    };
    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  const MoviePlayerModal = (props) => {
    const youtubeURL = `https://youtube.com/embed/`;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <div className="embed-container">
            <iframe
              src={video ? youtubeURL + video.key : null}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  if (genres) {
    genresList = genres.map((genre, index) => {
      return (
        <li className="list-inline-item">
          <button type="button" className="btn btn-outline-info">
            {genre.name}
          </button>
        </li>
      );
    });
  }

  const castList = cast.slice(0, 4).map((cast, index) => {
    return (
      <div className="col-md-3 text-center" key={index}>
        <img
          src={cast.img}
          alt={cast.name}
          className="img-fluid rounded-circle mx-auto d-block"
        />
        <p className="font-weight-bold text-center">{cast.name}</p>
        <p
          style={{ color: "5a606b" }}
          className="font-weight-light text-center"
        >
          {cast.character}
        </p>
      </div>
    );
  });

  const similarMoviesList = similarMovies.slice(0, 4).map((movie, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${movie.id}`}>
            <img className="img-fluid" src={movie.poster} alt={movie.title} />
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{movie.title}</p>
          <p>Rated: {movie.rating}</p>
          <ReactStars
            count={movie.rating}
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
        <MoviePlayerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePlayerModal>
        <div style={{ width: "100%" }} className="col text-center">
          <img
            src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
            className="img-fluid"
          />
          <div className="carousel-center">
            <i
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
              className="far fa-play-circle"
              onClick={() => {
                if (video) setIsOpen(true);
              }}
            ></i>
          </div>
          <div
            style={{ textAlign: "center", fontSize: 35 }}
            className="carouse-caption"
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail.vote_average}
              size={20}
              color="#f4c10f"
            ></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
              {detail.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>

        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUNTIME</p>
          <p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
        </div>

        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BUDGET</p>
          <p style={{ color: "#f4c10f" }}>{detail.budget}</p>
        </div>

        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>REVENUE</p>
          <p style={{ color: "#f4c10f" }}>{detail.revenue}</p>
        </div>

        {/* <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>HOMEPAGE</p>
          <p style={{ color: "#f4c10f" }}>{detail.homepage}</p>
        </div> */}
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CAST</p>
        </div>
      </div>

      <div className="row mt-3">{castList}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">{similarMoviesList}</div>

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

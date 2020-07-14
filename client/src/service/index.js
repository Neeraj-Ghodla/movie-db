import axios from "axios";

const apiKey = "d7cdfa6e3da4b62c9664b90b283d7ea2";
const URL = "https://api.themoviedb.org/3";
const nowPlayingURL = `${URL}/movie/now_playing`;
const topRatedURL = `${URL}/movie/top_rated`;
const movieURL = `${URL}/movie`;
const moviesURL = `${URL}/discover/movie`;
const genreURL = `${URL}/genre/movie/list`;
const personURL = `${URL}/trending/person/week`;
const posterURL = "https://image.tmdb.org/t/p/original/";

export const fetchMovies = async () => {
  try {
    const { data } = await axios.get(nowPlayingURL, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });

    return data["results"].map((res) => ({
      id: res["id"],
      backPoster: posterURL + res["backdrop_path"],
      popularity: res["popularity"],
      title: res["title"],
      poster: posterURL + res["poster_path"],
      overview: res["overview"],
      rating: res["vote_average"],
    }));
  } catch (error) {}
};

export const fetchGenre = async () => {
  try {
    const { data } = await axios.get(genreURL, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });

    return data["genres"].map((genre) => ({
      id: genre["id"],
      name: genre["name"],
    }));
  } catch (error) {}
};

export const fetchMovieByGenre = async (genre_id) => {
  try {
    const { data } = await axios.get(moviesURL, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        with_genres: genre_id,
      },
    });

    return data["results"].map((res) => ({
      id: res["id"],
      backPoster: posterURL + res["backdrop_path"],
      popularity: res["popularity"],
      title: res["title"],
      poster: posterURL + res["poster_path"],
      overview: res["overview"],
      rating: res["vote_average"],
    }));
  } catch (error) {}
};

export const fetchPersons = async () => {
  try {
    const { data } = await axios.get(personURL, {
      params: {
        api_key: apiKey,
      },
    });

    return data["results"].map((person) => ({
      id: person["id"],
      popularity: person["popularity"],
      name: person["name"],
      profileImg: "https://image.tmdb.org/t/p/w200" + person["profile_path"],
      known: person["known_for_department"],
    }));
  } catch (error) {}
};

export const fetchTopRatedMovie = async () => {
  try {
    const { data } = await axios.get(topRatedURL, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });

    return data["results"].map((res) => ({
      id: res["id"],
      backPoster: posterURL + res["backdrop_path"],
      popularity: res["popularity"],
      title: res["title"],
      poster: posterURL + res["poster_path"],
      overview: res["overview"],
      rating: res["vote_average"],
    }));
  } catch (error) {}
};

export const fetchMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${movieURL}/${id}`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    return data;
  } catch (error) {}
};

export const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieURL}/${id}/videos`, {
      params: {
        api_key: apiKey,
      },
    });
    if (data["results"].length > 0) return data["results"].filter((video) => video.type === 'Trailer')[0];
    else return null;
  } catch (error) {}
};

export const fetchCast = async (id) => {
  try {
    const { data } = await axios.get(`${movieURL}/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });

    return data["cast"].map((cast) => ({
      id: cast["cast_id"],
      character: cast["character"],
      name: cast["name"],
      img: "https://image.tmdb.org/t/p/w200" + cast["profile_path"],
    }));
  } catch (error) {}
};

export const fetchSimilarMovies = async (id) => {
  try {
    const { data } = await axios.get(`${movieURL}/${id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });

    return data["results"].map((movie) => ({
      id: movie["id"],
      backPoster: movie["backposter_path"],
      popularity: movie["popularity"],
      title: movie["title"],
      poster: posterURL + movie["poster_path"],
      overview: movie["overview"],
      rating: movie["vote_average"],
    }));
  } catch (error) {}
};

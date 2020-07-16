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
const imageMissing =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAADcCAMAAADutHs3AAAABlBMVEX////m5ua54GxLAAACl0lEQVR4nO3cy1LDMBBE0fD/P01RFBUIjjQvdXukvltZ9tlAYlvK46NhDzYgktCohEYlNCqhUQmNSmhUQqMSGpXQqIRGJTSqavTjouJL1KKvwEvkZScbiovdNWcyiCvdFacxk6vY+ZO4yDXs7Cnc5Ap27gQhcp6dmh42J9WJ2Qlykh2fmzRn1OGpaXNCHZxZQE6wY/OKzFF1aFqZOaiOzCo0x9SBSaXmkNo/p9gcUbunlJsDau+MBWa/+gT0ErNb7Tt+kdmrdh2+zOxUe45eaPapd0cvNbvUm6MXmz3qvdHLzQ711miA2a7eGQ0xm9VC3wsNMlvVQt8KDTMb1UILnUQDzTa10EILLbTQQgsttNBCCy200DR0yxtboYXeDt3yqanQMHTLdy5Cw9At39j2RLdchdAT3XJlTU90y9ViPdEtV0D2RLdc1dtz/fQytQ9xxJ6AnuiW+1wWqN2CU/ZuFasD1z9nP2KhOnT1k/bY1rCjlz5s33haHb/wcb+FkFGnrqrf94C5eX+IjP8eWXKGzf1ERH6MV5GjbPpXU8z36VpyiH2He8TVN7YryH72XR6L9XwAueZR71qyi32nF0U93yP2fM1cuQoBRbayb7cuzwS6m9minh+CNhvU0yPw5rl6dgDDPFVPxjnmmXo8zDJP1MNRnnmsHg0yzUP1YIxrHqnfD7HNA/VeaLb4Ky+a7f3uADRb+5MHzbY+s6PZ0t9tjWY7/2ZDs5WvbYtmG/83R7OFV22JZvuuG6PZuncJjWqEZtvetxmaLRu1FZrtGrcRmq2atQ2abZq3CZotsiQ0qlc022NrAzRbY01oVO3RbIs9oVE90WyJJ6FRtUazHb6ERtUYzVZ4ExpVWzTb4E9oVEKjEloppVR9n/12QizsFE7aAAAAAElFTkSuQmCC";

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
    if (data["results"].length > 0)
      return data["results"].filter((video) => video.type === "Trailer")[0];
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

    return data["cast"]
      .filter((cast) => "character" in cast)
      .map((cast) => ({
        id: cast["cast_id"],
        character: cast["character"],
        name: cast["name"],
        img: cast["profile_path"]
          ? "https://image.tmdb.org/t/p/w200" + cast["profile_path"]
          : imageMissing,
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

export const fetchSearchResult = async (query, page) => {
  try {
    const { data } = await axios.get(`${URL}/search/movie`, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
        query: query,
      },
    });

    return data["results"]
      .filter(
        (result) =>
          result["release_date"] &&
          result["poster_path"] &&
          result["backdrop_path"]
      )
      .map((result) => ({
        id: result["id"],
        poster: result["poster_path"]
          ? posterURL + result["poster_path"]
          : imageMissing,
        title: result["title"],
        rating: result["vote_average"],
        date: result["release_date"],
        popularity: result["popularity"],
        totalPages: data['total_pages'],
        page: data['page']
      }));
      // .sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
  } catch (error) {}
};

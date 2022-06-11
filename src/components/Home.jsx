import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { useDispatch } from 'react-redux';
import { logoutAsincrono } from '../actions/actionLogin';
//peliculas
import axios from 'axios'
import Movie from "./Movie"
import Youtube from 'react-youtube'


export const Home = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAsincrono())
  }

  //peliculas
  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

  const [playing, setPlaying] = useState(false)
  const [trailer, setTrailer] = useState(null)
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [movie, setMovie] = useState({ title: "Loading Movies" })

  
  useEffect(() => {
    fetchMovies();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault()
    }

    const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
      params: {
        api_key: API_KEY,
        query: searchKey
      }
    })

    console.log(data.results[0])
    setMovies(data.results)
    setMovie(data.results[0])

    if (data.results.length) {
      await fetchMovie(data.results[0].id)
    }
  }

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos"
      }
    })

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
      setTrailer(trailer ? trailer : data.videos.results[0])
    }

    setMovie(data)
  }


  const selectMovie = (movie) => {
    fetchMovie(movie.id)
    setPlaying(false)
    setMovie(movie)
    window.scrollTo(0, 0)
  }

  const renderMovies = () => (
    movies.map(movie => (
      <Movie
        selectMovie={selectMovie}
        key={movie.id}
        movie={movie}
      />
    ))
  )





  return (

    <div className="App">
    <header className="center-max-size header">
        <img
            src="https://res.cloudinary.com/julcabh/image/upload/v1644814168/Sprint3/logo-blockBuster_fcx3cy.png"
            alt="logo"
            width="100"
        />
        <h3 href="/home">Todas</h3>
        <h3 href="/home">Mas Valoradas</h3>
        <h3 href="/home">Menos Valoradas</h3>
        <form className="form" onSubmit={fetchMovies}>
            <input className="search" type="text" id="search"
                   onInput={(event) => setSearchKey(event.target.value)}/>
            <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
        </form>
        <img
          onClick={() => handleLogout()}
          src="https://res.cloudinary.com/julcabh/image/upload/v1643585731/login-xxl_rnvlgd.png"
          alt="LogIn"
          width="50"
        />
    </header>
    {movies.length ?
        <main>
            {movie ?
                <div className="poster"
                     style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                    {playing ?
                        <>
                            <Youtube
                                videoId={trailer.key}
                                className={"youtube amru"}
                                containerClassName={"youtube-container amru"}
                                opts={
                                    {
                                        width: '100%',
                                        height: '100%',
                                        playerVars: {
                                            autoplay: 1,
                                            controls: 0,
                                            cc_load_policy: 0,
                                            fs: 0,
                                            iv_load_policy: 0,
                                            modestbranding: 0,
                                            rel: 0,
                                            showinfo: 0,
                                        },
                                    }
                                }
                            />
                            <button onClick={() => setPlaying(false)} className={"button close-video"}>Cerrar
                            </button>
                        </> :
                        <div className="center-max-size">
                            <div className="poster-content">
                                {trailer ?
                                    <button className={"button play-video"} onClick={() => setPlaying(true)}
                                            type="button">Reproducir el
                                        Trailer</button>
                                    : 'Sorry, no trailer available'}
                                <h1>{movie.title}</h1>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    }
                </div>
                : null}

            <div className={"center-max-size container"}>
                {renderMovies()}
            </div>
        </main>
        : 'Sorry, no movies found'}
</div>

  )
}


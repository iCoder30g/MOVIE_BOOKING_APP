import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getMoviesDetail } from '../../api/movies';
import ReactPlayer from 'react-player';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';


const MovieDetail = () => {
    const [movieDetail, setMovieDetail] = useState({});
    const params = useParams();
    const { movieId } = params;
    console.log({ movieId });

    useEffect(() => {
        fetchMovieDetail(movieId);
    }, []);


    const fetchMovieDetail = (movieId) => {
        getMoviesDetail(movieId)
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    console.log(data);
                    setMovieDetail(data);

                }
            }).catch(err => {
                console.log(err.message);
            })
    }


    // trailerUrl = "" gives defaul empty string value to variables , it they are undefined
    const { trailerUrl = "", posterUrl = "", name = "", description = "", director = "", releaseDate = "", casts = [], _id = "", releaseStatus="", } = movieDetail;


    const buttonText = releaseStatus === "RELEASED" ? "BOOK TICKETS" : "COMING SOON";

    const buttonUrl = releaseStatus === "RELEASED" ? `/buy-Tickets/${name}/${_id}` : "#";



    return (
        <div className='movie-detail bg-light'>
            <Header />

            <div className="">
                <div className="video-player d-flex justify-content-center bg-dark">
                    <ReactPlayer
                        url={trailerUrl}
                        controls
                        className="video"
                        width="100%"
                        height="500px"
                    />

                </div>
                <div className=" container movie-data m-5">
                    <div className="row">
                        <div className="col">
                            <img
                                src={posterUrl}
                                alt="movie poster"
                                className='movie-poster'
                                width="50%"
                            />
                        </div>
                        <div className="col">
                            <h2>{name}</h2>
                            <hr />

                            <h4>{description}</h4>
                            <h5>Directed by : {director}</h5>
                            <h5>Released on : {releaseDate}</h5>
                            <hr />
                            <h4>Casts</h4>
                            {casts.map(cast => {
                                return <h5 key={cast}>{cast}</h5>
                            })}

                            <hr />

                            <Link className='btn btn-danger'
                                to={buttonUrl} >
                                {buttonText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}


export default MovieDetail
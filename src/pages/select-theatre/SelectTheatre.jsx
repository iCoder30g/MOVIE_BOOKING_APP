import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { getMoviesDetail } from '../../api/movies';
import { getAllTheatres } from "../../api/theatres";
import { getTheatresForCurrentMovie } from '../../utils/getTheatre';
import { MdFastfood } from 'react-icons/md'
import { FaMobileAlt } from 'react-icons/fa'

import "./selectTheatre.css"




const SelectTheatre = () => {
    const [movieDetail, setMovieDetail] = useState({});
    const [currentMovieTheatres, setCurrentMovieTheatres] = useState([]);
    const params = useParams();
    const { movieName, movieId } = params;


    useEffect(() => {
        fetchMovieDetail(movieId);
        fetchAllTheatres();
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


    const fetchAllTheatres = () => {
        getAllTheatres()
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    console.log(data);
                    const filteredTheatres = getTheatresForCurrentMovie(
                        data, movieId
                    );
                    setCurrentMovieTheatres(filteredTheatres);
                }
            }).catch(err => {
                console.log(err.message);
            })
    }


    const { trailerUrl = "", posterUrl = "", name = "", description = "", director = "", releaseDate = "", casts = [], _id = "", releaseStatus = "", language,
    } = movieDetail;


    return (
        <div>
            <Header />


            <div className='select-main p-5'>
                <h1>{movieName}</h1>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="movie-tag desc">{description}</div>
                    <div className="movie-tag language">{language}</div>
                    <div className="movie-tag releaseStatus">{releaseStatus}</div>
                </div>

                <hr />
                <div className='text-grey'>
                    <h5>Directed By : {director}</h5>
                    <h5>Release Date : {releaseDate}</h5>
                </div>
            </div>

            <div className=" container theatre-detail gb-light p-5">
                <h2>Select Theatre</h2>

                <div className='theatre-list m-5 '>
                    {currentMovieTheatres.map(theatre => {
                        const { name, _id } = theatre;
                        return (
                            <Link to={`/select-seats/${movieId}/${_id}`} className='theatre-item row p-4'>
                                <h5 className='col-sm-4'>{name}</h5>
                                <h5 className='text-danger col-sm-4'>
                                    <FaMobileAlt className='bi bi-phone-fill text-danger' />
                                    m-Ticket
                                </h5>
                                <h5 className='text-success col-sm-4'>
                                    <MdFastfood />
                                    Food & Beverages
                                </h5>
                            </Link>
                        )
                    })}
                </div>

            </div>


            <Footer />
        </div>
    )
}

export default SelectTheatre;
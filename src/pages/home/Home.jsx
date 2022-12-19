import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header'
import Loader from '../../components/loader/Loader.jsx';
import { getAllMovies } from '../../api/movies';
import Footer from '../../components/footer/Footer';

import ImageCarousel from "../../components/image-carousel/ImageCarousel";
import img1 from "../../assets/1.avif";
import img2 from "../../assets/2.avif";
import img3 from "../../assets/3.avif";
import img4 from "../../assets/4.avif";

import "./home.css"





const Home = () => {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {
    setIsLoading(true);
    getAllMovies()
      .then(res => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          setMovies(data);
          setAllMovies(data)
          setIsLoading(false);
        }
      }).catch(err => {
        console.log(err);
        setIsLoading(false);
      })
  }, []);


  const filterMoviesBySearch = (searchText) => {
    const filteredMovies = allMovies.filter(movie => {
      return (
        movie.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setMovies(filteredMovies);
  }



  const handleGotoDetailPage = (movieId) => {
    navigate(`/movie-detail/${movieId}`);
  }



  return (
    <div>
      <Header filterMoviesBySearch={filterMoviesBySearch} showSearch={true} />

      <ImageCarousel images={[img1, img2, img3, img4]} />



      <div className="container  main-section">
        {isLoading ? (
          <Loader />
        ) : (
          <div className=" row">
            {movies.map(movie => {
              return (
                <div className='col-lg-3 col-md-4 col-sm-6 movie-title'
                  onClick={() => {handleGotoDetailPage(movie._id)}}
                  >
                  <img
                    src={movie.posterUrl}
                    alt="poster"
                    className="image-title"
                  />
                  <h1>{movie.name}</h1>
                </div>
              );
            })}
          </div>
        )}
      </div>





      <Footer />
    </div>
  )
}

export default Home
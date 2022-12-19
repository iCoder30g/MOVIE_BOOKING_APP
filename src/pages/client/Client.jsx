import React from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

import "./client.css"
import TheatresList from '../../components/theaters-list/TheatresList'
import MoviesList from '../../components/movies-list/MoviesList'



const Client = () => {
  const name = localStorage.getItem("name");


  return (
    <div>
      <Header />

      <div className="client-main container bg-light text-dark p-5">
        <h2>Welcome, {name}</h2>
        <h5 className=''>Please check these products below</h5>

        <TheatresList />
        
        <hr />

        <MoviesList />


      </div>

      <Footer />
    </div>

  )
}

export default Client;
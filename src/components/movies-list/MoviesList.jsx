import React from 'react'
import { useState, useEffect } from 'react'
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
// import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Modal } from 'react-bootstrap';

import { getAllMovies, removeMovie, updateMovieDetails } from '../../api/movies';

const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [showMovieEditModal, setShowMovieEditModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    fetchMovies();
  }, [])


  const fetchMovies = () => {
    getAllMovies()
      .then(res => {
        const { status, data, message } = res;
        if (status === 200) {
          console.log({ data });
          setMoviesList(data);
        }
      }).catch(err => {
        console.log(err.message);
      });
    // make API call to fetch the list of movies 
    // if successful, show the list of movies 
  }


  const editMovie = (rowData) => {
    setSelectedMovie({ ...rowData });
    setShowMovieEditModal(true);

  }


  const handleEditMovieSubmit = (e) => {
    updateMovieDetails(selectedMovie._id, selectedMovie)
      .then(res => {
        const { data, status } = res;
        if (status === 200) {
          setErrorMessage("");
          setSelectedMovie({});
          fetchMovies();
          setShowMovieEditModal(false);
        }
      }).catch(err => {
        console.log(err.message);
        setErrorMessage(err.message);
      })

    e.preventDefault();
  }


  const handleMovieEdit = (e) => {
    const tempMovie = { ...selectedMovie };

    if (e.target.name === "name") {
      tempMovie.name = e.target.value;
    } else if (e.target.name === "releaseDate") {
      tempMovie.releaseDate = e.target.value;
    } else if (e.target.name === "releaseStatus") {
      tempMovie.releaseStatus = e.target.value;
    } else if (e.target.name === "director") {
      tempMovie.director = e.target.value;
    } else if (e.target.name === "description") {
      tempMovie.description = e.target.value;
    }
    setSelectedMovie(tempMovie);
  }



  /*
  const deleteMovie = (rowData) => {
    console.log(rowData);
     const movieId = rowData._id;
     removeMovie(movieId)
     .then(res => {
      console.log(res);
      if(res.status === 200) {
        fetchMovies();
      }
  
     }).catch(err => {
      console.log(err);
     })
  }
  */




  return (
    <div className='m-5'>

      <MaterialTable
        data={moviesList}
        title="MOVIES LIST"

        columns={[
          {
            title: "Movie Name",
            field: "name"
          },
          {
            title: "Release Date",
            field: "releaseDate"
          },
          {
            title: "Release Status",
            field: "releaseStatus"
          },
          {
            title: "Director",
            field: "director"
          },
          {
            title: "Description",
            field: "description"
          },

        ]}

        options={{
          actionsColumnIndex: -1,
          sorting: true,
          filtering: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Movies Records"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Movies Records"),
            },
          ],

          headerStyle: {
            backgroundColor: "#202429",
            color: "#fff",
          },
          rowStyle: {
            backgroundColor: "#EEE",
          },
        }}

        actions={[
          {
            icon: Edit,
            tooltip: "Edit Movie",
            onClick: (event, rowData) => editMovie(rowData),
          },
          /**
          {
            icon: Delete,
            tooltip: "Delete Movie",
            onClick: (event, rowData) => deleteMovie(rowData),
          },
           */
        ]}

      />

      {showMovieEditModal && (
        <Modal
          show={showMovieEditModal}
          onHide={() => {
            setErrorMessage("");
            setShowMovieEditModal(false);
          }}
          backdrop="static"
          keyboard={false}
          centered
        >

          <Modal.Header closeButton>
            <Modal.Title>EDIT MOVIE</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <h5>Movie Id : {selectedMovie._id}</h5>
            </div>

            <hr />

            <form onSubmit={handleEditMovieSubmit}>
              <div className="input-group">
                <label>
                  Movie Name:
                  <input
                    type="text"
                    name="name"
                    className='form-control m-1'
                    value={selectedMovie.name}
                    onChange={handleMovieEdit} />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Release Date:
                  <input
                    type="text"
                    name="releaseDate"
                    className='form-control m-1'
                    value={selectedMovie.releaseDate}
                    onChange={handleMovieEdit} />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Release Status:
                  <input
                    type="text"
                    name="releaseStatus"
                    className='form-control m-1'
                    value={selectedMovie.releaseStatus}
                    onChange={handleMovieEdit} />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    className='form-control m-1'
                    value={selectedMovie.description}
                    onChange={handleMovieEdit} />
                </label>
              </div>

              <div className='input-group'>
                <button type='button' className='btn btn-secondary form-control m-1' onClick={() => {
                  setErrorMessage("")
                  setShowMovieEditModal(false)
                }}>Cancel
                </button>

                <button type='submit' className='btn btn-primary form-control m-1'>Update</button>
              </div>

              {errorMessage && (<div className='text-danger'>{errorMessage}</div>)}

            </form>

          </Modal.Body>

        </Modal>
      )}

    </div>
  )
}

export default MoviesList
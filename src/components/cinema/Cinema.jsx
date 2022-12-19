import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { TICKET_PRICE } from '../../constants/config';
import { getSeatNumber, getTheatre2DRepresentation } from '../../utils/makeTheatre';
import Seat from '../seat/Seat';
import SelectedSeats from '../selectedSeats/SelectedSeats';

import "./cinema.css"



const Cinema = (props) => {
  const { createBooking, selectedSeats, setSelectedSeats, occupiedSeats } = props;

  const [cinemaState, setCinemaState] = useState(
    getTheatre2DRepresentation(selectedSeats, occupiedSeats));


  useEffect(() => {
    const newState = getTheatre2DRepresentation(selectedSeats, occupiedSeats);
    setCinemaState(newState);
  }, [selectedSeats, occupiedSeats])


  const handleSelectSeat = (rowIndex, colIndex) => {
    const currentStatus = cinemaState[rowIndex][colIndex];
    let finalStatus = "";
    const tempSelectedSeats = [...selectedSeats];
    const seatNo = getSeatNumber(rowIndex, colIndex);

    if (currentStatus === "available") {
      finalStatus = "selected";
      tempSelectedSeats.push(seatNo);
    } else if (currentStatus === "selected") {
      finalStatus = "available";

      const seatIndex = tempSelectedSeats.indexOf(seatNo);
      tempSelectedSeats.splice(seatIndex, 1);
    } else {
      finalStatus = "occupied";
    }

    const tempState = [...cinemaState];
    tempState[rowIndex][colIndex] = finalStatus
    setCinemaState(tempState);
    setSelectedSeats(tempSelectedSeats);

  }


  const handleProceedToPayment = () => {
    createBooking();
  }




  return (
    <div>

      <div className="my-3">
        {cinemaState.map((cinemaRow, rowIndex) => {
          return (
            <div className='cinema-main d-flex justify-content-center align-items-center'>
              <div className="cinema-row row">

                {
                  cinemaRow.map((cinemaCol, colIndex) => {

                    const classNm = colIndex === 2 || colIndex === 6 ? "col-sm-1 offset-sm-1" : "col-sm-1"

                    return (
                      <div className={classNm} onClick={() => {
                        handleSelectSeat(rowIndex, colIndex)
                      }} >
                        <Seat seatStatus={cinemaCol} />
                      </div>
                    )
                  })
                }


              </div>
            </div>
          )
        })}
      </div>

      
        <SelectedSeats
          selectedSeatsCount={selectedSeats.length}
          price={TICKET_PRICE}
        />


        <button
          className='btn btn-danger'
          disabled={selectedSeats.length === 0}
          onClick={handleProceedToPayment}
        >
          Proceed To Payment
        </button>



    </div>



  )
}

export default Cinema;
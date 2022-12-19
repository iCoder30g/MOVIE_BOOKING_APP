import React from 'react';



const SelectedSeats = (props) => {
    const { selectedSeatsCount, price } = props;


    return (
        
        selectedSeatsCount > 0 && (
            <div className=' p-4 text-light'>
                <span>
                    You Have Selected
                    <span className='text-info'> {selectedSeatsCount} </span> seats,
                    Total amount is Rs.
                    <span className="text-info"> {price * selectedSeatsCount} </span>.

                </span>
            </div>
        )

    )
}

export default SelectedSeats;
import { SEAT_ROWS, SEAT_COLS } from "../constants/config";



export const getSeatNumber = (rowIndex, colIndex) => {
    return rowIndex * SEAT_ROWS + colIndex + 1;
}


export const getTheatre2DRepresentation = (selectedSeats = [], occupiedSeats = []) => {
    const seats = [];

    for (let row = 0; row < SEAT_ROWS; row++) {
        const rowArr = [];

        for (let col = 0; col < SEAT_COLS; col++) {
            const seatNo = getSeatNumber(row, col);

            if (occupiedSeats.includes(seatNo)) {
                rowArr.push("occupied")
            } else if (selectedSeats.includes(seatNo)) {
                rowArr.push("selected")
            }
            else {
                rowArr.push("available");
            }

        }

        seats.push(rowArr);
    }

    return seats;
}
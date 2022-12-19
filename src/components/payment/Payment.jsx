import React from 'react'
import { Modal } from 'react-bootstrap';
import { TICKET_PRICE } from '../../constants/config';
import Successful from "../../assets/simpson.gif";



const Payment = (props) => {
    const {
        confirmationModal,
        setConfirmationModal = () => { },
        selectedSeats = [],
        movieName,
        theatreName,
        handleConfirmPayment,
        paymentSuccessful,
        setPaymentSuccessful,
        handlePostPayment,
    } = props;




    return (
        <div>
            {confirmationModal && (
                <Modal
                    show={confirmationModal}
                    onHide={() => {
                        setConfirmationModal(false);
                        setPaymentSuccessful(false);
                    }}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className='p-2'>
                                {paymentSuccessful ? "Congratulations! Booking Confirmed!!" : "Please conFirm Your Booking Details"}
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        {paymentSuccessful && (
                            <div className='d-flex justify-content-center align-items-center '>
                                <div className="payment-successful ">
                                    <img alt='Sussessful' src={Successful} />
                                    <hr />
                                </div>
                            </div>
                        )}

                        <div className="row p-2">
                            <div className="col sm-4">Movie Name :</div>
                            <div className="col sm-8">{movieName}</div>
                        </div>
                        <div className="row p-2">
                            <div className="col sm-4">Thetre Name :</div>
                            <div className="col sm-8">{theatreName}</div>
                        </div>
                        <div className="row p-2">
                            <div className="col sm-4">Selected Seats: </div>
                            <div className="col sm-8">{selectedSeats.join(",")} (Total {selectedSeats.length} Seats Selected)
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col sm-4">Total Price : </div>
                            <div className="col sm-8"> Rs :
                                {TICKET_PRICE * selectedSeats.length}
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {!paymentSuccessful && (
                            <div className='input-group'>
                                <butten className="btn btn-secondary form-control m-1"
                                    onClick={() => {
                                        setConfirmationModal(false)
                                        setPaymentSuccessful(false)
                                    }}>Cancel
                                </butten>
                                <butten className="btn btn-danger form-control m-1"
                                    onClick={handleConfirmPayment}
                                >Confirm
                                </butten>
                            </div>
                        )}

                        {paymentSuccessful && (
                            <div className='input-group'>
                                <butten className="btn btn-danger form-control m-1"
                                    onClick={() => {
                                        handlePostPayment();
                                    }}>Close
                                </butten>
                            </div>
                        )}

                    </Modal.Footer>


                </Modal>
            )}
        </div>
    )
}

export default Payment;
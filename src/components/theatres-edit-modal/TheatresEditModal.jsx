import React from 'react'
import { Modal } from 'react-bootstrap';



const TheatreEditModal = (props) => {
    const {
        showEditModal,
        setShowEditModal,
        setErrorMessage,
        selectedTheatre,
        handleEditTheatreSubmit,
        handleTheatreChange,
        errorMessage,
    } = props;

    return (
        <Modal
            show={showEditModal}
            onHide={() => {
                setShowEditModal(false)
                setErrorMessage("")
            }}
            backdrop="ststis"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>EDIT THEATRE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5>Theatre Id : {selectedTheatre._id}</h5>
                </div>
                <hr />
                <form onSubmit={handleEditTheatreSubmit}>
                    <div className='input-group'>
                        <label>
                            Theatre Name
                            <input
                                type="text"
                                name='name'
                                className='form-control m-1'
                                value={selectedTheatre.name}
                                onChange={handleTheatreChange}
                            />
                        </label>
                    </div>
                    <div className='input-group'>
                        <label>
                            Theatre City
                            <input
                                type="text"
                                name='city'
                                className='form-control m-1'
                                value={selectedTheatre.city}
                                onChange={handleTheatreChange}
                            />
                        </label>
                    </div>
                    <div className='input-group'>
                        <label>
                            Theatre PinCode
                            <input
                                type="text"
                                name='pinCode'
                                className='form-control m-1'
                                value={selectedTheatre.pinCode}
                                onChange={handleTheatreChange}
                            />
                        </label>
                    </div>
                    <div className='input-group'>
                        <label>
                            Theatre Description
                            <textarea
                                name='description'
                                className='form-control m-1'
                                onChange={handleTheatreChange}
                            >
                                {selectedTheatre.description}
                            </textarea>
                        </label>
                    </div>
                    <div className='input-group'>
                        <button type='button' className='btn btn-secondary form-control m-1' onClick={() => {
                            setErrorMessage("")
                            setShowEditModal(false)
                        }}>Cancel
                        </button>

                        <button type='submit' className='btn btn-primary form-control m-1'>Update</button>
                    </div>
                </form>

                {errorMessage && (<div className='text-danger'>{errorMessage}</div>)}
            </Modal.Body>
        </Modal>
    )
}

export default TheatreEditModal;
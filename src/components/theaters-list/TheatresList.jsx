import React from 'react'
import { useState, useEffect } from 'react'
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { getAllTheatres, updateTheatre } from '../../api/theatres';
import TheatreEditModal from '../theatres-edit-modal/TheatresEditModal';





const TheatresList = () => {
  const [theatresList, setTheatresList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {
    // api call to fetch Theaters List
    fetTheatres();
  }, []);


  const fetTheatres = () => {
    getAllTheatres()
      .then((res) => {
        const { data, status, message } = res;
        if (status === 200) {
          console.log(data)
          // on success of data, set into state
          setTheatresList(data);
        }
      }).catch((err) => {
        console.log(err)
      })
  }


  const deleteTheatre = (rowData) => {
    const { _id: theatreId } = rowData;
    // const theatreId = rowData._id;
    const theatresListUpdated = theatresList.filter(theatre => {
      const { _id } = theatre;
      return _id !== theatreId;
    });
    setTheatresList(theatresListUpdated);
  }


  const editTheatre = (rowData) => {
    setSelectedTheatre({ ...rowData });
    setShowEditModal(true);
  }


  const handleTheatreChange = (e) => {
    const tempTheatre = { ...selectedTheatre };

    if (e.target.name === "name") {
      tempTheatre.name = e.target.value;
    } else if (e.target.name === "city") {
      tempTheatre.city = e.target.value;
    } else if (e.target.name === "pinCode") {
      tempTheatre.pinCode = e.target.value;
    } else if (e.target.name === "description") {
      tempTheatre.description = e.target.value;
    }
    setSelectedTheatre(tempTheatre);
  }


  const handleEditTheatreSubmit = (e) => {
    const id = selectedTheatre._id;
    // api call to save the theatre data 
    try {
      updateTheatre(id, selectedTheatre)
        .then(res => {
          const { message, status } = res;
          if (status === 200) {
            setSelectedTheatre({});
            setShowEditModal(false);
            setErrorMessage("");
            fetTheatres();
          } else if (message) {
            setErrorMessage(message);
          }
        }).catch(err => {
          setErrorMessage(err.message);
        })
    } catch (err) {
      setErrorMessage(err.message)
    }
    // send the ID and theatre data 
    // onSuccess of Save, close the modal 
    // fetch the Theatre list again 
    // on error, show the error 
    e.preventDefault();
  }




  // return a material table with all the data of theaters list 
  return (
    <div className='m-5'>
      <MaterialTable
        data={theatresList}
        title="THEATRES LIST"
        columns={[
          {
            title: "Theatre Name",
            field: "name"
          },
          {
            title: "Theatre ID",
            field: "_id"
          },
          {
            title: "Description",
            field: "description"
          },
          {
            title: "PinCode",
            field: "pinCode"
          },
          {
            title: "City",
            field: "city"
          },

        ]}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Theatre",
            onClick: (event, rowData) => editTheatre(rowData),
          },
          {
            icon: Delete,
            tooltip: "Delete Theater",
            onClick: (event, rowData) => deleteTheatre(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
          filtering: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Theatre Records"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Theatre Records"),
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
      />

      {showEditModal && (
        <TheatreEditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          setErrorMessage={setErrorMessage}
          selectedTheatre={selectedTheatre}
          handleEditTheatreSubmit={handleEditTheatreSubmit}
          handleTheatreChange={handleTheatreChange}
          errorMessage={errorMessage}
        />
      )
      }


    </div>
  )
}

export default TheatresList;
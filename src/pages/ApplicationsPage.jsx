import Table from "../components/Table";
import { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getDocs, collection, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const ApplicationsPage = () => {

  const columns = [
    { field: 'col1', headerName: 'ID', flex: 1, headerAlign: 'left' },
    { field: 'col2', headerName: 'Name', flex: 1, headerAlign: 'left' },
    { field: 'col3', headerName: 'Status', flex: 1, headerAlign: 'left' },
    { field: 'col5', headerName: 'Actions', flex: 1, headerAlign: 'left', renderCell: (cellValues) => {
      return (
        <Stack direction="row" spacing={2}> 
        <Button
          variant='contained'
          onClick={(event) => {
            handleOpen(event, cellValues.row)
          }}
        >
          Update
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={(event) => {
          handleAlertClick(event, cellValues.row);
        }}
        >
          Delete
        </Button>
      </Stack>
      );
    } }
  ];
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(0);
  const handleAlertClick = (event, row) => {
    setAlertOpen(true);
    setSelectedDocId(row['col1']);
    setCurrentDocId(row.id);
  }
  const handleUserDeletion = async(event) => {
    console.log(selectedDocId);
    event.stopPropagation();
    const ref = doc(db, `test/${selectedDocId}`);
    const query = await deleteDoc(ref);
    setRowData((prevPosts) => prevPosts.filter((_, index) => index != currentDocId ));
    setAlertOpen(false);
  }

  const [open, setOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [selectedDoc, setSelectedDoc] = useState([{'temp': 'temp'}]);

  const handleOpen = async (event, row) => {
    setSelectedDocId(row['col1']);
    setSelectedDoc(allDocuments[row['id']][row['col1']]);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setAlertOpen(false);
    setSelectedDocId('');
    setCurrentDocId(0);
  };
  
  const [updatedValues, setUpdatedValues] = useState({});
  const updateDocument = async(event) => {
    console.log(updatedValues);
    const docRef = doc(db, `test/${selectedDocId}`);
    await setDoc(docRef, updatedValues, { merge:true });
    setOpen(false);
    if (updatedValues != {}) {
      fetchData();
    }
    setUpdatedValues({});
    
  }

  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allDocuments, setAllDocuments] = useState([]);

  const fetchData = async () => {
    
    const ref = collection(db, "test"); //Temporary database with similar structure. Switch to applications in the final version
    const querySnapshot = await getDocs(ref);
    const arr = [];
    const documents = [];
    var counter = 0;
    querySnapshot.forEach((doc) => {
      arr.push({
        id: counter, col1: doc.id, col2: doc.get('name'), col3: doc.get('status')
      });
      counter += 1;
      var obj = {};
      var docData = doc.data();
      obj[doc.id] = docData
      documents.push(obj);
      console.log(doc.data());
    });
    console.log(arr);
    setRowData(arr);
    setAllDocuments(documents);
    setLoading(false);
  };
   
    useEffect(()=>{
      fetchData();
    }, [])

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
  <div> 
    <Table rows={rowData} columns ={columns}/> 
    
    {/* Alert Form Dialog */}
    
    <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUserDeletion} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    {/* Update Form Dialog */}
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Form</DialogTitle>
        <DialogContent>
          {Object.keys(selectedDoc).sort().map((key) => {
            if (typeof selectedDoc[key] == 'object') {
              return Object.keys(selectedDoc[key]).map((innerKey) => {
                return (<TextField 
                  autoFocus
                  margin="dense"
                  key={`${key}/${innerKey}`}
                  id={`${key}/${innerKey}`}
                  label={`${key}/${innerKey}`}
                  fullWidth
                  variant="standard"
                  defaultValue={selectedDoc[key][innerKey]}
                  onChange={e => {
                    var tempObject = updatedValues;
                    tempObject[key] = {...tempObject[key]};
                    tempObject[key][innerKey] = e.target.value;
                    setUpdatedValues(tempObject);
                  }}
                />)
                })
              }
            else {
              return (<TextField 
                autoFocus
                margin="dense"
                key={key}
                id={key}
                label={key}
                fullWidth
                variant="standard"
                defaultValue={selectedDoc[key]}
                onChange={e => {
                  var tempObject = updatedValues;
                  tempObject[key] = e.target.value;
                  setUpdatedValues(tempObject);
                }}
              />)
            }
            
          })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateDocument}>Confirm</Button>
        </DialogActions>
      </Dialog>
  </div>
  );
};

export default ApplicationsPage;
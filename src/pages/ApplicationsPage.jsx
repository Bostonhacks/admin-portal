import Table from "../components/Table";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const columns = [
  { field: 'col1', headerName: 'ID', flex: 1, headerAlign: 'left' },
  { field: 'col2', headerName: 'Name', flex: 1, headerAlign: 'left' },
  { field: 'col3', headerName: 'Status', flex: 1, headerAlign: 'left' },
  { field: 'col4', headerName: 'Actions', flex: 1, headerAlign: 'left' }
];

const ApplicationsPage = () => {

  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    
    const ref = collection(db, "test"); //Temporary database with similar structure. Switch to applications in the final version
    const querySnapshot = await getDocs(ref);
    const arr = [];
    var counter = 0;
    querySnapshot.forEach((doc) => {
      arr.push({
        id: counter, col1: doc.id, col2: doc.get('name'), col3: doc.get('status')
      });
      counter += 1;
    });
    console.log(arr);
    setRowData(arr);
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
  <div> <Table rows={rowData} columns ={columns}/> </div>
  );
};

export default ApplicationsPage;
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
// export function dummyData() {
//   return [];
// }

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */


const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'ID', flex: 1, headerAlign: 'center' },
  { field: 'col2', headerName: 'Name', flex: 1, headerAlign: 'center' },
  { field: 'col3', headerName: 'Status', flex: 1, headerAlign: 'center' },
  { field: 'col4', headerName: 'Actions', flex: 1, headerAlign: 'center' }
];

const Table = () => {

  return (
    <div style={{ height: 300, width: '100%' }} className="justify-self-center">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default Table;
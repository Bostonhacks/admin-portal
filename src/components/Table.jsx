import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({rows, columns}) => {
    return (
      <div style={{ height: '80%', width: '100%' }} className="justify-self-center">
        <DataGrid rows={rows} columns={columns} />
      </div>
    );
}

export default Table;
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import { Edit, AddBox, Check, Clear, Delete } from "@material-ui/icons";

const StockTable = (props) => {
  const rows = (data) => {
    if (data) {
      return data.map((rowInfo, index) => row(rowInfo, index));
    }
    return null;
  };
  const row = (rowInfo, index) => {
    const currentindex = props.currentRowIndex === index;
    return (
      <TableRow key={index}>
        {currentindex ? (
          <React.Fragment>
            <TableCell colSpan={2} style={{fontSize:'20px',fontWeight:"bold",letterSpacing:"1.5px"}} >Are you sure you want to delete this Stock?</TableCell>
            <TableCell align="right">
              <IconButton style={{color:"black"}} onClick={props.deleteStock} >
                <Check />
              </IconButton>
              <IconButton style={{color:"black"}} onClick={props.onDeleteClearStockTable}>
                <Clear />
              </IconButton>
            </TableCell>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TableCell>{rowInfo.id}</TableCell>
            <TableCell>{rowInfo.name}</TableCell>
            <TableCell align="right">
              <IconButton
                onClick={() => props.onEditRawMaterial({ ...rowInfo })}
                style={{ color: "black" }}
              >
                <Edit />
              </IconButton>
              <IconButton style={{ color: "black" }} onClick={() => props.onDeleteFlagChanged(index,rowInfo.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </React.Fragment>
        )}
      </TableRow>
    );
  };
  return (
    <div className="col">
      <TableContainer component={Paper}>
        <div style={{ float: "right", margin: "10px" }}>
          <IconButton color="primary" onClick={props.onAddRawMaterial}>
            <AddBox fontSize="large" />
          </IconButton>
        </div>

        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> ID </TableCell>
              <TableCell> Name </TableCell>
              <TableCell align="right">OPTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows(props.data)}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockTable;

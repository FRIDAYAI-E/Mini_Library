import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { add } from 'date-fns'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DCDCDC",
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    
  },
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

const UserDueTable = ({ loanData }) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title </StyledTableCell>
            <StyledTableCell align="center">Due Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loanData.map((book, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {book.bookID.title}
              </StyledTableCell>
              {new Date() < new Date(add(new Date(book.dateBorrowed), {days: 7,})) ? (
                <StyledTableCell align="center" sx={{ color: "black" }}>
                  {format(new Date(add(new Date(book.dateBorrowed), {days: 7,})), "EEEE, MMMM do, yyyy")}
                </StyledTableCell>
              ) : (
                <StyledTableCell align="center" sx={{ color: "red" }}>
                  BOOK DUE : {format(new Date(add(new Date(book.dateBorrowed), {days: 7,})), "EEEE, MMMM do, yyyy")}
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

UserDueTable.propTypes = {
  loanData: PropTypes.array,
};

export default UserDueTable;

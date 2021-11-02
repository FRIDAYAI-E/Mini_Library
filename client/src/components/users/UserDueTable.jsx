import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));

// function createData(name, dateBorrowed, ) {
//   return { name, dateBorrowed, };
// }

// const rows = [
//   createData('Adventure Chicken', "15/9/2021",),
//   createData('Adventure Duck', "21/9/2021",),
//   createData('Adventure Potato', "23/9/2021",),
//   createData('Adventure Nugget', "18/12/2021",),
//   createData('Adventure Sandwich', "24/10/2021",),
// ];

 const UserDueTable = ({loanData}) => {
  // console.log("props", loanData[0].bookID)
  // const loanData = props.loanData
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
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
                {book.bookID}
              </StyledTableCell>
              <StyledTableCell align="center">{book.dateBorrowed}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UserDueTable.propTypes = {
  loanData: PropTypes.array
};


export default UserDueTable;
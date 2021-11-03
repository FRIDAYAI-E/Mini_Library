import React from "react";
import PropTypes from "prop-types";
// import format from "date-fns/format";
import { intervalToDuration } from "date-fns";

function UserFines({ loanData }) {

  let totalFineAmount = 0;
  const calculateFineAmount = (dateReturned) => {
    const result = intervalToDuration({
      start: new Date(),
      end: new Date(dateReturned),
    });
    // console.log("time difference result", result.days);
    const fineAmount = result.days * 0.2;
    // console.log(fineAmount);
    return fineAmount;
  };

  loanData.map((book) => {
    // const dateBorrow = book.dateBorrowed;
    const dateReturn = book.dateReturned;
    if (new Date(dateReturn) < new Date()) {
      totalFineAmount = totalFineAmount + calculateFineAmount(dateReturn);
      return totalFineAmount;
    } 
  });
//   console.log("fine", totalFineAmount)

  return (
    <div>
      <h3>Fines! : ${totalFineAmount.toFixed(2)}</h3>
    </div>
  );
}
UserFines.propTypes = {
  loanData: PropTypes.array,
};

export default UserFines;

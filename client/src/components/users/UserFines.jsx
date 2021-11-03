import React from "react";
import PropTypes from "prop-types";
import { intervalToDuration } from "date-fns";

function UserFines({ loanData }) {

  let totalFineAmount = 0;
  const calculateFineAmount = (dateReturned) => {
    const result = intervalToDuration({
      start: new Date(),
      end: new Date(dateReturned),
    });
    const fineAmount = result.days * 0.2;
    return fineAmount;
  };

  loanData.map((book) => {
    const dateReturn = book.dateReturned;
    if (new Date(dateReturn) < new Date()) {
      totalFineAmount = totalFineAmount + calculateFineAmount(dateReturn);
      return totalFineAmount;
    } 
  });

  return (
    <div >
      <h5 className="specialFont">Fines! : ${totalFineAmount.toFixed(2)}</h5>
    </div>
  );
}
UserFines.propTypes = {
  loanData: PropTypes.array,
};

export default UserFines;

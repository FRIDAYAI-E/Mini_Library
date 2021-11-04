import React from "react";
import PropTypes from "prop-types";
import { intervalToDuration } from "date-fns";
import { add } from 'date-fns'


function UserFines({ loanData }) {
  let totalFineAmount = 0;
  const calculateFineAmount = (dueDate) => {
    const result = intervalToDuration({
      start: new Date(),
      end: new Date(dueDate),
    });
    const fineAmount = result.days * 0.2;
    return fineAmount;
  };

  loanData.map((book) => {
    const dueDate = add(new Date(book.dateBorrowed), {days: 7,})
    if (new Date(dueDate) < new Date()) {
      totalFineAmount = totalFineAmount + calculateFineAmount(dueDate);
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

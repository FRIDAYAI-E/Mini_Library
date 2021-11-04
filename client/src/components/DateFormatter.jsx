import React from "react";
import formatter from "date-fns/format";

const DateFormatter = (props) => {
  const { date, format } = props;
  return <span>{formatter(date, format)}</span>;
};

export default DateFormatter;

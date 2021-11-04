import React from "react";
import numbro from "numbro";

const NumberFormatter = (props) => {
  const { inputVal, thousandsSeperated, decimalPlaces } = props;
  return (
    <span>
      {numbro(inputVal).format({
        thousandSeparated: thousandsSeperated,
        mantissa: decimalPlaces,
      })}
    </span>
  );
};

export default NumberFormatter;

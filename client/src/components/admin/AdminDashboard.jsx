import React from "react";
// import { useHistory } from "react-router";
import Navbar from "../Navbar";
import { Box, Button } from "@mui/material";
import TableComponent from "../TableComponent";
import faker from "faker";
// import NumberFormatter from "../NumberFormatter";
// import DateFormatter from "../DateFormatter";

const AdminDashboard = () => {
  const genre = ["Classics ", "Adventure", "Reference", "Mystery"];
  const genDemodata = (num) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      const totalbooks = faker.datatype.number(10);
      const loaned = faker.datatype.number(totalbooks);
      const available = totalbooks - loaned;
      arr.push({
        id: i,
        title: faker.lorem.words(Math.ceil(Math.random() * 7)),
        genre: genre[Math.floor(Math.random() * genre.length)],
        timesBorrowed: faker.datatype.number(1000),
        available: available,
        loaned: loaned,
        totalbooks: totalbooks,
      });
    }
    return arr;
  };

  const columns = [
    {
      field: "title",
      title: "Title",
      align: "justify",
      defaultSort: "desc",
    },
    {
      field: "genre",
      title: "Genre",
      align: "justify",
    },
    {
      field: "timesBorrowed",
      title: "Times Borrowed",
      align: "center",
    },
    {
      field: "available",
      title: "Available",
      align: "center",
    },
    {
      field: "loaned",
      title: "Loaned",
      align: "center",
    },
    {
      field: "collectionTotal",
      title: "Collection Total",
      align: "center",
    },
  ];
  // let history = useHistory();
  const clickHandler = (e, rowData) => {
    console.log("Row click", rowData);
    // history.push("/");
  };
  return (
    <div>
      <Navbar />
      <Box>
        <Button variant="contained">Manage Books</Button>
        <Button variant="contained">Manage Returns</Button>
      </Box>
      <Box>
        <TableComponent
          title="Books Overview"
          columns={columns}
          data={genDemodata(20)}
          options={{ pageSize: 10 }}
          click={clickHandler}
        />
      </Box>
      {/* <NumberFormatter
        inputVal={100000}
        thousandsSeperated={true}
        decimalPlaces={2}
      />
      <div>
        <DateFormatter date={new Date()} format="dd-MMM-yyyy" />
      </div> */}
    </div>
  );
};

export default AdminDashboard;

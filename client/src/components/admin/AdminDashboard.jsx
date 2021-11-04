import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import { Box, Button } from "@mui/material";
import TableComponent from "../TableComponent";
// import faker from "faker";
// import NumberFormatter from "../NumberFormatter";
// import DateFormatter from "../DateFormatter";

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
    field: "qty",
    title: "Collection Total",
    align: "center",
  },
];

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/api/admin/dashboard");
      const data = res.data.map((d) => ({
        title: d.title,
        genre: d.genre,
        timesBorrowed: d.timesBorrowed,
        available: d.available,
        loaned: d.loaned,
        qty: d.qty,
      }));
      setBooks(data);
    };
    getBooks();
  }, []);

  // const genre = ["Classics ", "Adventure", "Reference", "Mystery"];
  // const genDemodata = (num) => {
  //   const arr = [];
  //   for (let i = 0; i < num; i++) {
  //     const totalbooks = faker.datatype.number(10);
  //     const loaned = faker.datatype.number(totalbooks);
  //     const available = totalbooks - loaned;
  //     arr.push({
  //       id: i,
  //       title: faker.lorem.words(Math.ceil(Math.random() * 7)),
  //       genre: genre[Math.floor(Math.random() * genre.length)],
  //       timesBorrowed: faker.datatype.number(1000),
  //       available: available,
  //       loaned: loaned,
  //       totalbooks: totalbooks,
  //     });
  //   }
  //   return arr;
  // };

  let history = useHistory();
  const clickRowHandler = (e, rowData) => {
    console.log("Row click", rowData);
    // history.push("/");
  };

  return (
    <div>
      <Navbar />
      <Box position="flex">
        <Button
          onClick={() => {
            history.push("/admin/managebooks");
          }}
          variant="contained"
        >
          Manage Books
        </Button>
        <Button
          onClick={() => {
            history.push("/admin/managereturns");
          }}
          variant="contained"
        >
          Manage Returns
        </Button>
      </Box>
      <Box>
        <TableComponent
          title="Books Overview"
          columns={columns}
          data={books}
          options={{
            pageSize: 10,
            rowStyle: {
              fontSize: 15,
            },
          }}
          click={clickRowHandler}
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

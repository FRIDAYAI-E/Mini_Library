import React from "react";
import Navbar from "../Navbar";
import MaterialTable from "@material-table/core";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Info from "@material-ui/icons/Info";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { sessionAtom } from "../LoginPage";

export const arrAtom = atom([]);

function BrowseBooks() {
  const tableIcons = {
    Add: AddBox,
    Check: Check,
    Clear: Clear,
    DetailPanel: ChevronRight,
    Edit: Edit,
    Filter: ExpandMore,
    FirstPage: FirstPage,
    Info: Info,
    LastPage: LastPage,
    NextPage: ChevronRight,
    PreviousPage: ChevronLeft,
    ResetSearch: Clear,
    Search: Search,
    SortArrow: ArrowUpward,
    ThirdStateCheck: Remove,
    ViewColumn: ViewColumn,
  };
  const [status, setStatus] = useState("pending");
  const [bookData, setBookData] = useState();
  const [bookSelection, setBookSelection] = useAtom(arrAtom);

  if (bookSelection) {
    null;
  } // empty code to prevent errors

  const data = useAtom(sessionAtom)[0];
  // console.log("atom", data)
  let history = useHistory();

  const isAuthenticated = () => {
    if (data.loginUser === undefined) {
      history.push("/login");
    }
  };
  isAuthenticated();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/browsebooks`);
        setStatus("loading");
        setBookData(response.data);
        setStatus("resolved");
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, []);

  const handleRowClick = (event, rowData) => {
    history.push(`/browseBooks/${rowData._id}`);
    setBookSelection(rowData);
  };

  return (
    <>
      <Navbar />
      {status === "resolved" ? (
        <div>
          <MaterialTable
            style={{ boxShadow: "none", marginBottom: "3%" }}
            icons={tableIcons}
            onRowClick={handleRowClick}
            columns={[
              {
                title: "Title",
                field: "title",
                align: "left",
              },
              {
                title: "Genre",
                field: "genre",
                align: "justify",
              },
              { title: "Author", field: "author", align: "justify" },
              {
                title: "Availability",
                field: "availability",
                align: "justify",
                cellStyle: 
                (e, rowData)=> {
                  if (rowData.availability === "unavailable") { return {color:"red", textTransform:"capitalize" }}
                  else if (rowData.availability === "available")  {return {color:"green", textTransform:"capitalize" }}
                },
                defaultSort: "asc",
                } 
            ]}
            title="aLibrary"
            data={bookData}
            options={{
              pageSize: 10,
              pageSizeOptions: [5, 10, 20],
              draggable: false,
              maxBodyHeight: "100vh",
              tableLayout: "auto",
              showFirstLastPageButtons: false,
              rowStyle: {
                fontSize: 12,
              },
              headerStyle: {
                position: "sticky",
                height: 0,
                background: "#DCDCDC",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      ) : null}
    </>
  );
}

export default BrowseBooks;

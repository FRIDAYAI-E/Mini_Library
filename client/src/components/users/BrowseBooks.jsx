import React from "react";
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

    const BookData = [{
      title: " adventure chicken",
      genre: "fiction",
      rating: 4,
      author: "mr chicken",
      availability: "yes"
    },
    {
      title: " adventure duck",
      genre: "fiction",
      rating: 1,
      author: "mr duck",
      availability: "no"
    },{
      title: " adventure potato",
      genre: "fiction",
      rating: 2,
      author: "mr potato",
      availability: "yes"
    },]

  return (
    <>
      <div>
        <MaterialTable
          style={{ boxShadow: "none", marginBottom: "3%" }}
          icons={tableIcons}
          columns={[
            {
              title: "Title",
              field: "title",
              align: "justify",
              defaultSort: "desc",
            },
            {
              title: "Genre",
              field: "genre",
              align: "justify",
            },
            {
              title: "Rating",
              field: "rating",
            },
            { title: "Author", field: "author", align: "justify" },
            {
              title: "Availability",
              field: "availability",
              align: "justify",
            },
          ]}
          title="Browse Books"
          data = {BookData}
          options={{
            filtering: true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 50],
            thirdSortClick: false,
            draggable: false,
            maxBodyHeight: "70vh",
            tableLayout: "auto",
            showFirstLastPageButtons: false,
            headerStyle: {
              position: "sticky",
              height: 0,
              background: "white",
            },
          }}
        />
      </div>
    </>
  );
}

export default BrowseBooks;
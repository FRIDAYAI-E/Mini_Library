import React from "react";
import MaterialTable from "@material-table/core";
import {
  AddBox,
  ChevronLeft,
  ChevronRight,
  ArrowUpward,
  Check,
  Clear,
  Edit,
  ExpandMore,
  FirstPage,
  LastPage,
  Remove,
  Search,
  ViewColumn,
  Info,
} from "@material-ui/icons";

const TableComponent = (props) => {
  const { id, title, columns, icons, options, data, click } = props;
  const tableIcons = icons ?? {
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

  const tableOptions = {
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
    ...options,
  };

  const rowClick = click ?? "";

  return (
    <MaterialTable
      id={id}
      style={{ boxShadow: "none", marginBottom: "3%" }}
      icons={tableIcons}
      columns={columns}
      data={data}
      options={tableOptions}
      title={title}
      onRowClick={rowClick}
    ></MaterialTable>
  );
};

TableComponent.propTypes;

export default TableComponent;

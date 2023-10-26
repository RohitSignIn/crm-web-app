import React from "react";
import DataTable from "react-data-table-component";

import FilterComponent from "./FilterComponent";

import "./DataTable.css";

export default function DataTableComp({ columns, data, handleRowClick }) {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // const filteredItems = data.filter(
  //   (user) =>
  //     user.name && user.name.toLowerCase().includes(filterText.toLowerCase())
  // );

  const filteredItems = data.filter((user) => {
    let get = false;
    Object.keys(user).forEach((key) => {
      if (typeof user[key] === "string") {
        const search = user[key];
        if (search.toLowerCase().includes(filterText.toLowerCase())) {
          get = true;
        }
      }
    });
    return get;
  });

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className='w-[calc(100vw-80px)] px-4'>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        fixedHeader
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pointerOnHover
        onColumnOrderChange={(cols) => console.log(cols)}
        persistTableHead
        onRowClicked={(row, event) => {
          handleRowClick(row, event);
        }}
      />
    </div>
  );
}

import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { useTable } from "react-table";
import "../components/ViewCase.css"
const ViewCase = (props) => {
  const [caseLists, setCaseList] = useState([]);
  const { contract } = props.state;
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    const List = async () => {
      const caseLists = await contract.viewCase();
      setCaseList(caseLists);
      const formattedData = caseLists.map((item) => ({
        ID: item.ID.toString(),
        UID: item.UID,
        SUID: item.SUID,
        Name: item.name,
        Desc: item.desc,
        CaseType: item.caseType,
        Status: item.status,
        UploadedBy: item.upladedBy,
        Date: new Date(Number(item.timestamp) * 1000).toLocaleString(),
      }));
      setDATA(formattedData);
    };
    contract && List();
  }, [contract]);
  console.log("CaseList:", caseLists);
  console.log("Data: ", JSON.stringify(DATA));

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "ID",
    },
    {
      Header: "UID",
      accessor: "UID",
    },
    {
      Header: "SUID",
      accessor: "SUID",
    },
    {
      Header: "Name",
      accessor: "Name",
    },
    {
      Header: "Desc",
      accessor: "Desc",
    },
    {
      Header: "Case Type",
      accessor: "CaseType",
    },
    {
      Header: "Status",
      accessor: "Status",
    },
    {
      Header: "Uploaded By",
      accessor: "UploadedBy",
    },
    {
      Header: "Date",
      accessor: "Date",
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, [DATA]);
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <h4 style={{ textAlign: "center", marginTop: "20px" }}>Case List</h4>
      <div key={Math.random()}>
        <div className="table-container">
          <table className="table table-striped" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroups) => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                  {headerGroups.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewCase;

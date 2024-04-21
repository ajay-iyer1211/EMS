import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { useTable } from "react-table";
import "../components/ViewCase.css"
const TrackEvidence= (props) => {
  const [trackEvidenceList, setTrackEvidenceList] = useState([]);
  const { contract } = props.state;
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    const List = async () => {
      const trackEvidenceList = await contract.viewChangesInEvidence();
      setTrackEvidenceList(trackEvidenceList);
      const formattedData = trackEvidenceList.map((item) => ({
        ID: item.evidenceID.toString(),
        UID: item.caseUID,
        ChangeIn: item.changeIn,
        PrevValue: item.prevValue,
        UpdatedValue: item.updatedValue,
        UpdatedBy: item.updatedBy,
        Date: new Date(Number(item.timestamp) * 1000).toLocaleString(),
      }));
      setDATA(formattedData);
    };
    contract && List();
  }, [contract]);
  console.log("trackEvidenceList:", trackEvidenceList);
  console.log("Data: ", JSON.stringify(DATA));

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "ID",
    },
    {
      Header: "Case UID",
      accessor: "UID",
    },
    {
      Header: "Change In",
      accessor: "ChangeIn",
    },
    {
      Header: "Previous Value",
      accessor: "PrevValue",
    },
    {
      Header: "Updated Value",
      accessor: "UpdatedValue",
    },
    {
      Header: "Updated By",
      accessor: "UpdatedBy",
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
      <h4 style={{ textAlign: "center", marginTop: "20px" }}>Track Evidence List</h4>
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

export default TrackEvidence;

import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { useTable } from "react-table";
import "../components/ViewCase.css"
const ViewEvidence= (props) => {
  const [evidenceLists, setCaseList] = useState([]);
  const { contract } = props.state;
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    const List = async () => {
      const evidenceLists = await contract.viewEvidence();
      setCaseList(evidenceLists);
      const formattedData = evidenceLists.map((item) => {
        // Extract a substring of the hash value
        const hashSubstring = item.hash ? item.hash.substring(34) : ''; // Change the range as needed
        return {
          ID: item.ID.toString(),
          CaseUID: item.caseUID,
          FileName: item.filename,
          FileType: item.filetype,
          Desc: item.desc,
          Valid: item.valid,
          UploadedBy: item.officer,
          Hash: hashSubstring, // Store the substring of the hash
          Date: new Date(Number(item.timestamp) * 1000).toLocaleString(),
          Link: item.hash,
        };
      });
      setDATA(formattedData);
    };
    contract && List();
  }, [contract]);
  console.log("EvidenceList:", evidenceLists);
  console.log("Data: ", JSON.stringify(DATA));

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "ID",
    },
    {
      Header: "Case UID",
      accessor: "CaseUID",
    },
    {
      Header: "File Name",
      accessor: "FileName",
    },
    {
      Header: "File Type",
      accessor: "FileType",
    },
    {
      Header: "Descripition",
      accessor: "Desc",
    },
    {
      Header: "Validity",
      accessor: "Valid",
    },
    {
      Header: "Uploaded By",
      accessor: "UploadedBy",
    },
    {
      Header: "Hash",
      accessor: "Hash",
    },
    {
      Header: "Date",
      accessor: "Date",
    },
    {
      Header: "Link",
      accessor: "Link",
      Cell: ({ value }) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          View
        </a>
      ),
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, [DATA]);
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <h4 style={{ textAlign: "center", marginTop: "20px" }}>Evidence List</h4>
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

export default ViewEvidence;

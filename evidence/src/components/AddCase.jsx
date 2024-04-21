import React from "react";

const AddCase = (props) => {
  const addCase = async (event) => {
    event.preventDefault();
    const { contract } = props.state;
    console.log("props Received");
    const caseUID = document.querySelector("#caseUID").value;
    const SUID = document.querySelector("#SUID").value;
    const name = document.querySelector("#name").value;
    const caseDesc = document.querySelector("#caseDesc").value;
    const caseType = document.querySelector("#caseType").value;
    if (caseUID) console.log(caseUID, SUID, name, caseDesc, caseType, contract);
    const status = "Inprogress";
    const transaction = await contract.uploadCase(
      caseUID,
      SUID,
      name,
      caseDesc,
      caseType,
      status
    );
    await transaction.wait();
    console.log("Transaction is done");
  };
  return (
    <div>
      <h2 className="text-center">Add Case</h2>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={addCase}>
          <div className="mb-3">
            <label className="form-label">Case UID</label>
            <input
              type="text"
              className="form-control"
              id="caseUID"
              placeholder="Enter Case UID"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Station UID</label>
            <input
              type="text"
              className="form-control"
              id="SUID"
              placeholder="Enter Station UID"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Case Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Case Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Case Desc</label>
            <input
              type="text"
              className="form-control"
              id="caseDesc"
              placeholder="Enter Case Desc"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Case Type</label>
            <input
              type="text"
              className="form-control"
              id="caseType"
              placeholder="Enter Case Type"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCase;

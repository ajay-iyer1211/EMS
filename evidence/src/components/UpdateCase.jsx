import React, { useState, useEffect } from 'react';

const UpdateCase = (props) => {
  const { contract } = props.state;
  const [UID, setUID] = useState("");
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [SUID, setSUID] = useState(null);
  const [isUIDEntered, setIsUIDEntered] = useState(false);

  const fetchData = async (caseUID) => {
    const caseData = await contract.UID_viewCase(caseUID);
    console.log(caseData);
    setName(caseData.name);
    setDesc(caseData.desc);
    setType(caseData.caseType);
    setStatus(caseData.status);
    setSUID(caseData.SUID);
    setIsUIDEntered(true);
  };

  const update = async (event) => {
    event.preventDefault();
    const caseUID = document.querySelector("#caseUID1").value;
    const caseName = document.querySelector("#updateCaseName").value;
    const caseDesc = document.querySelector("#updateCaseDesc").value;
    const caseType = document.querySelector("#updateCaseType").value;
    const caseStatus = document.querySelector("#updateCaseStatus").value;
    const caseSUID = document.querySelector("#updateCaseSUID").value;
    const transaction = await contract.updateCase(caseUID, caseName, caseDesc, caseType, caseStatus, caseSUID);
    await transaction.wait();
    console.log("Transaction is done");
    const caseData = await contract.UID_viewCase(caseUID);
    console.log("Updated Case:",caseData);
  };

  useEffect(() => {
    contract && fetchData(UID);
  }, [UID]);

  const handleUIDChange = (event) => {
    setUID(event.target.value);
    setName("");
    setDesc("");
    setType("");
    setStatus("");
    setSUID("");
    setIsUIDEntered(false); // Resetting flag when UID changes
  };

  return (
    <div>
      <h5 className="text-center">Update Case</h5>

      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={update}>
          <div className="mb-3">
            <label className="form-label">Case UID</label>
            <input
              type="text"
              className="form-control"
              id="caseUID1"
              placeholder="Enter Case UID"
              onChange={handleUIDChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Case Name</label>
            <input
              type="text"
              className="form-control"
              id="updateCaseName"
              placeholder="Enter Case Name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={!isUIDEntered}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Case Desc</label>
            <input
              type="text"
              className="form-control"
              id="updateCaseDesc"
              placeholder="Enter Case Desc"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              disabled={!isUIDEntered}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Case Type</label>
            <input
              type="text"
              className="form-control"
              id="updateCaseType"
              placeholder="Enter Case Type"
              value={type}
              onChange={e => setType(e.target.value)}
              disabled={!isUIDEntered}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Case Status</label>
            <input
              type="text"
              className="form-control"
              id="updateCaseStatus"
              placeholder="Enter Case Status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              disabled={!isUIDEntered}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Case SUID</label>
            <input
              type="text"
              className="form-control"
              id="updateCaseSUID"
              placeholder="Enter Case SUID"
              value={SUID}
              onChange={e => setSUID(e.target.value)}
              disabled={!isUIDEntered}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!isUIDEntered}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCase;


import React, { useState, useEffect } from 'react';

const UpdateEvidence = (props) => {
  const { contract } = props.state;
  const [ID, setID] = useState("");
  const [desc, setDesc] = useState(null);
  const [valid, setValid] = useState(null);
  const [isIDEntered, setIsIDEntered] = useState(false);

  const fetchData = async (evidenceID) => {
    const evidenceData = await contract.viewEvidenceByID(evidenceID);
    console.log(evidenceData);
    setDesc(evidenceData.desc);
    setValid(evidenceData.valid);
    setIsIDEntered(true);
  };

  const update = async (event) => {
    event.preventDefault();
    const evidenceID = document.querySelector("#evidenceID1").value;
    const evidenceDesc = document.querySelector("#updateEvidenceDesc").value;
    const evidenceValid = document.querySelector('input[name="validity"]:checked').value;
    const transaction = await contract.updateEvidence(evidenceID,evidenceValid,evidenceDesc);
    await transaction.wait();
    console.log("Transaction is done");
    const evidenceData = await contract.viewEvidenceByID(evidenceID);
    console.log("Updated Evidence:",evidenceData);
  };

  useEffect(() => {
    contract && fetchData(ID);
  }, [ID]);

  const handleIDChange = (event) => {
    setID(event.target.value);
    setDesc("");
    setValid("");
    setIsIDEntered(false); // Resetting flag when UID changes
  };

  return (
    <div>
      <h5 className="text-center">Update Evidence</h5>

      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={update}>
          <div className="mb-3">
            <label className="form-label">Evidence ID</label>
            <input
              type="text"
              className="form-control"
              id="evidenceID1"
              placeholder="Enter Evidence ID"
              onChange={handleIDChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Evidence Descripition</label>
            <input
              type="text"
              className="form-control"
              id="updateEvidenceDesc"
              placeholder="Enter Evidence Descripition"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              disabled={!isIDEntered}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Evidence Validity</label>
            <div>
              <input
                type="radio"
                id="valid"
                name="validity"
                value="Valid"
                checked={valid === "Valid"}
                onChange={(e) => setValid(e.target.value)}
                disabled={!isIDEntered}
              />
              <label htmlFor="valid">Valid</label>
            </div>
            <div>
              <input
                type="radio"
                id="invalid"
                name="validity"
                value="Invalid"
                checked={valid === "Invalid"}
                onChange={(e) => setValid(e.target.value)}
                disabled={!isIDEntered}
              />
              <label htmlFor="invalid">Invalid</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!isIDEntered}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEvidence;


import { useState,useEffect } from "react";
import axios from "axios";

const AddEvidence= (props) => {
  const { contract } = props.state;
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [fileType, setFileType] = useState("No image selected");
  const addEvidence = async (e) => {
    e.preventDefault();
    const caseID = document.querySelector("#caseID").value;
    const evidenceDesc = document.querySelector("#evidenceDesc").value;
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS", 
          headers: {
            pinata_api_key: `77f1d924d0d2fe94b5f3`,
            pinata_secret_api_key: `e16c8fe0f528307234ca7b79fda28292a209019dd7a33295837eccbfe2f89771`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        const ImgHash = await `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.addEvidence(fileName,fileType,evidenceDesc,caseID,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
        document.querySelector("#caseUID").value = "";
        document.querySelector("#evidenceDesc").value= "";
      } catch (e) {
        alert("Unable to upload image to Pinata");
        console.log(e);
      }
    }
  };


  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    setFileType(e.target.files[0].type);
    console.log(e.target.files[0].type);
    e.preventDefault();
  };
  
  return (
    <div>
      <h2 className="text-center">Evidences</h2>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={addEvidence}>
          <div className="mb-3">
            <label className="form-label">Case ID</label>
            <input
              type="text"
              className="form-control"
              id="caseID"
              placeholder="Enter Case UID"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Evidence Desc</label>
            <input
              type="text"
              className="form-control"
              id="evidenceDesc"
              placeholder="Enter Evidence Desc"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file-upload" className="choose mx-2">
              Choose Image
            </label>
            <input
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
            />
            {/* <span className="textArea">Image: {fileName}</span> */}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvidence;

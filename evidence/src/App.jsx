import { useState , useEffect} from 'react'
import {Route ,Routes} from "react-router-dom";
import EMS from "./artifacts/contracts/EMS.sol/EMS.json";
import { ethers } from "ethers";
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AddEvidence from './components/AddEvidence'
import UpdateEvidence from './components/UpdateEvidence'
import ViewEvidence from './components/ViewEvidence'
import TrackEvidence from './components/TrackEvidence'
import AddCase from './components/AddCase'
import UpdateCase from './components/UpdateCase'
import ViewCase from './components/ViewCase'
import TrackCase from './components/TrackCase'
import AddOfficer from './components/AddOfficer'
import UpdateOfficer from './components/UpdateOfficer'
import ViewOfficer from './components/ViewOfficer'
import DeleteOfficer from './components/DeleteOfficer'


function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";

        const contract = new ethers.Contract(contractAddress, EMS.abi, signer);
        console.log(contract);
        setContract(contract);
        setProvider(provider);
        console.log("Connected", address);
        setState({ provider, signer, contract });
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <div>
      <Navbar account={account}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add_evidence" element={<AddEvidence state={state}/>}/>
        <Route path="/update_evidence" element={<UpdateEvidence state={state}/>}/>
        <Route path="/view_evidence" element={<ViewEvidence state={state}/>}/>
        <Route path="/track_evidence" element={<TrackEvidence state={state}/>}/>
        <Route path="/add_case" element={<AddCase state={state}/>}/>
        <Route path="/update_case" element={<UpdateCase state={state}/>}/>
        <Route path="/view_case" element={<ViewCase state={state}/>}/>
        <Route path="/track_case" element={<TrackCase state={state}/>}/>
        <Route path="/add_officer" element={<AddOfficer state={state}/>}/>
        <Route path="/update_officer" element={<UpdateOfficer state={state}/>}/>
        <Route path="/view_officer" element={<ViewOfficer state={state}/>}/>
        <Route path="/delete_officer" element={<DeleteOfficer state={state}/>}/>

      </Routes>
    </div>
  );
}

export default App;

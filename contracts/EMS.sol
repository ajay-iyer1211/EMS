// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EMS{

    uint256 public evidenceCount=0;
    uint256 public caseCount=0;
    struct Evidence {
        uint256 ID;
        string filename;
        string filetype;
        string desc;
        string valid;
        address officer;
        string caseUID;
        string hash;
        uint256 timestamp;
    }
    Evidence[]  evidence;

    struct TrackEvidence{
        uint256 evidenceID;
        string caseUID;
        string changeIn;
        string prevValue;
        string updatedValue;
        address updatedBy;
        uint256 timestamp;
    }
    TrackEvidence[] public trackEvidence;
    
    struct Case {
        uint256 ID;
        string UID;
        string SUID;
        string name;
        string desc;
        string caseType;
        string status;
        address upladedBy;
        uint256 timestamp;
    }
    Case[] public caseList;

    struct TrackChangeinCase{
        uint256 caseID;
        string  UID;
        string changeIn;
        string prevValue;
        string updatedValue;
        address updatedBy;
        uint256 timestamp;
    }
    TrackChangeinCase[] public trackChangeinCase;


    mapping(string => bool) public UIDinCaseList;
    mapping(string => uint256) public UIDCase;
    mapping(uint256 => bool) public isCaseID;
    mapping(string => bool) public EvidenceisinList;
    mapping(string => uint256) public HashEvidence;
    mapping(string => Evidence[]) public CaseEvidence;



    modifier isInCaseList(string memory UID){
        require(!UIDinCaseList[UID],"Case with this UID already Exist");
        _;
    }
    function uploadCase(string memory UID,string memory SUID ,string memory _name, string memory _desc, string memory _type,string memory _status) public isInCaseList(UID){
        caseCount++;
        caseList.push(Case(caseCount, UID, SUID,_name, _desc, _type, _status,msg.sender,block.timestamp));
        UIDinCaseList[UID]=true;
        UIDCase[UID]=caseCount;
        isCaseID[caseCount] = true;
    }

    function viewCase() public view returns(Case[] memory){
        return caseList;
    }

    function UID_viewCase(string memory _UID) public view returns(Case memory){
        require(UIDinCaseList[_UID],"Case is not present");
        uint256 caseID = UIDCase[_UID]-1;
        return caseList[caseID];
    }
    
    function updateCase(string memory _UID, string memory _name, string memory _desc, string memory _caseType, string memory _status ,string memory _SUID) public {
        require(UIDinCaseList[_UID],"Case is not present");
        uint256 caseID = UIDCase[_UID]-1;
        if(keccak256(bytes(caseList[caseID].desc))!=keccak256(bytes(_desc))){
            string memory prevValue = caseList[caseID].desc;
            caseList[caseID].desc= _desc;
            trackChangeinCase.push(TrackChangeinCase(caseID+1,_UID,"Description",prevValue,_desc,msg.sender,block.timestamp));
        }
        if(keccak256(bytes(caseList[caseID].name))!=keccak256(bytes(_name))){
            string memory prevValue = caseList[caseID].name;
            caseList[caseID].name= _name;
            trackChangeinCase.push(TrackChangeinCase(caseID+1,_UID,"Name",prevValue,_name,msg.sender,block.timestamp));
        }
        if(keccak256(bytes(caseList[caseID].caseType))!=keccak256(bytes(_caseType))){
            string memory prevValue = caseList[caseID].caseType;
            caseList[caseID].name= _caseType;
            trackChangeinCase.push(TrackChangeinCase(caseID+1,_UID,"Case Type",prevValue,_caseType,msg.sender,block.timestamp));
        }
        if(keccak256(bytes(caseList[caseID].SUID))!=keccak256(bytes(_SUID))){
            string memory prevValue = caseList[caseID].SUID;
            caseList[caseID].name= _SUID;
            trackChangeinCase.push(TrackChangeinCase(caseID+1,_UID,"SUID",prevValue,_SUID,msg.sender,block.timestamp));
        }
        if(keccak256(bytes(caseList[caseID].status))!=keccak256(bytes(_status))){
            string memory prevValue = caseList[caseID].status;
            caseList[caseID].name= _status;
            trackChangeinCase.push(TrackChangeinCase(caseID+1,_UID,"Status",prevValue,_status,msg.sender,block.timestamp));
        }

    }

    function viewTrackChangeinCase()public view returns(TrackChangeinCase[] memory){
        return trackChangeinCase;
    }

    function addEvidence(string memory filename, string memory filetype, string memory desc, string memory caseUID, string memory hash) public   {
        require(!EvidenceisinList[hash] ,"Evidenece already in List");
        require(UIDinCaseList[caseUID],"Case doesn't exist");
        evidenceCount++;
        evidence.push(Evidence(evidenceCount,filename,filetype,desc,"Valid",msg.sender,caseUID,hash,block.timestamp));
        EvidenceisinList[hash]=true;
        HashEvidence[hash]=evidenceCount;
        CaseEvidence[caseUID].push(Evidence(evidenceCount,filename,filetype,desc,"Valid",msg.sender,caseUID,hash,block.timestamp));
    }

    function updateEvidence(uint256 _ID,string memory _valid, string memory _desc )public {
        require(EvidenceisinList[evidence[_ID-1].hash],"Evidence doesn't exist");
        // require(evidence[_ID-1].valid!=_valid,"No changes"); 
        string memory UID = evidence[_ID-1].caseUID;
        if(keccak256(bytes(evidence[_ID-1].valid))!=keccak256(bytes(_valid))){
            string memory prevValue = evidence[_ID-1].valid;
            evidence[_ID-1].valid=_valid;
            CaseEvidence[UID][_ID-1].valid=_valid;
            trackEvidence.push(TrackEvidence(_ID,evidence[_ID-1].caseUID,"Validity",prevValue,_valid,msg.sender,block.timestamp));
        }
        if(keccak256(bytes(evidence[_ID-1].desc))!=keccak256(bytes(_desc))){
            string memory prevValue = evidence[_ID-1].desc;
            evidence[_ID-1].desc=_desc;
            CaseEvidence[UID][_ID-1].desc=_desc;
            trackEvidence.push(TrackEvidence(_ID,evidence[_ID-1].caseUID,"Descripition",prevValue,_desc,msg.sender,block.timestamp));
        }  
    }

    function viewEvidenceByID(uint256 _ID) public view returns(Evidence memory){
       require(EvidenceisinList[evidence[_ID-1].hash],"Evidence doesn't exist");
       return evidence[_ID-1];
    }

    function viewEvidence() public view returns(Evidence[] memory){
        return evidence;
    }

    function viewChangesInEvidence() public view returns(TrackEvidence[] memory){
        return trackEvidence;
    }

   

}
    
pragma solidity ^0.4.24;

contract Election {

    struct Candidate {
    	uint id;
    	string name;
		string party;
    	uint voteCount;
    }
    mapping(address => bool)public voters;
    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;

    event votedEvent (
    	uint indexed _candidateId
    	);
	
	event addEvent (
    	string _name
    	);

    constructor () public {
   		addCandidate("Candidate 1","Party 1");
   		addCandidate("Candidate 2","Party 2");
		addCandidate("Candidate 3","Party 3");
   		addCandidate("Candidate 4","Party 4");
    }

    function addCandidate (string memory _name,string memory _party) public {
    	candidatesCount ++;
    	candidates[candidatesCount] = Candidate(candidatesCount,_name,_party,0);
		emit addEvent(_name);
    }

    function vote (uint _candidateId) public{
    	require(!voters[msg.sender]);
    	require(_candidateId >0 && _candidateId <= candidatesCount);
    	voters[msg.sender] = true;
    	candidates[_candidateId].voteCount++;
    	emit votedEvent(_candidateId);
    }
}
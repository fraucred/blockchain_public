pragma solidity ^0.4.4;

contract Contract
{

	struct Voter
	{
		uint weight;
		bool voted;
		uint8 vote;
	}

	struct Proposal
	{
		uint voteCount;
	}
	uint256 public zeroCount = 10;
	address chairperson;
	mapping (address => Voter) voters;
	Proposal[] proposals;
	function getData() public returns (uint256) { return zeroCount; }
	/// Create a new ballot with $(_numProposals) different proposals.
	function Contract(uint8 _numProposals)
	{
		chairperson = msg.sender;
		voters[chairperson].weight = 1;
		proposals.length = _numProposals;
	}

	//Give $(voter) the right to vote on this ballot
	//May only be called by $(chairperson).
	function giveRightToVote(address voter)
	{
		//if(msg.sender != chairperson || voters[voter].voted) return;
		voters[voter].weight = 1;
	}

	//Give a single vote to proposal $(proposals).
	function vote (uint8 proposal)
	{
		Voter sender = voters[msg.sender];
		//if (sender.voted || proposal >= proposals.length) return;
		sender.voted = true;
		sender.vote = proposal;
		proposals[proposal].voteCount += sender.weight;
	}

	function winningProposal() constant returns (uint8 winningProposal)
	{
		uint256 winningVoteCount = 0;
		for(uint8 proposal = 0 ; proposal < proposals.length ; proposal++)
			if (proposals[proposal].voteCount > winningVoteCount)
			{
				winningVoteCount = proposals[proposal].voteCount;
				winningProposal = proposal+1;
			}
	}
}

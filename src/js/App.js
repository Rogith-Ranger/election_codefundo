import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'
import '../myStyles.css'
import FormPage from './Login.js'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
      cname:"",
      pname:"",
      isResultsOut:false,
      winner:"",
      winnerParty:"",
      winnerVote:0,
      isLoggedIn:false,
      secretData:""
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
    }

    this.web3 = new Web3(this.web3Provider)

    this.election = TruffleContract(Election)
    this.election.setProvider(this.web3Provider)

    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        this.watchEvents()
        this.electionInstance.candidatesCount().then((candidatesCount) => {
          const candidates = []
          for (var i = 1; i <= candidatesCount; i++) {
            this.electionInstance.candidates(i).then((candidate) => {
              
              candidates.push({
                id: candidate[0],
                name: candidate[1],
                party: candidate[2],
                voteCount: candidate[3]
              });
              candidates.sort((a,b)=>a.id-b.id)
              this.setState({ candidates: candidates })
            });
          }
        })
        this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        })
        this.electionInstance.resultsDeclared().then((result)=>{
          this.setState({isResultsOut:result})
        })
        this.electionInstance.winner().then((result)=>{
          this.setState({winner:result})
        })
        this.electionInstance.winnerParty().then((result)=>{
          this.setState({winnerParty:result})
        })
        this.electionInstance.winnerVote().then((result)=>{
          this.setState({winnerVote:result.toNumber()})
        })
      })
    })
  }

  watchEvents() {
    this.electionInstance.addEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      
    })
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })

    this.electionInstance.declareEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
    })
  }

  castVote(candidateId) {
    this.setState({ voting: true })
    this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>{
      this.setState({ hasVoted: true })
     }).then(()=>{this.fetchData();})
  }

  addCandidate(name,party){
    this.electionInstance.addCandidate(name,party,{ from: this.state.account }).then(()=>{
      alert(name+" has been added to the Candidate list")
    }).then(()=>{
      document.getElementById("myform").reset();
      this.fetchData();
    });
  }

  candidateNameHandler = (e) => {
    this.setState({cname:e.target.value})
  }

  partyNameHandler = (e) => {
    this.setState({pname:e.target.value})
  }

  onClickHandler = () => {
    if (confirm('Are you sure you want to add this candidate to the list of candidates?')) {
      this.addCandidate(this.state.cname, this.state.pname);
  } 
  }

  publishResults = () => {
    if(confirm("Are you sure you want to publish the results?"))
    {
      this.electionInstance.declare({ from: this.state.account }).then(()=>{
        alert("Results have been published");
        this.fetchData();
      })
    }
  }
  loginUser = () => {
    this.electionInstance.loginUser(this.state.secretData,{from:this.state.account}).then(()=>{
      this.fetchData();
    })
  }
  loginSuccess = (encryptedData) => {
    this.setState({secretData:encryptedData})
    this.setState({isLoggedIn:true})
    this.loginUser()
  }

  render() {
    return (
      <div className='row'>
        <div className='col-lg-12 text-center' >
          {
            !this.state.isLoggedIn?
            <FormPage isLoggedIn={this.loginSuccess}/>:
            this.state.isResultsOut?
          <div>
            <h1 className="middle" style={{marginLeft:"50%"}}>Results have been Declared</h1>
            <br/>
            <h3 className="middle"><b>Winning Candidate: </b> {this.state.winner}</h3><br/>
            <h3 className="middle"><b>Winning Party: </b>{this.state.winnerParty}</h3><br/>
            <h3 className="middle"><b>Total votes secured: </b>{this.state.winnerVote}</h3><br/>
          </div>
          :
          <div>
          {this.state.account === "0xba231f92186ba87985a50600e72e6a2d1e9fcb7c"?
          <div >
            <h2 className="middle">Election Commission</h2>
            <form id="myform" className="middle"> 
                Candidate Name: <input type = "text" id = "cname" onChange = {this.candidateNameHandler}/><br/><br/>
                Party Name: &nbsp;&nbsp;&nbsp; <input type = "text" id = "pname" onChange = {this.partyNameHandler}/><br/><br/>
                <input type = "button" onClick = {this.onClickHandler} value = "Add Candidate"/>
            </form><br/>
            <input type = "button" value = "Publish Results" onClick = {this.publishResults} className = "middle results"/>
            <br/><br/>
          <h3 className="middle">List of current Candidates:</h3>
          <table className='table table-hover'>
          <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Political Party</th>
          </tr>
          </thead>
          <tbody >
          {this.state.candidates.map((candidate) => {
            return(
              <tr>
                <th>{candidate.id.toNumber()}</th>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
              </tr>
          )}
          )}
          </tbody>
          </table>
          </div>
          :
          
        <div>
          <h1>Election</h1>
          <br/>
          { this.state.loading || this.state.voting
            ? <p className='text-center'>Loading...</p>
            : <div className="pull-left">
              <Content
                account={this.state.account}
                candidates={this.state.candidates}
                hasVoted={this.state.hasVoted}
                castVote={this.castVote} />
              </div>
          }
        </div>
        }</div>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)

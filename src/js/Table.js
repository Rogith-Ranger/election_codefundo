import React from 'react'
import BarChart from './BarChart';
import '../myStyles.css'
import ChoroplethMap from './ChoroplethMap';
import PieChart from './PieChart';
class Table extends React.Component {
  state = {
    toggle:false
  }
  handleClick = e =>{
    this.props.castVote(e.target.value)
  }

  toggleHandler = () =>{
    if(this.state.toggle)
    this.setState({toggle:false})
    else
    this.setState({toggle:true})
  }
  
  render() {
    return (
      <div>
      <table className='table table-hover'>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Political Party</th>
            {!this.props.hasVoted?
            <th></th>:null}
          </tr>
        </thead>
        <tbody >
          {this.props.candidates.map((candidate) => {
            return(
              <tr>
                <th>{candidate.id.toNumber()}</th>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                {!this.props.hasVoted?
                <td><button className = "voteButton" type = "button" value={candidate.id.toNumber()} onClick={this.handleClick}>Vote</button></td>
                :null
                }
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="div">
        <div className="barchart">
          <h5><b>Current Status</b></h5>
          <hr style={{marginTop:0,marginBottom:0,backgroundColor:"darkgrey"}}/>
          <BarChart candidates={this.props.candidates}/>
           </div><br/>
           <div className="barchart">
            <h5><b>Current Status</b></h5>
          <hr style={{marginTop:0,marginBottom:0,backgroundColor:"darkgrey"}}/>
          <PieChart candidates={this.props.candidates}/>
        </div>
        <div className="map">
           <h5><i>Previous Election Results</i></h5>
           <hr style={{marginTop:0,marginBottom:0,backgroundColor:"darkgrey"}}/>
          <ChoroplethMap/>
        </div>
      </div>    
    </div>)
  }
}

export default Table

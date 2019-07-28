import React from 'react'
import BarChart from './BarChart';
import '../myStyles.css'
import ChoroplethMap from './ChoroplethMap';
class Table extends React.Component {

  handleClick = e =>{
    this.props.castVote(e.target.value)
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
            <th>Votes</th>
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
                <td>{candidate.voteCount.toNumber()}</td>
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
          <BarChart candidates={this.props.candidates}/>
        </div>
        <div className="map">
          <ChoroplethMap/>
        </div>
      </div>    
    </div>)
  }
}

export default Table

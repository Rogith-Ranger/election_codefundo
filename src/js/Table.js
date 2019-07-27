import React from 'react'
import BarChart from './BarChart';
import '../myStyles.css'
class Table extends React.Component {

  handleClick = e =>{
    this.props.castVote(e.target.value)
  }

  render() {
    return (
      <div className="div">
      <table className='table table-dark table-bordered table-striped table-hover'>
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Votes</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          {this.props.candidates.map((candidate) => {
            return(
              <tr>
                <th>{candidate.id.toNumber()}</th>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount.toNumber()}</td>
                {!this.props.hasVoted?
                <td><button className = "voteButton" type = "button" value={candidate.id.toNumber()} onClick={this.handleClick}>Vote</button></td>
                :null
                }
              </tr>
            )
          })}
        </tbody>
      </table>,
      <BarChart candidates={this.props.candidates}/>
    </div>)
  }
}

export default Table

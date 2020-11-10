import React from 'react'
import '../myStyles.css'
class Table extends React.Component {
  state = {
    toggle:false,
    buttonText:"Previous Election Results"
  }
  
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
    </div>)
  }
}

export default Table

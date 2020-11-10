import React from 'react'
import Table from './Table'

class Content extends React.Component {
  render() {
    return (
      <div>
        <h4 className="middle">Constituency Name: Constituency 1</h4>
        <Table candidates={this.props.candidates} castVote={this.props.castVote} hasVoted={this.props.hasVoted}/>
        <hr/>
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content

import React, { Component } from 'react'
import '../tweet.css'
import axios from 'axios'
class TweetModel extends Component {
    state = {
        data:{}
    }
    componentDidMount(){
    axios.get("http://localhost:5000/output").then(res=>{
        res = res.data
        this.setState({data:res})
    })
    }
    render() {
        return (
            <div>
                <div class='widget widget--1x1'>
  <header class='widget-header'>
    <div class='widget-header-indicator'></div>
  </header>
  <div class='widget-content'>
  Donald Trump
    <ul class='value-list'>
      <li>
        <div class='description'>
          Positive
        </div>
        <div class='value'>
          <span class='positive'>
            {this.state.data.positive}%
          </span>
        </div>
      </li>
      <li>
        <div class='description'>
          Negative
        </div>
        <div class='value'>
          <span class='negative'>
          {this.state.data.negative}%
          </span>
        </div>
      </li>
    </ul>
  </div>
  <footer class='widget-footer'>
    <a class='fa fa-trash-o'></a>
    <a class='fa fa-cog'></a>
  </footer>
</div>

            </div>
        )
    }
}

export default TweetModel

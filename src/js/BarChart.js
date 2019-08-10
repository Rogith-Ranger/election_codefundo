import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {

componentDidUpdate(){
    this.drawchart();
}

drawchart = () =>{
    d3.selectAll("svg").remove()
    const candidates=[];
    this.props.candidates.forEach(candidate=>{
       const dict = {};
        dict["party"] = candidate.party;
        dict["voteCount"] = candidate.voteCount.toNumber();
        candidates.push(dict);
    })
    var margin = {top: 50, right: 20, bottom: 70, left: 40},
    width = 360 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  candidates.forEach(function(d) {
    d.voteCount = +d.voteCount;
  });
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  x.domain(candidates.map(function(d) { return d.party; }));
  y.domain([0, d3.max(candidates, function(d) { return d.voteCount; })]);

  svg.selectAll(".bar")
      .data(candidates)
    .enter().append("rect")
      .attr("class", "bar")
      .style("fill",function(d){return color(d.voteCount)})
      .attr("x", function(d) { return x(d.party); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.voteCount); })
      .attr("height", function(d) { return height - y(d.voteCount); });
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dx","20")
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)");
      svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .style("font-size","13")
      .text("Party Name");
  svg.append("g")
      .call(d3.axisLeft(y).ticks(3));
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size","13")
      .text("Vote Count");      
}
    render() {
        return (
            <div id="barchart">
            </div>
        )
    }
}

export default BarChart

import React, { Component } from 'react'
import * as d3 from 'd3'

class PieChart extends Component {
    componentDidUpdate(){
        this.drawchart();
    }
    drawchart = () => {
        // d3.selectAll("#piechart").remove()
        const candidates=[];
        this.props.candidates.forEach(candidate=>{
        const dict = {};
        dict["party"] = candidate.party;
        dict["voteCount"] = candidate.voteCount.toNumber();
        candidates.push(dict);
    })
    candidates.forEach(function(d) {
        d.voteCount = +d.voteCount;
      });
      var margin = {top: 50, right: 20, bottom: 70, left: 40},
    w = 390 - margin.left - margin.right,
    h = 360 - margin.top - margin.bottom,
    radius = Math.min(w, h) / 2 ;
    h = h+50;

var color = d3.scaleOrdinal(d3.schemeDark2);
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
var svg = d3.select('#piechart').append("svg")
//select the svg with a class name instead of 'svg.'
//select the svg with an ID
    .attr("width", w)
    .attr("height", h)
    .style("padding-left","30px")
    .style("padding-top","30px");
      
var g = svg.append("g")
    .attr("transform", "translate(" + radius  + "," + radius + ")") ;



var pie = d3.pie().value(function(d) { 
     return d.voteCount; 
});

var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(70)
    .padAngle(.02);


var arc = g.selectAll()
    .data(pie(candidates))
    .enter()
    .append("g");

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.voteCount); })
    .on("mouseover",handleMouseOver)
    .on("mouseout", handleMouseOut);

    var legendG = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
    .data(pie(candidates))
    .enter().append("g")
    .attr("transform", function(d,i){
      return "translate(" + (w - 100) + "," + (i * 15) + ")"; // place each legend on the right and bump each one down 15 pixels
    })
    .attr("class", "legend");   
  
  legendG.append("rect") // make a matching color rect
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", function(d, i) {
      return color(d.data.voteCount);
    });
  
  legendG.append("text") // add the text
    .text(function(d){
      return d.data.party;
    })
    .style("font-size", 12)
    .attr("y", 10)
    .attr("x", 11);

    function handleMouseOut(d,i)
    { div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        d3.select(this)
           .call(resumeOpacity)
    }
    function handleMouseOver(d, i) { 
         div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html("<b>Party Name</b>: "+d.data.party + "<br/>" +"<b>Votes Secured:</b> "+ d.data.voteCount)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	

            d3.select(this)
              .call(changeOpacity)
          }
    function changeOpacity(selection) { selection.attr("opacity", "0.5"); }
    function resumeOpacity(selection) { selection.attr("opacity", "1"); }
}
    render() {
       
        return (
                <div id="piechart"></div>
        )
    }
}

export default PieChart

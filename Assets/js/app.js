// @TODO: YOUR CODE HERE!
var svgWidth = 850;
var svgHeight = 550;

//Set margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100,
};

var w = svgWidth - margin.left - margin.right;
var h = svgHeight - margin.top - margin.bottom;

//define wrapper and then append
var svg = d3.select("#scatter")
    .append("svg")
    .attr("h", svgHeight)
    .attr("w", svgWidth);


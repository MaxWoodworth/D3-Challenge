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

var chartGroup = svg.append("g")
    .attr("transofrm", 'translate(${margin.left}, ${margin.top})');

//Get data from csv
d3.csv("data.csv").then(function (data){
    //parse
    obage.forEach(function (data){
        data.age = +data.age;
        data.obesity = +data.obesity;   
    });
    
    //Scale Function using xlinearscale
    //Did use this for some time https://stackoverflow.com/questions/35953892/d3-scale-linear-vs-d3-scalelinear
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(
            data, d => d.age)])
            .range([w]);
    
            //Scale Function using ylinearscale
    var yLinearScale = d3.scaleLinear()
    .domain([0,d3.max(data, d => d.obesity)])
    .range([height, 0]);
    
    //Axis functions with Linear scale
    var bottomaxis = d3.axisBottom(xLinearScale);
    var leftaxis = d3.axisLeft(yLinearScale);
    
    //apend both axis
    chartGroup.append("g")
    .attr("transform", 'translate(0, ${height})')
    .call(bottomaxis);
    chartGroup.append("g")
    .call(leftaxis);

    //Create data points for chart
    var circlesGroup = chartGroup.selectAll("circle")
    .data(obage)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "12")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    //Declare labels
    //var labels = chartGroup.append("g")
       // .attr("transform", 'translate')
})
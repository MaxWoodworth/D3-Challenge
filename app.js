// @TODO: YOUR CODE HERE!
var svgWidth = 950;
var svgHeight = 510;

//Set margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100,
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//define wrapper and then append
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Get data from csv
d3.csv("data.csv").then(function (data){
    //console.log(data)
    //parse
    data.forEach(function (scatterdata){
        scatterdata.age = +scatterdata.age;
        scatterdata.obesity = +scatterdata.obesity;
        //console.log("age:", scatterdata.age);  
    });
    
    //Scale Function using xlinearscale
    //Did use this for some time https://stackoverflow.com/questions/35953892/d3-scale-linear-vs-d3-scalelinear
    var xLinearScale = d3.scaleLinear()
        .domain([28, d3.max(data, d => d.age)])
        //KEPT GETTING ANNOYING ERROR 
        //it was pointing me towardss line 53 when in reality it was a direct result that I had no entered a second valuu (0) after w.
        .range([0,width]);
    
            //Scale Function using ylinearscale
            //had to hard code some of the data by actually looking at it and adding 2 to make a whole point visible
    var yLinearScale = d3.scaleLinear()
    .domain([0,(d3.max(data, d => d.obesity)+2)])
    .range([height, 0]);
    
    //Axis functions with Linear scale
    var bottomaxis = d3.axisBottom(xLinearScale);
    var leftaxis = d3.axisLeft(yLinearScale);
    
    //apend both axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomaxis);
    
    chartGroup.append("g")
        .call(leftaxis)
    
    //Create data points for chart
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "12")
    .attr("fill", "blue")
    .attr("opacity", ".75");

    //add labels for the data plots
    var labels = chartGroup.selectAll(null)
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .attr("x", d => xLinearScale(d.age))
    .attr("y", d => yLinearScale(d.obesity))
    .attr("fill", "white")
    .attr("alignment-baseline", "middle");
     //Sets up tooltip
    //https://www.w3schools.com/bootstrap/bootstrap_ref_js_tooltip.asp
    var tool = d3.tip()
        .attr("class", "d3-tip")
        .offset([70, -70])
        .html(function (d) {
            return (`${d.state}<br>Age (Median): ${d.age}<br>% Obese: ${d.obesity}`);
        });
    chartGroup.call(tool);
    //Add Listeners
    circlesGroup.on("mouseover", function (data) {
        tool.show(data, this)
            .attr("fill", "green");
        })
        .on("mouseout", function (data, index) {
            tool.hide(data);
        });
    //Declare labels
    var label = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 15})`);
    //Sets up age label and gives value for listener
        var agelabel = chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        //.attr("x", 0 - margin.left + 50)
        //.attr("y", 0 - (height / 2))
        //.attr("value", "age")
        //.classed("active", true)
        .attr("class", "axisText")
        .text("Age");
    
    //Sets up obesity label and gives value for listener
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "0em")
        .attr("class", "axisText")
        .text("% Obese");

    //Sets up tooltip
    //https://www.w3schools.com/bootstrap/bootstrap_ref_js_tooltip.asp
 
});
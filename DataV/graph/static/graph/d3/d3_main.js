/* Main JavaScript for D3 Vizualization */

// Static variables for svg attributes.
var svg_width = 600, svg_height = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svg_width - margin.left - margin.right;
var height = svg_height - margin.top - margin.bottom;

// Scale for axises
var x = d3.scaleLinear().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

// Holds data points
var data = [];

// Creates a bar graph
function makechart(data) {
	d3.select(".chart")
		.selectAll("div")
		.datum(data)
		.enter().append("div")
		.style("width", function (d) { return x(d) + "px"; })
		.text(function (d) { return d; });
}

// Parses input and graphs line chart when "Input" button is pressed
function parse() {
	var xData = document.getElementById("inputArrayX")
		.value
		.replace(/\s\s+/g, " ")
		.replace(/\s\B/g, "")
		.split(" ");
	var yData = document.getElementById("inputArrayY")
		.value
		.replace(/\s\s+/g, " ")
		.replace(/\s\B/g, "")
		.split(" ");
	var name = document.getElementById("name").value;

	if (xData.length == yData.length) {
		xData.length = yData.length;
		for (var i = 0; i < yData.length; i++) {
			xData[i] = parseFloat(xData[i]);
			yData[i] = parseFloat(yData[i]);
		}
	} else if (xData.length == 1) {
		for (var i = 0; i < yData.length; i++) {
			xData[i] = parseFloat(i);
			yData[i] = parseFloat(yData[i]);
		}
	} else { return }

	for (var i = 0; i < yData.length; i++) {
		data.push(
			{
				index: xData[i],
				value: yData[i]
			});
	}
	data.sort(function (a, b) { return a.index - b.index });

	line_chart(data, name);
	initializeSeries(data);
	playSeries(data.length);
	replaceInput();
}


function replaceInput() {
	var inputButton = document.getElementById("submit");
	inputButton.remove();

	var button = d3.select(".lineButtons");
	button.append("button")
		.attr("name", "updateButton")
		.attr("type", "button")
		.attr("id", "update-button")
		.attr("value", "Update")
		.attr("onclick", "newParse()")
		.attr("class", "arrow-button")

	var b = document.createElement("span");
	var text = document.createTextNode("Update");
	b.appendChild(text);
	document.getElementById("update-button").appendChild(b);

	$("#search-point").show();
}

// Updatas the values in the line graph
function updateInput() {
	var line = d3.line()
		.x(function (d) { return x(d.index) })
		.y(function (d) { return y(d.value) });

	x.domain(d3.extent(data, function (d) { return d.index }));
	y.domain([0, d3.max(data, function (d) { return d.value })]);

	var svg = d3.select("body").transition();

	svg.select(".line")
		.duration(2000)
		.attr("d", line(data));

	svg.select(".x_axis")
		.duration(2000)
		.call(d3.axisBottom(x));

	svg.select(".y_axis")
		.duration(2000)
		.call(d3.axisLeft(y));
}

// Updates the current graph
function newParse() {
	var xData = document.getElementById("inputArrayX")
		.value
		.replace(/\s\s+/g, " ")
		.replace(/\s\B/g, "")
		.split(" ");
	var yData = document.getElementById("inputArrayY")
		.value
		.replace(/\s\s+/g, " ")
		.replace(/\s\B/g, "")
		.split(" ");
	var name = document.getElementById("name").value;

	data = [];
	if (xData.length == yData.length) {
		xData.length = yData.length;
		for (var i = 0; i < yData.length; i++) {
			xData[i] = parseFloat(xData[i]);
			yData[i] = parseFloat(yData[i]);
		}
	} else if (xData.length == 1) {
		for (var i = 0; i < yData.length; i++) {
			xData[i] = parseFloat(i);
			yData[i] = parseFloat(yData[i]);
		}
	} else { return }

	for (var i = 0; i < yData.length; i++) {
		data.push(
			{
				index: xData[i],
				value: yData[i]
			});
	}
	data.sort(function (a, b) { return a.index - b.index });

	updateInput();
	clearSeries();
	clearPoints();
	initializeSeries(data);
	playSeries(data.length);
}

// Creates a line graph
function line_chart(data, name) {
	var svg = d3.select('svg')
		.attr("width", svg_width)
		.attr("height", svg_height);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var line = d3.line()
		.x(function (d) { return x(d.index) })
		.y(function (d) { return y(d.value) });

	x.domain(d3.extent(data, function (d) { return d.index }));
	y.domain([0, d3.max(data, function (d) { return d.value })]);

	g.append("g")
		.attr("class", "x_axis")
		.call(d3.axisBottom(x))
		.attr("transform", "translate(0," + height + ")")

	g.append("g")
		.attr("class", "y_axis")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 1)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text(name);

	g.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.attr("d", line)
		.call(transition);

	// Scatterplot (NOT WORKING CORRECTLY)
	/*svg.selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function (d) { return x(d.index) })
		.attr("cy", function (d) { return y(d.value) });
	*/

	// Transition function for animating the line
	function transition(path) {
		path.transition()
			.duration(6000)
			.ease(d3.easeLinear)
			.attrTween("stroke-dasharray", tweenDash);
	}

	// Calculation for animation
	function tweenDash() {
		/*
		var line = d3.line()
			.x(function (d, i) { return x(d[0]); })
			.y(function (d, i) { return y(d[1]); });
		//*/

		//*
		var l = this.getTotalLength(),
			i = d3.interpolateString("0," + l, l + "," + l);
		return function (t) { return i(t); };
		//*/

		/*
		return function (d, i, a) {
			var point_a = d[d.length - 2],
				point_b = d[d.length - 1];

			var interpolateX = d3.scaleLinear()
				.domain([0, 1])
				.range([point_a[0], point_b[0]]);

			return function (t) {
				while (t != 1) {
					var interpolatedLine = d.slice(0, d.length - 1),
						interpolatedY = point_b[1] * t + point_a[1] * (1 - t),
						point_i = [interpolateX(t), interpolatedY];

					interpolatedLine.push(point_i);

					return line(d)
				}
			};
		}
		//*/
	}
}

function searchPoint() {
	var x = parseFloat(document.getElementById("xSearch").value);
	var y = null;

	// Check if data array exists
	var dataExists = (Array.isArray(data)) && data.length != 0;
	if (!dataExists) {
		console.log("initalize array first");
		return;
	}

	// Check if point is in data array
	var xInGraph = (x >= data[0].index) && (x <= data[data.length - 1].index);
	if (!xInGraph) {
		console.log("x is invalid");
		return;
	}

	for (var i = 0; i < data.length; i++) {
		if (x == data[i].index) {
			y = data[i].value;
			break;
		}
		else if (x > data[i].index && x < data[i + 1].index) {
			y = distanceAtYGivenX(x, data[i], data[i + 1]);
			break;
		}
	}

	plotSearchPoint(x, y);
	playNote();

	console.log("y is " + y);
}

function distanceAtYGivenX(x, point1, point2) {

	var x1 = point1.index;
	var y1 = point1.value;
	var x2 = point2.index;
	var y2 = point2.value;

	var m = (y2 - y1) / (x2 - x1);
	var b = y1 - m * x1;

	return m * x + b;

}

function plotSearchPoint(xValue, yValue) {
	var dot = [];
	dot.push(
		{
			index: xValue,
			value: yValue
		});

	d3.select("svg")
		.selectAll("dot")
		.data(dot)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function (d) { return x(d.index) })
		.attr("cy", function (d) { return y(d.value) })
		.attr("transform", "translate(" + margin.left + ","
			+ margin.top + ")");
}

function clearPoints() {
	var points = document.getElementsByClassName("dot");
	var dot;
	for (var i = 0; i < points.length; i++) {
		dot = points[i];
		dot.remove();
	}
}

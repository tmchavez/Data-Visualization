/* Main JavaScript for D3 Vizualization */

// Static variables for svg attributes.
var svg_width = 600, svg_height = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svg_width - margin.left - margin.right;
var height = svg_height - margin.top - margin.bottom;

var x = d3.scaleLinear().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

var data = [];

function updateInput(data) {
	var x = d3.scaleLinear().rangeRound([0, width]);
	var y = d3.scaleLinear().rangeRound([height, 0]);

	var line = d3.line()
		.x(function (d) { return x(data.indexOf(d)) })
		.y(function (d) { return y(d) });

	x.domain(d3.extent(data, function (d) { return data.indexOf(d) }));
	y.domain(d3.extent(data, function (d) { return d }));

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
	}

	for (var i = 0; i < yData.length; i++) {
		data.push(
			{
				index: xData[i],
				value: yData[i]
			});
	}

	line_chart(data, name);
	initializeSeries(yData);
	playSeries(yData);
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

	if (xData.length == yData.length || xData.length == 0) {
		for (var i = 0; i < xData.length; i++) {
			xData[i] = parseFloat(xData[i]);
			yData[i] = parseFloat(yData[i]);
		}

		updateInput(xData, yData);
		clearSeries();
		initializeSeries(xData, yData);
		playSeries(xData, yData);
	}
}

// Creates a bar graph
function makechart(data) {
	d3.select(".chart")
		.selectAll("div")
		.datum(data)
		.enter().append("div")
		.style("width", function (d) { return x(d) + "px"; })
		.text(function (d) { return d; });
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
		.select(".domain")
		.remove();

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
	var point = document.getElementById("xSearch");
	console.log(data);
}

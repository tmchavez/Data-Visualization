function updateInput() {
	var new_data = document.getElementById("points").value.split(" ");
	for (var i = 0; i < new_data.length; i++) {
		new_data[i] = parseFloat(new_data[i]);
	}
}


function parse() {
	var data = document.getElementById("points").value.split(" ");
	for (var i = 0; i < data.length; i++) {
		data[i] = parseFloat(data[i]);
	}
	line_chart(data);
}


function makechart(data) {
	d3.select(".chart")
		.selectAll("div")
		.data(data)
		.enter().append("div")
		.style("width", function (d) { return x(d) + "px"; })
		.text(function (d) { return d; });
}


function line_chart(data) {
	var svg_width = 600, svg_height = 400;
	var margin = { top: 20, right: 20, bottom: 30, left: 50 };
	var width = svg_width - margin.left - margin.right;
	var height = svg_height - margin.top - margin.bottom;

	var svg = d3.select('svg')
		.attr("width", svg_width)
		.attr("height", svg_height);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleLinear().rangeRound([0, width]);
	var y = d3.scaleLinear().rangeRound([height, 0]);

	var line = d3.line()
		.x(function (d) { return x(data.indexOf(d)) })
		.y(function (d) { return y(d) })
	x.domain(d3.extent(data, function (d) { return data.indexOf(d) }));
	y.domain(d3.extent(data, function (d) { return d }));

	g.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.select(".domain")
		.remove();

	g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 1)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Price ($)");

	g.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.attr("d", line)
		.call(transition);

	function transition(path) {
		path.transition()
			.duration(7500)
			.attrTween("stroke-dasharray", tweenDash);
	}

	function tweenDash() {
		var l = this.getTotalLength(),
			i = d3.interpolateString("0," + l, l + "," + l);
		return function (t) { return i(t); };
	}
}

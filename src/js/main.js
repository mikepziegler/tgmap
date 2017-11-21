function init() {

    var docu = document.getElementById('graph');

    var width = docu.clientWidth,
        height = docu.clientHeight,
        centered,
        clickBool = false;


    var path = d3.geo.path()
        .projection(null);

    var svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    var graph = d3.select("#graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);


    var g = svg.append("g")
        .attr("width", "")
        .attr("height", "");

    d3.json("json/tg-municipalities-lakes.json", function(error, tg) {
        switch (btnP) {
            case "btn1":
                g.append("g")
                    .attr("id", "municipalities")
                    .selectAll("path")
                    .data(topojson.feature(tg, tg.objects.municipalities).features)
                    .enter().append("path")
                    .attr("d", path)
                    .on("click", clicked)
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .attr("fill", function(d) {
                        var m = getMPopulation(d);
                        if (m > 0) {
                            var a = ((m - (m % Math.round(max / 10))) / Math.round(max / 10));
                            if (a >= 10) {
                                a = a - 1;
                            }
                            console.log(d.id + ", " + m);
                            return color[a][1];
                        }
                    });

                console.log("go to Population");
                break;
            default:
                g.append("g")
                    .attr("id", "municipalities")
                    .selectAll("path")
                    .data(topojson.feature(tg, tg.objects.municipalities).features)
                    .enter().append("path")
                    .attr("d", path)
                    .on("click", clicked)
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout);
                break;

        }

        g.append("g")
            .attr("id", "lakes")
            .selectAll("path")
            .data(topojson.feature(tg, tg.objects.lakes).features)
            .enter().append("path")
            .attr("d", path);

        g.append("path")
            .datum(topojson.mesh(tg, tg.objects.municipalities, function(a, b) { return a !== b; }))
            .attr("id", "border")
            .style("stroke-width", "1px")
            .attr("d", path);
    });

    function clicked(d) {
        var x, y, k;
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;

            clickBool = true;

            console.log(d.id + ": Surprise Motherfucker");
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;

            clickBool = false;

            console.log(d.id + ": bitch I'm out");
        }
        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });
        g.transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }

    function mouseover(d) {
        switch (btnP) {
            case "btn1":
                graph.style("opacity", .9)
                    .html(getMName(d) + "<br> Einwohnerzahl: " + getMPopulation(d))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                break;
            default:
                graph.style("opacity", .9)
                    .html(getMName(d))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                break;
        }
    }

    function mouseout(d) {
        graph.style("opacity", 0)
            .html();
    }

    function getMName(d) {
        for (i = 0; i < muniArr.length; i++) {
            if (d.id === muniArr[i][0]) {
                return muniArr[i][1] || d.id;
                continue;
            }
        }
    }

    function getMPopulation(d) {
        for (i = 0; i < muniArr.length; i++) {
            if (d.id === muniArr[i][0]) {
                return muniArr[i][2];
                break;
            }
        }
    }

    function colM() {
        //d3.select('#municipalities')

    }
}


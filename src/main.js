var muniArr = [
    //Bezirk Arbon
    [4436, "Romanshorn"],
    [4451, "Uttwil"],
    [4426, "Kesswil"],
    [4441, "Salmsach"],
    [4411, "Egnach"],
    [4401, "Arbon"],
    [4421, "Horn"],
    [4431, "Roggwil (TG)"],
    [4461, "Amriswil"],
    [4406, "Dozwil"],
    [4416, "Hefenhofen"],
    [4446, "Sommeri"],

    //Bezirk Kreuzlingen
    [4656, "Güttingen"],
    [4641, "Altnau"],
    [4691, "Münsterlingen"],
    [4643, "Bottighofen"],
    [4671, "Kreuzlingen"],
    [4681, "Langrickenbach"],
    [4683, "Lengwil"],
    [4666, "Kemmental"],
    [4696, "Tägerwilen"],
    [4651, "Gottlieben"],
    [4646, "Ermatingen"],
    [4851, "Salenstein"],
    [4846, "Raperswilen"],
    [4701, "Wäldi"],

    //Bezirk Weinfelden
    [4486, "Hauptwilen-Gottshaus"],
    [4511, "Zihlschlacht-Sitterdorf"],
    [4471, "Bischofszell"],
    [4495, "Hohen-Tannen"],
    [4476, "Erlen"],
    [4501, "Kradolf-Schönenberg"],
    [4506, "Sulgen"],
    [4911, "Bürglen (TG)"],
    [4901, "Birwinken"],
    [4891, "Berg (TG)"],
    [4791, "Wuppenau"],
    [4756, "Schönholzerswilen"],
    [4921, "Bussnang"],
    [4946, "Weinfelden"],
    [4941, "Märstetten"],
    [4711, "Affeltrangen"],
    [4881, "Amlikon-Bissegg"],
    [4951, "Wigoltingen"],

    //Bezirk Frauenfeld
    [4606, "Stettfurt"],
    [4591, "Matzingen"],
    [4611, "Thundorf"],
    [4566, "Frauenfeld"],
    [4571, "Gachnang"],
    [4590, "Hüttlingen"],
    [4561, "Felben-Wellhausen"],
    [4831, "Müllheim"],
    [4841, "Pfyn"],
    [4621, "Warth-Weiningen"],
    [4616, "Uessingen-Buch"],
    [4601, "Neunforn"],
    [4816, "Homburg"],
    [4811, "Herdern"],
    [4821, "Hüttwilen"],
    [4801, "Berlingen"],
    [4864, "Steckborn"],
    [4826, "Mammern"],
    [4806, "Eschenz"],
    [4871, "Wagenhausen"],
    [4545, "Diessenhofen"],
    [4536, "Basadingen-Schlattingen"],
    [4546, "Schlatt (TG)"],

    //Bezirk Münchwilen (TG)
    [4726, "Fischingen"],
    [4751, "Rickenbach (TG)"],
    [4786, "Wilen (TG)"],
    [4761, "Sirnach"],
    [4724, "Eschlikon"],
    [4721, "Bichelsee-Balterswil (Bi.)"],
    [4746, "Münchwilen (TG)"],
    [4781, "Wängi"],
    [4551, "Aadorf"],
    [4723, "Braunau"],
    [4776, "Tobel-Tägerschen"],
    [4716, "Bettwiesen"],
    [4741, "Lommis"]
];

var width = window.innerWidth,
    height = window.innerHeight,
    centered;

var projection = null;

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


var g = svg.append("g");

d3.json("tg-municipalities-lakes.json", function(error, tg) {
    g.append("g")
        .attr("id", "municipalities")
        .selectAll("path")
        .data(topojson.feature(tg, tg.objects.municipalities).features)
        .enter().append("path")
        .attr("d", path)
        .on("click", clicked)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

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


    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;


    }
    g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });
    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}

function mouseover(d) {
    graph.style("opacity", .9)
        .html(getMName(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

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


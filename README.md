# TG-Map
A Javascript Map for showing the Swiss canton Thurgau. It shows the municipalities and the lake of constance or "Bodensee" in german.
Demo will be available soon.

## Documentation

### Get the geodata
To get the data about the geographical shapes from Thurgau, I first needed to make the steps from [swiss maps](https://github.com/interactivethings/swiss-maps).
After that, I created the file "tg-municipalities" by entering the command

```
make topo/tg-municipalities-lakes.json
```

Thanks for [herrstucki](https://github.com/herrstucki) for helping me out.

## html file "index.html"
This is the smallest part of creating a javascript map. I made a link to "main.js", which will execute the code and make the map.
Furthermore there are links to the d3.js and the topojson.js scripts.
The design of the html file will be changed soon, but for this part, the design is unnecessary at the moment.

I will probably change this part of the documentation to make it more appealing for the eyes, after the website is built.

## The Javascript file "main.js"
This is the exciting part of creating the map.

### Initializing variables
First I need the variables for setting the size of the window and initializing centered, which will be used later, with the path:
```
var width = 1500,
    height = 900,
    centered;
```

To draw the shapes, I have to select the element in the html and make two variables.
The variable "svg" draws those shapes and "graph" will be used, when the mouse is hovering over a shape.
```
var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

var graph = d3.select("#graph").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
```

Class "tooltop" in css:
```
.tooltip {
    position: absolute;
    text-align: center;
    width: 100px;
    height: 28px;
    padding: 2px;
    font: 12px sans-serif;
    background: white;
    border-radius: 8px;
    pointer-events: none;
}
```

Furthermore I append the shape, the size, the background and a click event at svg.
```
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);
```

The class "Background" in css file:
```
.background {
    fill: none;
    pointer-events: all;
}
```

### Drawing Shapes
The function for drawing the municipalities and the lake of constance. All municipalities becomes the CSS-Id "municipalities" and the click and hover event.

```
d3.json("tg-municipalities-lakes.json", function(error, tg) {
    g.append("g")
        .attr("id", "municipalities")
        .selectAll("path")
        .data(topojson.feature(tg, tg.objects.municipalities).features)
        .enter().append("path")
        .attr("d", path)
        .on("click", clicked)
        .on("mouseover", mouseover);

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
```

And those are the CSS-Ids:
```
#lakes {
    fill: #b3b3f3;
}

#municipalities {
    fill: #e3e3e3;
}

#municipalities :hover {
    fill: #c7c7c7;
}

#municipalities .active {
    fill: orange;
}
```

### Mouse-Events
To make the map more interactive, an hover and a click event was given to the shapes.

#### Hover event
Change the color to Orange, when Mouse is hovering over the shape.
```
#municipalities .active {
    fill: orange;
}
```
By the way, it will be replaced with a javascript function in the future.


Outputting the name of the municipality as a popover by hovering over the shape.
```
function mouseover(d) {
    graph.style("opacity", .9)
        .html(getMName(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
}

function getMName(d) {
    for (i = 0; i < muniArr.length; i++) {
        if (d.id === muniArr[i][0]) {
            return muniArr[i][1];
            continue;
        }
    }
}
```

The function getMName returns the name of the municipality by detecting the associated ID. The Names are in an array.
I had to write every name of the municipalities.
```
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
```

Believe me, it wasn't pleasant to write all the names. But it won't stay forever, because I'll find a way to output the names from somewhere else.


## Upcoming features

* Window for visualising data, for example the amount of citizens for each municipality. The website will get those datas by opendata.ch
* Window for showing pictures of the landscape of every municipalities. It will get those pictures from the websites of the municipalities, instagram (perhaps), Google Images (perhaps) or from better sources.
* Moving in zoom

## Sources

* [Swiss-maps](https://github.com/interactivethings/swiss-maps) from InteractiveThings
* [Let's make a map](https://bost.ocks.org/mike/map/) by Mike Bostock

## Author
Mike Zye
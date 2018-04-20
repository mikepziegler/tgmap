Gemeinde = ["Tägerwilen", "Kreuzlingen", "Romanshorn"];

var map = new L.Map("map", {center: [47.55, 9.15], zoom: 11})
    .addLayer(new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"));

map.options.minZoom = 11;

L.control.scale().addTo(map);

L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
    attribution: '<a href="http://openstreetmap.org/copyright">OpenStreetMap Contributors</a>'
}).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
        console.log(d);
        return "<strong>Gemeinde:</strong> <span> " + d.properties.name + "</span>";
    })

svg.call(tip);

d3.json("json/tg-municipalities.json", function(error, tg) {
    if (error) throw error;

    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }

    tg = topojson.feature(tg, tg.objects.municipalities);
    var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);

    var feature = g.selectAll("path")
        .data(tg.features)
        .enter().append("path")
        .on('click', tip.show)
        .on('', tip.hide);

    svg.selectAll('path')
        .style('fill', function(d) {
            if (d.properties.name == Gemeinde[0]) {
                return "green";
            }
            if (d.properties.name == Gemeinde[1]) {
                return "orange";
            }
            if (d.properties.name == Gemeinde[2]) {
                return "red";
            }
        })

    map.on("zoom", reset);
    reset();

    function reset() {
        var bounds = path.bounds(tg),
            topLeft = bounds[0],
            bottomRight = bounds[1];

        svg.attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");

        g.attr("transform", "translate(" + ( -topLeft[0]) + "," + ( -topLeft[1]) + ")");

        feature.attr("d", path);
    }
});

var ftruescreen = L.control.custom({
    position: 'topleft',
    content : `
<button type="button" class="btn btn-default" id="sizeu" onclick="enterFullscreen(document.getElementById('map'))">
    <i style="font-size:18px;" class="fa">&#xf065;</i>
</button>
        `,
    classes : 'btn-group-vertical btn-group-sm',
    style   :
        {
            margin: '10px',
            padding: '0px 0 0 0',
            cursor: 'pointer',
        },
    datas   :
        {
            'foo': 'bar',
        }
});

var ffalsescreen = L.control.custom({
    position: 'topleft',
    content :`
<button type="button" class="btn btn-default" id="sized" onclick="exitFullscreen()">
    <i style="font-size:18px;" class="fa">&#xf066;</i>
</button>
       `,
    classes : 'btn-group-vertical btn-group-sm',
    style   :
        {
            margin: '10px',
            padding: '0px 0 0 0',
            cursor: 'pointer',
        },
    datas   :
        {
            'foo': 'bar',
        }
});

ftruescreen.addTo(map);

document.cancelFullScreen = document.webkitExitFullscreen || document.mozCancelFullScreen || document.exitFullscreen;


function onFullScreenEnter(elem) {
    elem.onwebkitfullscreenchange = onFullScreenExit;
    elem.onmozfullscreenchange = onFullScreenExit;
};

function onFullScreenExit() {

};

function enterFullscreen(elem) {
    elem.onwebkitfullscreenchange = onFullScreenEnter(elem);
    elem.onmozfullscreenchange = onFullScreenEnter(elem);
    elem.onfullscreenchange = onFullScreenEnter(elem);
    if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else {
        if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else {
            elem.requestFullscreen();
        }
    }

    ftruescreen.remove();
    ffalsescreen.addTo(map);

    document.getElementById('map').className = "active";
}

function exitFullscreen() {
    document.cancelFullScreen();

    ftruescreen.addTo(map);
    ffalsescreen.remove();

    document.getElementById('map').className = "";
}
//Assign specific API key to variable and set map scope to the United States

var mapboxAccessToken = 'pk.eyJ1IjoidGpqYXJhbWlsbG8iLCJhIjoiY2thaDRlems4MGZveTJxcDd1ejRjZjNiNiJ9.NhJlFIMEqq7BBSs2FPHUjw';
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: ...,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

L.geoJson(statesData).addTo(map);

//Set color gradient depending on fraud dollar amount by state
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
//Define function so that fill color depends on dollar amount of fraud by state and separating each state with a dashed line
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

//Define function that gives a highlighting feature when user hovers over state with mouse
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

//Reset mouseover with a mouseout function so highlught effect doesn't overlap
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
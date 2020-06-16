function buildMap() {
  var map = L.map("choropleth").setView([37.8, -96], 4);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/light-v9",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);

  console.log("first layer", map);

  // control that shows state info on hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML =
      "<h4>State Fraud & Identity Theft Info</h4>" +
      (props
        ? "<b>" +
          props.name +
          "</b><br />" +
          "<b>Rank: </b>" +
          props.Rank +
          "<br />" +
          "<b>Reports per 100K: </b>" +
          props.RP100 +
          "<br />" +
          "<b>Top Fraud Type: </b>" +
          props.Top +
          "</b><br />" +
          "<b>Total Loss: </b>" +
          "$ " +
          numberWithCommas(props.total_loss)
        : "Hover over a state");
  };

  info.addTo(map);

  console.log("second layer", info);

  // get color depending on state rank
  function getColor(d) {
    return d > 900
      ? "#800026"
      : d > 800
      ? "#BD0026"
      : d > 700
      ? "#E31A1C"
      : d > 600
      ? "#FC4E2A"
      : d > 500
      ? "#FD8D3C"
      : d > 400
      ? "#FEB24C"
      : d > 300
      ? "#FED976"
      : "#FFEDA0";
  }

  function style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.RP100),
    };
  }

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  var geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  }

  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 300, 400, 500, 600, 700, 800, 900],
<<<<<<< HEAD
      labels = ["<strong> Reports per 100K <br>Population</br> </strong>"],
=======
      labels = [
        <b>
          Reports per 100K <br />
          Population
        </b>,
      ],
>>>>>>> 46bf56671178919b2ce64677eab480ee72d351b3
      from,
      to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<i style="background:' +
          getColor(from + 1) +
          '"></i> ' +
          from +
          (to ? "&ndash;" + to : "+")
      );
    }

    div.innerHTML = labels.join("<br>");
    return div;
  };
  legend.addTo(map);

  geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  map.attributionControl.addAttribution(
    'Fraud report data &copy; <a href="https://www.ftc.gov/">Federal Trade Commission</a>'
  );
}

buildMap();

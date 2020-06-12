function buildMap(){

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

      console.log("first layer", map)

      // control that shows state info on hover
      var info = L.control();

      info.onAdd = function (map) {
        this._div = L.DomUtil.create("div", "info");
        this.update();
        return this._div;
      };

      info.update = function (props) {
        this._div.innerHTML =
          "<h4>State Fraud Info</h4>" +
          (props
            ? "<b>" +
              props.name +
              "</b><br />" +
              "<b>Rank: </b>" +
              props.Rank +
              "<br />" +
              "<b>Top Fraud Type: </b>" +
              props.Top +
              "</b><br />" +
              "<b>Total Dollars Lost: </b>" +
              "$ " +
              props.total_loss
            : "Hover over a state");
      };

      info.addTo(map);

      console.log("second layer", info)

      // get color depending on state rank
      function getColor(d) {
        return d < 5
          ? "#800026"
          : d < 10
          ? "#BD0026"
          : d < 20
          ? "#E31A1C"
          : d < 30
          ? "#FC4E2A"
          : d < 35
          ? "#FD8D3C"
          : d < 40
          ? "#FEB24C"
          : d < 45
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
          fillColor: getColor(feature.properties.Rank),
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

      geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature,
      }).addTo(map);

      map.attributionControl.addAttribution(
        'Population data &copy; <a href="http://census.gov/">US Census Bureau</a>'
      );

};




    buildMap();


//window.onload(init);

//document.addEventListener("load", init());
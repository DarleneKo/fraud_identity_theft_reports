// Fetch the data from flask route and console log it for 3rd CSV File
function charting(){
  var reportFinal = [];
  d3.json("/api/v1.0/report_counts").then(function (data3) {
    console.log("third csv", data3);

      // Create a Function to Build the Line Chart
      function buildChart(line) {
        console.log("line chart", line);

      // Grab values from the data json object
      var reports = line.map(function (o) {
            return {
              date: o.Year,
              reportCount: parseFloat(o.ReportNumber)
            }
          });

          for(var i=0; i<reports.length; i++) {
             reportFinal.push({date: reports[i].date, count: parseFloat(reports[i].reportCount)})
      }

      console.log("firstcheck", reportFinal);
      }

    buildChart(data3);
    console.log("check", reportFinal.length);

  })
  return reportFinal
}

// Create a Function to Build the Line Chart using Billboard.js Library

function init(){
  var reportF2 = charting();
  var reportCount = [];
  var reportYear = [];
  setTimeout(function(){
    reportYear.push("x");
    reportCount.push("Number of Reports");
    for(var i=0; i<reportF2.length; i++) {
      console.log(reportF2[i])
       reportYear.push(reportF2[i].date + "-01-01")
       reportCount.push(parseFloat(reportF2[i].count))
     }
    var chart = bb.generate({
      data: {
        x: "x",
        columns: [
          reportYear,
          reportCount
        ]
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y"
          }
        }
      },
      bindto: "#timeseriesChart"
    })
  }, 1000);
}

init()

// Fetch the CSV data and console log it for 3rd CSV File
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

      //reportF2 = reportFinal.slice();
      //console.log("test1", reportF2);
      }

    buildChart(data3);
    console.log("check", reportFinal.length);

  })
  return reportFinal
}

function init(){
  var reportF2 = charting();
  var reportCount = [];
  var reportYear = [];
  setTimeout(function(){
    reportYear.push("x");
    reportCount.push("Number of Fraud & Other Reports");
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


// ["x", "2001-01-01", "2002-01-01", "2003-01-01", "2004-01-01", "2005-01-01", "2006-01-01", "2007-01-01", "2008-01-01",
//"2009-01-01", "2010-01-01", "2011-01-01", "2012-01-01", "2013-01-01", "2014-01-01", "2015-01-01", "2016-01-01",
//"2017-01-01", "2018-01-01", "2019-01-01"],

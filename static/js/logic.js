// Fetch the CSV data and console log it for 1st CSV File
d3.csv('/resources/fraud_reports.csv').then(function (data1) {
    console.log("first csv", data1);
    
    // Fetch the CSV data and console log it for 2nd CSV File
    d3.csv('/resources/top_ten.csv').then(function (data2) {
        console.log("second csv", data2);

        // Create a Function to Build the List of States
        function buildList(demographics) {
            console.log("demographics", demographics);

            // Grab values from the data json object to build the list of States
            var stateList = demographics.map(function (o) {
                return o.State
                }
            );
            console.log("state list", stateList);

            // Define variable to select the Dropdown Menu Option from HTML file and append the Looped through States
            var static = d3.select("#selDataset")
            stateList.forEach(function (state) {
                static.append("option")
                    .text(state)
                    .attr("value", state)
            })
        }

        // Creat a Function to Build the Report Information
        function buildInfo(data1,state) {
            console.log("data", data1);
            console.log("dropdown state", state);

            // Grab values from the data json object by matching on State to build the Factual Information
            var stateInfo = data1.filter(info => info.State == state)
            var totalReports = stateInfo.map(info => +info.ReportNumber);
            var totalLoss = stateInfo.map(info => +info.TotalLoss);
            var medianLoss = stateInfo.map(info => +info.MedianLoss);

            totalReports = totalReports ? totalReports[0]: 0;
            totalLoss =  totalLoss ? totalLoss[0]: 0;
            medianLoss =  medianLoss ? medianLoss[0]: 0;

            console.log("total reports", totalReports);
            console.log("total loss", totalLoss);
            console.log("median loss", medianLoss)

            fraudInfo = {
                "Total Fraud Reports: " : totalReports,
                "Total Loss: $" : totalLoss,
                "Median Loss: $" : medianLoss
            };

            // Select Information Panel to a div tag with id "facts" from HTML file to place data
            var factualInfo = d3.select("#facts");
        
            // Clear the Demographic Panel each time before a new State is selected
            factualInfo.html("");
  
            // Extract the key and value pair after looping through each State and Appending to the Information Panel
            Object.entries(fraudInfo).forEach(([key, value]) => {   
                factualInfo.append("h6").text(`${key}${value}`);    
            });
        }
        
        
        // Create a Function to Build the Bar Chart  
        function buildPlot(data2,state) {

            // Grab values from the data json object by matching on State to build the Bar Chart
            var info = data2.map(function (information) {
                if (information.State == state) {
                    return (information.State)
                }
            })
            console.log("info", info);
   
            // Define variable to later be utilized after Looping through Entire Row of Data
            var oneState=[]

            data2.forEach(function (stateData) {
                if (stateData.State == state) {
                    oneState.push(stateData);
                }
            })

            console.log("one state", oneState);

            // Create the x-Axis and y-Axis by looping through each Report and Category
            var xAxis = [];
            oneState.forEach(function(obj){
                xAxis.push(obj["Reports"]);
            })
    
            var yAxis = [];
            oneState.forEach(function(obj){
                yAxis.push(obj["Category"]);
            })

            // Create the trace for Bar Chart
            var trace1 = [{
                x: xAxis.reverse(),
                y: yAxis.reverse(),
                type: 'bar',
                orientation: 'h'
            }];

            // Create the data array for the Bar Chart
            var data3 = trace1;

            // Define the plot layout for the Bar Chart
            var layout1 = {
                title: "Top 10 Report Categories (Fraud, Identity Theft & Other) per State in 2019",
                margin: {
                    t: 50,
                    b: 50,
                    l: 350,
                    r: 50 
                }
            };
       
            // Plot the chart to a div tag with id "bar"
            Plotly.newPlot("bar", data3, layout1);
        }

        // Call the buildList Function
        buildList(data1);

        // Call the buildPlot Function after attaching an Event Listener to select a State from Dropdown Menu
        d3.select('#selDataset').on('change', function () {
            state = d3.select(this).property('value');
            console.log("state", state);
            buildInfo(data1, state);
            buildPlot(data2, state);
        })


        // Create a Function to Display the Initial Data Rendering on the First State
        function init() {
            var firstState = data1[0].State;
            buildInfo(data1, firstState);
            buildPlot(data2, firstState);
        }

        // Call the init Function
        init();
    })
})
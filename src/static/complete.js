var schoolName = [],
  tuitionOut = [],
  tuitionIn = [],
  tuitionIn = [],
  schoolLat = [],
  schoolLong = [],
  schoolState = [],
  schoolCity = [],
  facultySalary = [],
  expenditurePerStudent = [],
  tuitionRevenuePerStudent = [];


var url = `/metric`;
// console.log("url: ", url)

d3.json(url).then((data) => {
  // console.log(data)
  data.forEach((item) => {
    // console.log(item.Fips)
    schoolName.push(item.schoolName)
    tuitionOut.push(item.tuitionOut)
    tuitionIn.push(item.tuitionIn)
    schoolLat.push(item.schoolLat)
    schoolLong.push(item.schoolLong)
    schoolState.push(item.Fips)
    schoolCity.push(item.schoolCity)
    facultySalary.push(item.facultySalary)
    expenditurePerStudent.push(item.expenditurePerStudent)
    tuitionRevenuePerStudent.push(item.tuitionRevenuePerStudent)
  });

  // // Function for thousands formatting
  // function thousands_separators(num) {
  //   num.toString()
  //   var num_parts = num.toString().split(".");
  //   num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   // return num_parts.join(".");
  //   return num_parts[0];
  // }

  var listofStates = [], // Stores all the State names
    citySizeInState = [], // 1. Size of Marker "In-State Tuition"
    citySizeOutState = [], // 2. Size of Marker "Out-of-State Tuition"
    tuitionInState = [], // 3. Tuition in State $
    tuitionOutState = [], // 4 Tuition out of State $
    listofCities = [], // 5. Stores the list of the cities
    hoverText = [], // 6. Information for presenting in the hover
    listLat = [], // 7. Longitude
    listLong = [], // 8. Latitude
    citySize = [], // 9. Variable to be use depending the user selection
    expPerStudent = [], // 10. Variable to bring the expenditure per student
    facSalary = [], // 11. Faculty Salary
    tuRevPerStudent = [], // 12. Tuition Revenue per Student
    scaleTuition = 3000, // 
    scaleExp = 3000,
    scaleFac = 1000,
    scaleRev = 3000,
    scaleVar = 0; // Used to store the variable scales

  // Loop for getting all State Names
  for (var i = 0; i < schoolState.length; i++) {
    if (listofStates.indexOf(schoolState[i]) === -1) {
      listofStates.push(schoolState[i]);
    }
  }

  // Function to get the data of a specific State or City
  function getStateData(chosenVariable, chosenState, chosenCity) {

    // Initialize list to store the data variables
    citySizeInState = [], // 1. Size of Marker "In-State Tuition"
      citySizeOutState = [], // 2. Size of Marker "Out-of-State Tuition"
      tuitionInState = [], // 3. Tuition in State $
      tuitionOutState = [], // 4 Tuition out of State $
      listofCities = [], // 5. Stores the list of the cities
      hoverText = [], // 6. Information for presenting in the hover
      listLat = [], // 7. Longitude
      listLong = [], // 8. Latitude
      citySize = [], // 9. Variable to be use depending the user selection
      expPerStudent = [], // 10. Variable to bring the expenditure per student
      facSalary = [], // 11. Faculty Salary
      tuRevPerStudent = []; // 12. Tuition Revenue per Student

    // The function Stores all the data to the lists
    function dataToList() {
      currentSizeOut = tuitionOut[i] / scaleTuition; //  1. Placeholder for the loop - "Out-of-State Tuition" - Marker Size
      currentSizeIn = tuitionIn[i] / scaleTuition; //  2. Placeholder for the loop - "In-State Tuition" - Marker Size
      currentTuitionIn = tuitionOut[i] // 3. Placeholder for the loop - "Out-of-State Tuition" - Actual Value in $
      currentTuitionOut = tuitionIn[i] // 4. Placeholder for the loop - "In-State Tuition" - Actual Value in $

      currentCity = schoolCity[i]; // 5. Stores the list of the cities for the chosen State
      // 6. Information for the hoover text
      var currentText = "<b> Name: " + schoolName[i] + "</b>"
        + "<br><b> City: </b>" + schoolCity[i]
        + "<br><b> State: </b>" + schoolState[i]
        + "<br><b> Geolocation: </b>(" + schoolLat[i] + "," + schoolLong[i] + ")"
        + "<br><b> Annual Out of State Tuition: </b>" + "$" + tuitionOut[i]
        + "<br><b> Annual In-State Tuition: </b>" + "$" + tuitionIn[i]
        + "<br><b> Annual Expenditure per Student: </b>" + "$" + expenditurePerStudent[i]
        + "<br><b> Annual Tuition Revenue per Student: </b>" + "$" + tuitionRevenuePerStudent[i];
      currentLat = schoolLat[i]; // 7. Placeholder for the loop - Latitude
      currentLong = schoolLong[i]; // 8. Placeholder for the loop - Longitude

      currentExpen = expenditurePerStudent[i] / scaleExp; // B. 10. Placeholder for the loop - "Expendiure per Student - Marker Size
      currentFacSal = facultySalary[i] / scaleFac; // 11. Placeholder for the loop - Faculty Salary - Marker Size
      currentRevStu = tuitionRevenuePerStudent[i] / scaleRev // 12. Placeholder for the loop - Tuition Revenue per Student - Marker Size

      // Stores all the placeholder values to the lists
      citySizeOutState.push(currentSizeOut); // 1.
      citySizeInState.push(currentSizeIn); // 2. 
      tuitionInState.push(currentTuitionIn); // 3. 
      tuitionOutState.push(currentTuitionOut); // 4. 
      listofCities.push(currentCity); // 5.

      hoverText.push(currentText); // 6.
      listLat.push(currentLat); // 7. 
      listLong.push(currentLong); //8.
      expPerStudent.push(currentExpen) // 10.
      facSalary.push(currentFacSal) // 11.
      tuRevPerStudent.push(currentRevStu) // 12.
    }

    // 
    for (var i = 0; i < schoolState.length; i++) { // Loops all the dataset
      if (chosenState === "All") { // if Chosen State is "All" bring that information and
        dataToList() // Stores the data that fullfill the condition of all States
        listofCities = [] // if Chosen State All, clear the list of cities
      } else if (schoolState[i] === chosenState) { // Extracts information only for the state chosen by the user
        if (chosenCity == "All") { // if it user choose all the cities, bring information of all cities
          dataToList()
        } else if (schoolCity[i] === chosenCity) {  // If user choose only one city, bring information from that city
          dataToList() // Stores the data that fullfill the condition of chosenState
        }
      }
    }

    switch (chosenVariable) {
      case "Annual In-State Tuition":
        citySize = citySizeInState;
        // document.querySelector('.textmap').innerText = "In-state tuition and fees"
        d3.select(".textmap")
        .html("")
        .append()
        .html("<p>In-state tuition and fees.</p>")
        scalevar = scaleTuition
        break;
      case "Annual Out of State Tuition":
        citySize = citySizeOutState;
        // document.querySelector('.textmap').innerText = "Out-of-state tuition and fees"
        d3.select(".textmap")
        .html("")
        .append()
        .html("<p>Out-of-state tuition and fees.</p>")
        scalevar = scaleTuition
        break;
      case "Annual Expenditure per Student":
        citySize = expPerStudent;
        // document.querySelector('.textmap').innerText = "Instructional expenditures divided by the number of FTE students (undergraduates and graduate students) (http://nces.ed.gov/ipeds/glossary/index.asp?id=854). Instructional expenditures are included in the IPEDS Finance component and FTE enrollment is included in the IPEDS 12-Month Enrollment component. This metric includes graduate students."
        d3.select(".textmap")
        .html("")
        .append()
        .html(`<p>Instructional expenditures divided by the number of FTE students (undergraduates and graduate students) (<a href = 'http://nces.ed.gov/ipeds/glossary/index.asp?id=854' target = '__blank'> http://nces.ed.gov/ipeds/glossary/index.asp?id=854</a>). Instructional expenditures are included in the IPEDS Finance component and FTE enrollment is included in the IPEDS 12-Month Enrollment component. This metric includes graduate students.</p>`)
        scalevar = scaleExp
        break;
      case "Annual Faculty Salary":
        citySize = facSalary;
        // document.querySelector('.textmap').innerText = "Average faculty salary per month, calculated from the IPEDS Human Resources component. This metric is calculated as the total salary outlays divided by the number of months worked for all full-time nonmedical instructional staff. Prior to the 2011-12 academic year, when months worked were reported in groups, the value for 9-10 months is estimated as 9.5 months and the value for 11-12 months is estimated as 11.5 months. Values prior to the 2003-04 academic year are limited to degree-granting institutions for consistency with values in subsequent academic years."
        d3.select(".textmap")
        .html("")
        .append()
        .html(`<p> Average faculty salary per month, calculated from the IPEDS Human Resources component. This metric is calculated as the total salary outlays divided by the number of months worked for all full-time nonmedical instructional staff. Prior to the 2011-12 academic year, when months worked were reported in groups, the value for 9-10 months is estimated as 9.5 months and the value for 11-12 months is estimated as 11.5 months. Values prior to the 2003-04 academic year are limited to degree-granting institutions for consistency with values in subsequent academic years.</p>`)
        scalevar = scaleFac
        break;
      case "Annual Tuition Revenue per Student":
        // document.querySelector('.textmap').innerText = "Net tuition revenue (tuition revenue minus discounts and allowances) divided by the number of FTE students (undergraduates and graduate students) (http://nces.ed.gov/ipeds/glossary/index.asp?id=854). Net tuition revenue is included in the IPEDS Finance component and FTE enrollment is included in the IPEDS 12-Month Enrollment component. This metric includes graduate students."
        d3.select(".textmap")
        .html("")
        .append()
        .html(`<p>Net tuition revenue (tuition revenue minus discounts and allowances) divided by the number of FTE students (undergraduates and graduate students) (<a href = "http://nces.ed.gov/ipeds/glossary/index.asp?id=854" target="__blank">http://nces.ed.gov/ipeds/glossary/index.asp?id=854</a>). Net tuition revenue is included in the IPEDS Finance component and FTE enrollment is included in the IPEDS 12-Month Enrollment component. This metric includes graduate students.</p>`)

        citySize = tuRevPerStudent;
        scalevar = scaleRev
        break;
    };
  };
  // Initial Values for the user selection with the dropdown
  setBubblePlot("Annual Expenditure per Student", 'All', "All")

  // Function that creates the plots
  function setBubblePlot(chosenVariable, chosenState, chosenCity) {

    document.querySelector('.maptitle').innerHTML = "<h3><b>" + chosenVariable + " Weights" + "</b></h3>"
    document.querySelector('.maptext').innerHTML = "<h5><b>State: </b>" + chosenState + " - <b> City: </b>" + chosenCity + "</h5>"

    // Calls the function that brings the data depending on the user selection
    getStateData(chosenVariable, chosenState, chosenCity);
    // Plotly setup for the map
    var data_map = [{
      type: 'scattergeo',
      locationmode: 'USA-states',
      lat: listLat,
      lon: listLong,
      text: hoverText,
      hoverinfo: 'text',
      marker: {
        size: citySize,
        line: {
          color: 'black',
          width: 2
        },
      }
    }];

    // Layout for the map
    var layout_map = {
      // title: chosenVariable,
      title: "United States - State View",
      font: {
        family: 'Arial, Helvetica, sans-serif',
        size: 20
      },
      autosize: false,
      width: 900,
      // height: 500,
      margin: {
        l: 250,
        r: 0,
        b: 0,
        t: 0,
        pad: 4
      },
      showlegend: false,
      geo: {
        scope: 'usa',
        resolution: 50,
        lonaxis: {
          'range': [-180, -55]
        },
        lataxis: {
          'range': [40, 70]
        },
        projection: {
          type: 'albers usa'
        },
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: 'rgb(255,255,255)',
        countrycolor: 'rgb(255,255,255)'
      },
    };

    // Plot Map
    Plotly.newPlot('plotdivmap', data_map, layout_map, { responsive: true })

  };

  // Select html dropdown containing the information
  var variableInfoSelector = document.querySelector('.variabledata'),
    stateSelector = document.querySelector('.statedata'),
    citySelector = document.querySelector('.citydata');

  // Funciton that fills the a dropdown  
  function assignOptions(textArray, selector, addAll, unique) {
    // Clear previous dropdown contents
    // selector.innerHTML = ""
    // selector.options.length = 0
    selector.innerText = null
    // Sort the content in the list
    textArray.sort()
    // Adds all at the beginning
    if (addAll == true) { textArray.unshift("All") }
    // Brings only unique elements
    if (unique == true) { textArray = (unique = [...new Set(textArray)]) }
    // Creates the element in the dropdown in the html page
    for (var i = 0; i < textArray.length; i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
    }
  }

  assignOptions(listofStates, stateSelector, true, true),
    assignOptions([], citySelector, true, true),
    assignOptions([
      "Annual In-State Tuition",
      "Annual Out of State Tuition",
      "Annual Expenditure per Student",
      "Annual Faculty Salary",
      "Annual Tuition Revenue per Student"
    ], variableInfoSelector, false, true);

  function updateState() {
    setBubblePlot(variableInfoSelector.value, stateSelector.value, citySelector.value)
    assignOptions(listofCities, citySelector, true, true)
    gauge_chart(variableInfoSelector.value, stateSelector.value, citySelector.value)
  };

  function updateCity() {
    setBubblePlot(variableInfoSelector.value, stateSelector.value, citySelector.value)
    gauge_chart(variableInfoSelector.value, stateSelector.value, citySelector.value)
  }

  variableInfoSelector.addEventListener('change', updateState, false),
    stateSelector.addEventListener('change', updateState, false),
    citySelector.addEventListener('change', updateCity, false);


  ///// Fase II Gauge

  // Variables by Default

  gauge_chart("Annual Expenditure per Student", 'All', "All")

  function gauge_chart(chosenVariable, chosenState, chosenCity) {

    document.querySelector('.gaugetitle').innerHTML = "<h3><b>" + chosenVariable + " Averages" + "</b></h3>"
    document.querySelector('.gaugetext').innerHTML = "<h5><b>State: </b>" + chosenState + " - <b> City: </b>" + chosenCity + "</h5>"

    var url_2 = `/metric/country`
    var url_3 = `/metric/` + encodeURIComponent(chosenState.trim());
    var url_4 = `/metric/` + encodeURIComponent(chosenState.trim()) + `/` + encodeURIComponent(chosenCity.trim());
    var url_5 = '/metric/table/country'
    var url_6 = `/metric/table/` + encodeURIComponent(chosenState.trim());
    var url_7 = `/metric/table/` + encodeURIComponent(chosenState.trim()) + `/` + encodeURIComponent(chosenCity.trim());

    label_2 = 'State'
    label_3 = 'City'

    if (chosenState == 'All') {
      label_2 = 'Country'
      url_3 = url_2
      label_3 = 'Country'
      url_4 = url_2
      url_table = url_5
      label_table = "State" 
    } else if (chosenCity == 'All') {
      label_2 = 'State'
      label_3 = 'State'
      url_4 = url_3
      url_table = url_6
      label_table = "City" 
    } else if (chosenCity != 'All') {
      url_table = url_7
      label_table = "School" 
    }

    document.querySelector('.tabletitle').innerHTML = "<h3><b>" + label_table + " Averages" + "</b></h3>"
    document.querySelector('.tabletext').innerHTML = "<h5><b>State: </b>" + chosenState + " - <b> City: </b>" + chosenCity + "</h5>"



    // console.log("url_2: ", url_2)
    d3.json(url_2).then((data) => {
      state_country = data[0].State
      noSchools_country = data[0].No_Schools
      tuitionIn_country = data[0].tuitionIn
      tuitionOut_country = data[0].tuitionOut
      expenditure_country = data[0].expenditure
      facSalary_country = data[0].facSalary
      tuiRevenue_country = data[0].tuiRevenue

      d3.json(url_3).then((data) => {
        // console.log(data[0].State)
        state_st = data[0].State
        noSchools_st = data[0].No_Schools
        tuitionIn_st = data[0].tuitionIn
        tuitionOut_st = data[0].tuitionOut
        expenditure_st = data[0].expenditure
        facSalary_st = data[0].facSalary
        tuiRevenue_st = data[0].tuiRevenue

        // console.log(url_4)
        d3.json(url_4).then((data) => {
          // console.log(data[0].State)
          state_city = data[0].State
          noSchools_city = data[0].No_Schools
          tuitionIn_city = data[0].tuitionIn
          tuitionOut_city = data[0].tuitionOut
          expenditure_city = data[0].expenditure
          facSalary_city = data[0].facSalary
          tuiRevenue_city = data[0].tuiRevenue

          d3.json(url_table).then((data) => {
          line = []
          list_of_lines = []
            // console.log(data)
            data.forEach((item) => {
              // console.log(item.Fips)
              line = []
              line.push(item.State)
              line.push(item.No_Schools)
              line.push(item.expenditure)
              line.push(item.facSalary)
              line.push(item.tuiRevenue)
              line.push(item.tuitionIn)
              line.push(item.tuitionOut)
              list_of_lines.push(line)
            });

            switch (chosenVariable) {
              case "Annual In-State Tuition":
                redTo = 30000
                redFrom = redTo * 6 / 8
                yellowFrom = redTo * 5 / 8
                yellowTo = redTo * 6 / 8
                countryAvg = tuitionIn_country
                stateAvg = tuitionIn_st
                cityAvg = tuitionIn_city
                break;
              case "Annual Out of State Tuition":
                redTo = 35000
                redFrom = redTo * 6 / 8
                yellowFrom = redTo * 5 / 8
                yellowTo = redTo * 6 / 8
                countryAvg = tuitionOut_country
                stateAvg = tuitionOut_st
                cityAvg = tuitionOut_city
                break;
              case "Annual Expenditure per Student":
                redTo = 20000
                redFrom = redTo * 6 / 8
                yellowFrom = redTo * 5 / 8
                yellowTo = redTo * 6 / 8
                countryAvg = expenditure_country
                stateAvg = expenditure_st
                cityAvg = expenditure_city
                break;
              case "Annual Faculty Salary":
                redTo = 12000
                redFrom = redTo * 6 / 8
                yellowFrom = redTo * 5 / 8
                yellowTo = redTo * 6 / 8
                countryAvg = facSalary_country
                stateAvg = facSalary_st
                cityAvg = facSalary_city
                break;
              case "Annual Tuition Revenue per Student":
                redTo = 25000
                redFrom = redTo * 6 / 8
                yellowFrom = redTo * 5 / 8
                yellowTo = redTo * 6 / 8
                countryAvg = tuiRevenue_country
                stateAvg = tuiRevenue_st
                cityAvg = tuiRevenue_city
                break;
            };


            // console.log("stateAvg", stateAvg)

            google.charts.load('current', { 'packages': ['gauge'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

              var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Country', countryAvg],
                [label_2, stateAvg],
                [label_3, cityAvg]
              ]);

              var options = {
                width: 400, height: 220,
                redFrom: redFrom, redTo: redTo,
                yellowFrom: yellowFrom, yellowTo: yellowTo,
                max: redTo,
                minorTicks: 5
              };

              var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

              chart.draw(data, options);


              google.charts.load('current', {'packages':['table']});
              google.charts.setOnLoadCallback(drawTable);
        
              function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', label_table);
                data.addColumn('number', 'No Schools');
                data.addColumn('number', 'Tuition in State');
                data.addColumn('number', 'Tuition Out of State');
                data.addColumn('number', 'Expenditure per Student');
                data.addColumn('number', 'Faculty Salary');
                data.addColumn('number', 'Tuition Revenue');
          
                data.addRows(list_of_lines);
        
                var table = new google.visualization.Table(document.getElementById('table_div'));
        
                table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
              }



              
            }
          })
        })
      })
    })
  }
});



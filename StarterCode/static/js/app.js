// from data.js
var fullTableData = data;
// Declare component variables
var resetButton = d3.select("#reset-btn");
var filterButton = d3.select("#filter-btn");
var inputDate = d3.select("#datetime");
var selectCity = d3.select("#inputGroupSelectCity");
var selectState = d3.select("#inputGroupSelectState");
var selectShape = d3.select("#inputGroupSelectShape");
// Create ES6 set of distinct cities, states, shapes
const distinctCities = [...new Set(fullTableData.map(x => x.city))].sort();
const distinctStates = [...new Set(fullTableData.map(x => x.state))].sort();
const distinctShapes = [...new Set(fullTableData.map(x => x.shape))].sort();

// Loop through array of objects then each object in data
function loadTableData(tableData) {
    // Clear tbody
    d3.select("tbody").selectAll("tr").remove();
    // Loop through data
    tableData.forEach((rowData) => {
        // Create a table row
        var trData = d3.select("tbody").append("tr");
        // Get the entries for each object in the array
        Object.entries(rowData).forEach(([key, value]) => {
            // Create table data
            trData.append("td").text(`${value}`);
        });
    });
    console.log(`Table data length: ${tableData.length}`);
};

// Create a custom filtering function
function selectFilter(rowData) {
    // Filter by date
    var result = (new Date(rowData.datetime)).getTime() >= (new Date(inputDate.property("value"))).getTime();
    // Filter by City
    if (selectCity.property("value") != "All") {
        result = (result && (rowData.city === selectCity.property("value")));
    };
    // Filter by State
    if (selectState.property("value") != "All") {
        result = (result && (rowData.state === selectState.property("value")));
    };
    // Filter by Shape
    if (selectShape.property("value") != "All") {
        result = (result && (rowData.shape === selectShape.property("value")));
    };
    return result;
};

// Define the click handler inline for filter table
filterButton.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // filter() uses the custom function as its argument
    var filterTableData = fullTableData;
    filterTableData = filterTableData.filter(selectFilter);    
    
    // Reload Table Data
    loadTableData(filterTableData);
});

// Define the click handler inline for reset filter
resetButton.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Reset date to default
    inputDate.property("value", "1/1/2010");
    // Reset all select boxes to default All
    var elements = document.getElementsByTagName('select');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].selectedIndex = 0;
    };
});

/* Initial Load of all components*/
function initComponents() {
    // Load input group select City
    distinctCities.forEach((city) => {
        selectCity.append("option").text(`${city}`);
    });
    // Load input group select State
    distinctStates.forEach((state) => {
        selectState.append("option").text(`${state}`);
    });
    // Load input group select Shape
    distinctShapes.forEach((shape) => {
        selectShape.append("option").text(`${shape}`);
    });
    // Load full table data
    loadTableData(fullTableData);
};

// Run initialize
initComponents();
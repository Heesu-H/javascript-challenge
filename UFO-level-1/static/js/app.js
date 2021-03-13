// from data.js
var tableData = data;

// selecting input field and button 
var inputDate =  d3.select("#datetime")
var button = d3.select('#filter-btn')
var enterPress = d3.select('.filters')


// get the reference for the body
var oldBody = document.getElementsByTagName("tbody")[0];
console.log(oldBody)

//adding data into table
var tableBody = d3.select('tbody')

tableData.forEach(dataRow => {
    var tableRow = tableBody.append("tr");
    Object.entries(dataRow).forEach(([key,value]) => {
        var cell = tableRow.append('td');
        cell.text(value);
    })
})


function filterDate() {
    
    // Prevent the page from refreshing
    d3.event.preventDefault();

     // Get the value property of the input element
    var inputValue = inputDate.property("value");
    
    //creating array of filtered date
    filteredData = tableData.filter(data => Date.parse(data.datetime) === Date.parse(inputValue));
    console.log(filteredData);

    // if whats entered is nothing then return the original table
    if (inputValue === "") {

        //create new table body
        var new_tbody = document.createElement('tbody');
        //select the new table body with d3
        var newBody = d3.select(new_tbody)

        // create new table with newBody 
        tableData.forEach(dataRow => {
            var tableRow = newBody.append("tr");
            Object.entries(dataRow).forEach(([key,value]) => {
                var cell = tableRow.append('td');
                cell.text(value);
            })
        })

        // replace old table body with new table body
        oldBody.parentNode.replaceChild(new_tbody, oldBody)

    // else if the input value is a date then return a table with those dates only
    } else {
    
    //create new table body to replace old table body to update content
    var new_tbody = document.createElement('tbody');
    var newBody = d3.select(new_tbody);
    
    //create rows and append filtered data
    filteredData.forEach(dataRow => {
        var tableRow = newBody.append("tr");
        Object.entries(dataRow).forEach(([key,value]) => {
                var cell = tableRow.append('td');
                cell.text(value);
            })
        })

        //repalce old table body with nbew table body
        oldBody.parentNode.replaceChild(new_tbody, oldBody)

        
    }

    //assign new table as old table so another filter run can be made
    oldBody = new_tbody
}



// //creating event handlers for clicking the button or pressing the enter key
button.on('click',filterDate);
enterPress.on("submit",filterDate);

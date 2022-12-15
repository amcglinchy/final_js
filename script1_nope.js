let myMap;
myMap = L.map("map");

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

myMap.setView([40.7128, -74.0060], 16);



// if (($('input[name=ownership]').is(':checked')) === true){
//     return owner
//     return ownerValue
// }


// let checkClick = function (groupNAme, groupValue){
//     if (groupName == true){
//         return groupName
//         return groupValue
//     }

// let radioOwner = $('input[name=ownership]').is(':checked');
// let radioOwnerValue = $("input[name='ownership']:checked").val();
// let radioJobStatus = $('input[name=jobStatus]').is(':checked');
// let radioJobStatusValue = $("input[name='ownership']:checked").val();
// let radioJobType = $('input[name=jobType]').is(':checked');
// let radioJobTypeValue = $("input[name='jobType']:checked").val();

// $("input[type='radio']").click(function(){
//     let radioOwner = $('input[name=ownership]').is(':checked');
//     let radioOwnerValue = $("input[name='ownership']:checked").val();
//     let radioJobStatus = $('input[name=jobStatus]').is(':checked');
//     let radioJobStatusValue = $("input[name='ownership']:checked").val();
//     let radioJobType = $('input[name=jobType]').is(':checked');
//     let radioJobTypeValue = $("input[name='jobType']:checked").val();

//     if (radioOwner === true){
//         return radioOwnerValue
//     }
//     else if (radioJobStatus === true){
//         return radioJobStatusValue
//     }
//     else if (radioJobType === true){
//         return radioJobTypeValue
//     }
// });

let pnpFilter = ('Private Non-Profit: Corporation'|| 
    'Private Non-Profit: Partnership'||'Private Non-Profit: Individual'
    ||'Private Non-Profit: Condo/Co-Op'||'Private Non-Profit: Other')
let pfpFilter = ('Private For-Profit: Corporation'|| 
    'Private For-Profit: Partnership'||'Private For-Profit: Individual'
    ||'Private For-Profit: Condo/Co-Op'||'Private For-Profit: Other')
let govFilter = ('Government, City: Other'|| 
    'Government, City: Corporation'||'Government, Unspecified: Government Agency'
    ||'Government, City: HPD'||'Government, City: Partnership'|| 'Government, City: City Agency'
    ||'Government, City: NYCHA/HHC'||'Government, City: NYCHA'||'Government, City: Individual'||
    'Government, City: HHC'||'Government, State: NY State')
let filFilter = "1. Filed Application"
let appFilter = "2. Approved Application"
let permitFilter = "3. Permitted for Construction"
let partFilter = "4. Partially Completed Construction"
let compFilter = '5. Completed Construction'

let jobStatus
let jobType 

// help =  $.get('./HousingDB_post2010.csv', function(csvString) {
//     let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//     for (let i in data) {
//         let row = data[i];
//         if (row.Ownership === pnpFilter){
//             dataParse2();
//         }
//     }
//     console.log(own);
// });



let dataParse = function(filterValue){
    $.get('./HousingDB_post2010.csv', function(csvString) {
        let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        for (let i in data) {
            let row = data[i];
                if (row.Ownership === (filterValue)){
                     marker = L.circleMarker([row.Latitude, row.Longitude], 
                        {radius: 5, 
                        opacity: 1,
                    color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
              
                    marker.addTo(myMap);
                }
                else if (row.Job_Status === (filterValue)){
                    marker = L.circleMarker([row.Latitude, row.Longitude], 
                        {radius: 5, 
                        opacity: 1,
                    color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
              
                    marker.addTo(myMap);
                }
                else if (row.Job_Type === (filterValue)){
                    marker = L.circleMarker([row.Latitude, row.Longitude], 
                        {radius: 5, 
                        opacity: 1,
                    color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
              
                    marker.addTo(myMap);
                }
            }
        }
    )};

    // let dataParseJobStatus= function(filterValue){
    //     $.get('./HousingDB_post2010.csv', function(csvString) {
    //         let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
    //         for (let i in data) {
    //             let row = data[i];
    //                 if (row.Job_Status === (filterValue)){
    //                      marker = L.circleMarker([row.Latitude, row.Longitude], 
    //                         {radius: 5, 
    //                         opacity: 1,
    //                     color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
    //                     marker.addTo(myMap);
    //                 }
                    // else if (row.Job_Status === (filterValue)){
                    //     marker = L.circleMarker([row.Latitude, row.Longitude], 
                    //         {radius: 5, 
                    //         opacity: 1,
                    //     color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
                    //     marker.addTo(myMap);
                    // }
                    // else if (row.Job_Type === (filterValue)){
                    //     marker = L.circleMarker([row.Latitude, row.Longitude], 
                    //         {radius: 5, 
                    //         opacity: 1,
                    //     color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
                    //     marker.addTo(myMap);
                    // }
        //         }
        //     }
        // )};


// // myCSV(Ownership, pfpFilter);

$("input[type='radio']").click(function(){
    let radioOwnerValue = $("input[name='ownership']:checked").val();
    let radioJobStatusValue = $("input[name='jobStatus']:checked").val();
    let radioJobTypeValue = $("input[name='jobType']:checked").val();


    if(radioOwnerValue == "PNP"){
        dataParse(pnpFilter)
    }
    else if (radioOwnerValue == "PFP"){
        dataParse(pfpFilter)
    }
    else if (radioOwnerValue == "GOV"){
        dataParse(govFilter)
    };

    if(radioJobStatusValue == "filed"){
        dataParse(filFilter)
    }
    else if (radioJobStatusValue == "approved"){
        dataParse(appFilter)
    }
    else if (radioJobStatusValue == "permitted"){
        dataParse(permitFilter)
    }
    else if (radioJobStatusValue == "partial"){
        dataParse(partFilter)
    }
    else if (radioJobStatusValue == "completed"){
        dataParse(compFilter)
    };

    if(radioJobTypeValue == "alt"){
        dataParse("Alteration")
    }
    else if (radioJobTypeValue == "nb"){
        dataParse("New Building")
    }
    else if (radioJobTypeValue == "demo"){
        dataParse("Demolition")
    };
});




//Ownership Filters
// $("input[type='radio']").click(function(){
//     let radioOwnerValue = $("input[name='ownership']:checked").val();

//     if(radioOwnerValue == "PNP"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Ownership === pnpFilter){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioOwnerValue == "PFP"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
//                 if (row.Ownership === pfpFilter){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioOwnerValue == "GOV"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Ownership === govFilter){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
// });



//Job Status Filters
// $("input[type='radio']").click(function(){
//     let radioValue = $("input[name='jobStatus']:checked").val();
//     if(radioValue == "filed"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Status === "1. Filed Application"){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioValue == "approved"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Status === "2. Approved Application"){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioValue == "permitted"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Status === "3. Permitted for Construction"){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioValue == "partial"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Status === '4. Partially Completed Construction'){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioValue == "completed"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Status === "5. Completed Construction"){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
// });


//Job Type Filters
// $("input[type='radio']").click(function(){
//     let radioValue = $("input[name='jobType']:checked").val();
//     if(radioValue == "alt"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Type ==="Alteration"){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioValue == "nb"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Type === "New Building"){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
//     else if (radioValue == "demo"){
//         $.get('./HousingDB_post2010.csv', function(csvString) {
//             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//             for (let i in data) {
//                 let row = data[i];
    
//                 if (row.Job_Type === "Demolition"){
//                          marker = L.circleMarker([row.Latitude, row.Longitude], 
//                             {radius: 5, 
//                             opacity: 1,
//                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
//                         marker.addTo(myMap);
//                 }
//             }
//         });
//     }
// });

// $('input[type="radio"]').change(function () {
// let owner = $('input[name="ownership"]:checked').val();
// let jobT = $('input[name="jobType"]:checked').val();

// if(owner == 'PFP' && jobT == 'nb'){

//     $.get('./HousingDB_post2010.csv', function(csvString) {
//         let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//         for (let i in data) {
//             let row = data[i];

//             if ((row.Job_Type === "New Building") && (row.Ownership ===('Private For-Profit: Corporation'|| 
//             'Private For-Profit: Partnership'||'Private For-Profit: Individual'
//             ||'Private For-Profit: Condo/Co-Op'||'Private For-Profit: Other'))){
//                      marker = L.circleMarker([row.Latitude, row.Longitude], 
//                         {radius: 5, 
//                         opacity: 1,
//                     color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
              
//                     marker.addTo(myMap);
//             }
//         }
//     });
// }

// })
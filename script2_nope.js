let state = {
    json: [],
    filter: {
        name: null,
        jobO: null,
        jobS: null,
        jobT: null
    }
};

let myMap;
myMap = L.map("map");

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

myMap.setView([40.7128, -74.0060], 16);

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

let row;

// let marker = [];
let marker;
let markerO, markerJS;

// $.get('./HousingDB_post2010.csv', function(csvString) {
//     state.json = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//     // console.log(state.json);
//     for (let i in state.json) {
//         row = state.json[i];
//     };
    
// });

let layerOwner = L.layerGroup();
let markersOcluster = new L.layerGroup();
let markersJScluster = new L.layerGroup();





let dataParse = function(filterValue){
    $.get('./HousingDB_post2010.csv', function(csvString) {
        state.json = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        // console.log("data",data);
        for (let i in state.json) {
            let row = state.json[i];
            // console.log("here",state.json);
            marker = L.circleMarker([row.Latitude, row.Longitude], 
                {radius: 5, 
                opacity: 1,
            color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership+"<br>" +row.Job_Status);
            if (row.Ownership === filterValue){
                // state.filter.jobO = filterValue
                // markerO = marker
                // markerO.addTo(myMap);
                markersOcluster.addLayer(marker);
                // markersOcluster.eachLayer(function(mark){


                // )}
                // myMap.addLayer(markersOcluster);
                // console.log(markersOcluster);
            }
            if(row.Job_Status === filterValue){
                // state.filter.jobS = filterValue
                markersJScluster.addLayer(marker);
                // for (let i in markersOcluster){
                //     let markerO = markersOcluster[i]
                //     if (markerO ) 
                //     // myMap.addLayer(markersJScluster);
                // }
                // else{
                //     myMap.removeLayer(markersOcluster);
                // }
                // if (markerO != markerJS){
                //     myMap.removeLayer(markerO);
                // }
                // else {
                // }
                
            }

            // if(cluster.hasLayer(marker)){
            //     cluster.removeLayer(marker);
            // } 
            // if(map.hasLayer(marker)){
            //     map.removeLayer(marker);
            // }

            // else if (row.Job_Type === filterValue){
            //     // state.filter.jobT = filterValue
            //     marker.addTo(myMap);
            // }
            // if ((row.Ownership === (filterValueO)) && (row.Job_Status != filterValueJS) && (row.Job_Type != filterValueJT)){
            //         marker.addTo(myMap);
            // } // ownership
            // if((row.Ownership === (filterValueO)) && (row.Job_Status === (filterValueJS)) ){
            //     marker.addTo(myMap);
            // } //ownership and job status
            //  if((row.Ownership == (filterValueO)) && (row.Job_Status == (filterValueJS)) && (row.Job_Type == (filterValueJT))){
            //     marker.addTo(myMap);
            // } //all three
            // else if((row.Ownership === (null)) && (row.Job_Status === (filterValueJS)) && (row.Job_Type === (filterValueJT))){
            //     marker.addTo(myMap);
            // } //job status and job type
            // else if((row.Ownership === (filterValueO)) && (row.Job_Status === (null)) && (row.Job_Type === (filterValueJT))){
            //     marker.addTo(myMap);
            // } //ownership and job type
            // else if((row.Ownership === (null)) && (row.Job_Status === (null)) && (row.Job_Type === (filterValueJT))){
            //     marker.addTo(myMap);
            // } // job type
            // else if((row.Ownership === (null)) && (row.Job_Status === (filterValueJS)) && (row.Job_Type === (null))){
            //     marker.addTo(myMap);
            // }; //job status

                // else if (row.Job_Status === (filterValueJS)){
                //     marker.addTo(myMap);
                //     }
                // else if (row.Job_Type === (filterValueJT)){
                //     marker.addTo(myMap);
                // }
            }

        });
    };

//tried to make them different functions
    // let dataParseO = function(filterValue){
    //     $.get('./HousingDB_post2010.csv', function(csvString) {
    //         let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
    //         // console.log("data",data);
    //         for (let i in data) {
    //             let row = data[i];
    //             // console.log(row);
    //                 if (row.Ownership === (filterValue)){
    //                      marker = L.circleMarker([row.Latitude, row.Longitude], 
    //                         {radius: 5, 
    //                         opacity: 1,
    //                     color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                  
    //                     marker.addTo(myMap);
    //                 }
    //             }
    //         })
    //     };

    // let dataParseJS = function(filterValue){
    //     $.get('./HousingDB_post2010.csv', function(csvString) {
    //             let data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
    //                         // console.log("data",data);
    //             for (let i in data) {
    //                 let row = data[i];
    //                             // console.log(row);
    //                     if (row.Job_Status === (filterValue)){
    //                         marker = L.circleMarker([row.Latitude, row.Longitude], 
    //                                         {radius: 5, 
    //                                         opacity: 1,
    //                         color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>" +row.Ownership);
                                  
    //                         marker.addTo(myMap);
    //                     }
    //                 }
    //             })
    //         };
        
        
    // $("input[type='radio']").click(function(){
    //     let radioOwnerValue = $("input[name='ownership']:checked").val();
    //     let radioJobStatusValue = $("input[name='jobStatus']:checked").val();

    //     if ($("input[name='ownership']:checked")){

    //         if(radioOwnerValue == "PNP"){
    //             dataParseO(pnpFilter)
    //         }
    //         else if (radioOwnerValue == "PFP"){
    //             dataParseO(pfpFilter)
    //         }
    //         else if (radioOwnerValue == "GOV"){
    //             dataParseO(govFilter)
    //         };
    //     };
    //     if ($("input[name='jobStatus']:checked")){
    //         if(radioJobStatusValue == "filed"){
    //             dataParseJS(filFilter)
    //         }
    //         else if (radioJobStatusValue == "approved"){
    //             dataParseJS(appFilter)
    //         }
    //         else if (radioJobStatusValue == "permitted"){
    //             dataParseJS(permitFilter)
    //         }
    //         else if (radioJobStatusValue == "partial"){
    //             dataParseJS(partFilter)
    //         }
    //         else if (radioJobStatusValue == "completed"){
    //             dataParseJS(compFilter)
    //         };

    
    // .click(function(){
    //     let radioOwnerValue = $("input[name='ownership']:checked").val();

    //     if(radioOwnerValue == "PNP"){
    //         dataParse(pnpFilter,null,null)
    //     }
    //     else if (radioOwnerValue == "PFP"){
    //         dataParse(pfpFilter,null,null)
    //     }
    //     else if (radioOwnerValue == "GOV"){
    //         dataParse(govFilter,null,null)
    //     };
    // }

    //if another one of the same radio group is clicked, clear map


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

    console.log(state);

    //     if((radioOwnerValue == "PNP") && (radioJobStatusValue == "filed")){
    //         dataParse(pnpFilter,filFilter,null)
    //     }

    //     if((radioOwnerValue == "PNP") && (radioJobStatusValue == "filed") && (radioJobTypeValue == 'New Building')){
    //         dataParse(pnpFilter,filFilter,"New Building")
    //     }
    // });

//trying different click functions
    // let ownerClick = $("input[type='radio']").click(function(){
    //     // if (type == )
    //     let radioOwnerValue = $("input[name='ownership']:checked").val();
    //     // let radioJobStatusValue = $("input[name='jobStatus']:checked").val();
    //     // let radioJobTypeValue = $("input[name='jobType']:checked").val();

    //     if(radioOwnerValue == "PNP"){
    //         dataParseO(pnpFilter)
    //     }
    //     else if (radioOwnerValue == "PFP"){
    //         dataParseO(pfpFilter)
    //     }
    //     else if (radioOwnerValue == "GOV"){
    //         dataParseO(govFilter)
    //     };
    // });

    // let jobstatusClick = $("input[type='radio']").click(function(){
    //     // if (type == )
    //     ownerClick;
    //     let radioJobStatusValue = $("input[name='jobStatus']:checked").val();
    //     // let radioJobStatusValue = $("input[name='jobStatus']:checked").val();
    //     // let radioJobTypeValue = $("input[name='jobType']:checked").val();

    //     if(radioJobStatusValue == "PNP"){
    //         dataParseO(pnpFilter)
    //     }
    //     else if (radioJobStatusValue == "PFP"){
    //         dataParseO(pfpFilter)
    //     }
    //     else if (radioJobStatusValue == "GOV"){
    //         dataParseO(govFilter)
    //     };
    // });

    
    // $('input[type=radio][name=ownership]').change(function() {
    //     if (this.value == 'PNP') {
    //         dataParse(pnpFilter)
    //     }
    //     else if (this.value == 'PFP') {
    //         dataParse(pfpFilter)
    //     }
    //     else if (this.value == 'GOV') {
    //         dataParse(govFilter)
    //     }
    // });

//     $('input[type=radio][name=ownership]').change(function() {
//         switch($(this).val()) {
//             case 'PNP':
//                 dataParse(pnpFilter);
//                 break;
//             case 'PFP':
//                 myMap.removeLayer(marker1);
//                 dataParse(pfpFilter);
//                 break;
//             case 'GOV':
//                 myMap.removeLayer(marker1);
//                 dataParse(govFilter)
//                 break;
//         }            
//     });



// let filterF = function(filter1){

//     $.get('./HousingDB_post2010.csv', function(csvString) {
//         data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//         // console.log("data",data);
//         for (let i in data) {
//             let row = data[i];

//             if(radioOwnerValue == filter1){
//                 return (row.Ownership == radioOwnerValue)
//             }
//         }
//     })
// }

// $('input[type=radio][name=ownership]').change(function(){
//     filterF(pnpFilter)
// }
//     )


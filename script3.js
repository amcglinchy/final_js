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

myMap.setView([40.7156516, -73.9522055], 12);

// // let pnpFilter = ('Private Non-Profit: Corporation'|| 
// //     'Private Non-Profit: Partnership'||'Private Non-Profit: Individual'
// //     ||'Private Non-Profit: Condo/Co-Op'||'Private Non-Profit: Other');
// let pfpFilter = ('Private For-Profit: Corporation'|| 
//     'Private For-Profit: Partnership'||'Private For-Profit: Individual'
//     ||'Private For-Profit: Condo/Co-Op'||'Private For-Profit: Other');
// let govFilter = ('Government, City: Other'|| 
//     'Government, City: Corporation'||'Government, Unspecified: Government Agency'
//     ||'Government, City: HPD'||'Government, City: Partnership'|| 'Government, City: City Agency'
//     ||'Government, City: NYCHA/HHC'||'Government, City: NYCHA'||'Government, City: Individual'||
//     'Government, City: HHC'||'Government, State: NY State');
// let incFilter = ('2. Approved Application' || '3. Permitted for Construction' || '4. Partially Completed Construction');
// let compFilter = '5. Completed Construction'


let marker;


//single layers
let pnpLayer = new L.layerGroup();
let pfpLayer = new L.layerGroup();
let govLayer = new L.layerGroup();

let incLayer = new L.layerGroup();
let compLayer = new L.layerGroup();

let nbLayer = new L.layerGroup();
let altLayer = new L.layerGroup();
let demoLayer = new L.layerGroup();

    //ownership and job status
let pfpCompLayer = new L.layerGroup();
let govCompLayer = new L.layerGroup();
let pnpCompLayer = new L.layerGroup();

let pfpIncLayer = new L.layerGroup();
let pnpIncLayer = new L.layerGroup();
let govIncLayer = new L.layerGroup();



    $.get('./HousingDB_post2010.csv', function(csvString) {
        state.json = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        // console.log("data",data);
        for (let i in state.json) {
            let row = state.json[i];
            // console.log("here",state.json);
            marker = L.circleMarker([row.Latitude, row.Longitude], 
                {radius: 5, 
                opacity: 1,
            color: "black"}).bindPopup(row.AddressNum + " " + row.AddressSt +"<br>"
            +row.Ownership+"<br>" +row.Job_Status +"<br>" + "<br>"+"Permitted: "+row.PermitYear
            +"<br>" +"Completed: "+row.CompltYear);
            //ownership
            if (row.Ownership === 'Private Non-Profit: Corporation'|| row.Ownership === 
            'Private Non-Profit: Partnership'||row.Ownership === 'Private Non-Profit: Individual'
            ||row.Ownership === 'Private Non-Profit: Condo/Co-Op'||row.Ownership === 'Private Non-Profit: Other'){
                pnpLayer.addLayer(marker);
            }
            else if (row.Ownership === 'Private For-Profit: Corporation'|| row.Ownership ===
            'Private For-Profit: Partnership'||row.Ownership ==='Private For-Profit: Individual'
            ||row.Ownership ==='Private For-Profit: Condo/Co-Op'||row.Ownership ==='Private For-Profit: Other'){
                ownerPfpMarker = marker
                pfpLayer.addLayer(marker);
            }
            else if (row.Ownership === 'Government, City: Other'|| row.Ownership ===
            'Government, City: Corporation'||row.Ownership ==='Government, Unspecified: Government Agency'
            ||row.Ownership ==='Government, City: HPD'||row.Ownership ==='Government, City: Partnership'||row.Ownership === 'Government, City: City Agency'
            ||row.Ownership ==='Government, City: NYCHA/HHC'||row.Ownership ==='Government, City: NYCHA'||row.Ownership ==='Government, City: Individual'||row.Ownership ===
            'Government, City: HHC'||row.Ownership ==='Government, State: NY State'){
                ownerGovMarker = marker
                govLayer.addLayer(marker);
            };

            //job status
            if(row.Job_Status === '5. Completed Construction'){
                compLayer.addLayer(marker);
            }
            else if(row.Job_Status === '1. Filed Application' ||row.Job_Status === '2. Approved Application' ||row.Job_Status === '3. Permitted for Construction' ||row.Job_Status === '4. Partially Completed Construction'){
                incLayer.addLayer(marker);
            };

            //ownership and job status
            if((row.Ownership === 'Private Non-Profit: Corporation'|| row.Ownership === 
            'Private Non-Profit: Partnership'||row.Ownership === 'Private Non-Profit: Individual'
            ||row.Ownership === 'Private Non-Profit: Condo/Co-Op'||row.Ownership === 'Private Non-Profit: Other') && (row.Job_Status === '5. Completed Construction')){
                pnpCompLayer.addLayer(marker);
            }
            else if ((row.Ownership === 'Private For-Profit: Corporation'|| row.Ownership ===
            'Private For-Profit: Partnership'||row.Ownership ==='Private For-Profit: Individual'
            ||row.Ownership ==='Private For-Profit: Condo/Co-Op'||row.Ownership ==='Private For-Profit: Other') && (row.Job_Status === '5. Completed Construction')){
                pfpCompLayer.addLayer(marker);
            }
            else if ((row.Ownership === 'Government, City: Other'|| row.Ownership ===
            'Government, City: Corporation'||row.Ownership ==='Government, Unspecified: Government Agency'
            ||row.Ownership ==='Government, City: HPD'||row.Ownership ==='Government, City: Partnership'||row.Ownership === 'Government, City: City Agency'
            ||row.Ownership ==='Government, City: NYCHA/HHC'||row.Ownership ==='Government, City: NYCHA'||row.Ownership ==='Government, City: Individual'||row.Ownership ===
            'Government, City: HHC'||row.Ownership ==='Government, State: NY State') && (row.Job_Status === '5. Completed Construction')){
                govCompLayer.addLayer(marker);
            }
            else if ((row.Ownership === 'Private For-Profit: Corporation'|| row.Ownership ===
            'Private For-Profit: Partnership'||row.Ownership ==='Private For-Profit: Individual'
            ||row.Ownership ==='Private For-Profit: Condo/Co-Op'||row.Ownership ==='Private For-Profit: Other') && (row.Job_Status === '1. Filed Application' ||row.Job_Status === '2. Approved Application' ||row.Job_Status === '3. Permitted for Construction' ||row.Job_Status === '4. Partially Completed Construction')){
                pfpIncLayer.addLayer(marker);
            }
            else if ((row.Ownership === 'Private Non-Profit: Corporation'|| row.Ownership === 
            'Private Non-Profit: Partnership'||row.Ownership === 'Private Non-Profit: Individual'
            ||row.Ownership === 'Private Non-Profit: Condo/Co-Op'||row.Ownership === 'Private Non-Profit: Other') && (row.Job_Status === '1. Filed Application' ||row.Job_Status === '2. Approved Application' ||row.Job_Status === '3. Permitted for Construction' ||row.Job_Status === '4. Partially Completed Construction')){
                pnpIncLayer.addLayer(marker);
            }
            else if ((row.Ownership === 'Government, City: Other'|| row.Ownership ===
            'Government, City: Corporation'||row.Ownership ==='Government, Unspecified: Government Agency'
            ||row.Ownership ==='Government, City: HPD'||row.Ownership ==='Government, City: Partnership'||row.Ownership === 'Government, City: City Agency'
            ||row.Ownership ==='Government, City: NYCHA/HHC'||row.Ownership ==='Government, City: NYCHA'||row.Ownership ==='Government, City: Individual'||row.Ownership ===
            'Government, City: HHC'||row.Ownership ==='Government, State: NY State') && (row.Job_Status === '1. Filed Application' ||row.Job_Status === '2. Approved Application' ||row.Job_Status === '3. Permitted for Construction' ||row.Job_Status === '4. Partially Completed Construction')){
                govIncLayer.addLayer(marker);
            };

    }
});


$("input[type='radio']").click(function(){
    let radioOwnerValue = $("input[name='ownership']:checked").val();
    let radioJobStatusValue = $("input[name='jobStatus']:checked").val();

    if(radioOwnerValue == "PNP" && radioJobStatusValue == null){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);

        myMap.addLayer(pnpLayer);
    }
    else if (radioOwnerValue == "PFP" && radioJobStatusValue == null){
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);

        myMap.addLayer(pfpLayer);
    }
    else if (radioOwnerValue == "GOV" && radioJobStatusValue == null){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);

        myMap.addLayer(govLayer);
    }
    else if(radioOwnerValue == null && radioJobStatusValue == 'completed'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);

        myMap.addLayer(compLayer);
    }
    else if(radioOwnerValue == null && radioJobStatusValue == 'incomplete'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(pnpLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);

        myMap.addLayer(incLayer);
    }

    if(radioOwnerValue == 'PNP' && radioJobStatusValue == 'incomplete'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);

        myMap.addLayer(pnpIncLayer);
    }
    else if(radioOwnerValue == 'PFP' && radioJobStatusValue == 'incomplete'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pnpIncLayer);
        myMap.removeLayer(govIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);
        
        myMap.addLayer(pfpIncLayer);
    }
    else if(radioOwnerValue == 'GOV' && radioJobStatusValue == 'incomplete'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        myMap.removeLayer(pnpCompLayer);
        
        myMap.addLayer(govIncLayer);
    }
    else if(radioOwnerValue == 'PNP' && radioJobStatusValue == 'completed'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(govCompLayer);
        
        myMap.addLayer(pnpCompLayer);
    }
    else if(radioOwnerValue == 'PFP' && radioJobStatusValue == 'completed'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pnpCompLayer);
        myMap.removeLayer(govCompLayer);

        myMap.addLayer(pfpCompLayer);
    }
    else if(radioOwnerValue == 'GOV' && radioJobStatusValue == 'completed'){
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);

        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);

        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(pnpCompLayer);

        myMap.addLayer(govCompLayer);
    }

});

$('#btn').on("click", function(){
    $('input[type=radio]').prop('checked',false);
        myMap.removeLayer(pfpLayer);
        myMap.removeLayer(govLayer);
        myMap.removeLayer(pnpLayer);
        myMap.removeLayer(compLayer);
        myMap.removeLayer(incLayer);
        myMap.removeLayer(pfpIncLayer);
        myMap.removeLayer(govIncLayer);
        myMap.removeLayer(pnpIncLayer);
        myMap.removeLayer(pfpCompLayer);
        myMap.removeLayer(pnpCompLayer);
        myMap.removeLayer(govCompLayer);
});


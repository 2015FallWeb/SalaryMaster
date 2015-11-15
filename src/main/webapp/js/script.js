/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//
// Pipelining function for DataTables. To be used to the `ajax` option of DataTables
//
$.fn.dataTable.pipeline = function ( opts ) {
    // Configuration options
    var conf = $.extend( {
        pages: 5,     // number of pages to cache
        url: '',      // script url
        data: null,   // function or object with parameters to send to the server
                      // matching how `ajax.data` works in DataTables
        method: 'GET' // Ajax HTTP method
    }, opts );
 
    // Private variables for storing the cache
    var cacheLower = -1;
    var cacheUpper = null;
    var cacheLastRequest = null;
    var cacheLastJson = null;
 
    return function ( request, drawCallback, settings ) {
        var ajax          = false;
        var requestStart  = request.start;
        var drawStart     = request.start;
        var requestLength = request.length;
        var requestEnd    = requestStart + requestLength;
         
        if ( settings.clearCache ) {
            // API requested that the cache be cleared
            ajax = true;
            settings.clearCache = false;
        }
        else if ( cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper ) {
            // outside cached data - need to make a request
            ajax = true;
        }
        else if ( JSON.stringify( request.order )   !== JSON.stringify( cacheLastRequest.order ) ||
                  JSON.stringify( request.columns ) !== JSON.stringify( cacheLastRequest.columns ) ||
                  JSON.stringify( request.search )  !== JSON.stringify( cacheLastRequest.search )
        ) {
            // properties changed (ordering, columns, searching)
            ajax = true;
        }
         
        // Store the request for checking next time around
        cacheLastRequest = $.extend( true, {}, request );
 
        if ( ajax ) {
            // Need data from the server
            if ( requestStart < cacheLower ) {
                requestStart = requestStart - (requestLength*(conf.pages-1));
 
                if ( requestStart < 0 ) {
                    requestStart = 0;
                }
            }
             
            cacheLower = requestStart;
            cacheUpper = requestStart + (requestLength * conf.pages);
 
            request.start = requestStart;
            request.length = requestLength*conf.pages;
 
            // Provide the same `data` options as DataTables.
            if ( $.isFunction ( conf.data ) ) {
                // As a function it is executed with the data object as an arg
                // for manipulation. If an object is returned, it is used as the
                // data object to submit
                var d = conf.data( request );
                if ( d ) {
                    $.extend( request, d );
                }
            }
            else if ( $.isPlainObject( conf.data ) ) {
                // As an object, the data given extends the default
                $.extend( request, conf.data );
            }
 
            settings.jqXHR = $.ajax( {
                "type":     conf.method,
                "url":      conf.url,
                "data":     request,
                "dataType": "json",
                "cache":    false,
                "success":  function ( json ) {
                    cacheLastJson = $.extend(true, {}, json);
 
                    if ( cacheLower != drawStart ) {
                        json.data.splice( 0, drawStart-cacheLower );
                    }
                    json.data.splice( requestLength, json.data.length );
                     
                    drawCallback( json );
                }
            } );
        }
        else {
            json = $.extend( true, {}, cacheLastJson );
            json.draw = request.draw; // Update the echo for each response
            json.data.splice( 0, requestStart-cacheLower );
            json.data.splice( requestLength, json.data.length );
 
            drawCallback(json);
        }
    }
};
 
// Register an API method that will empty the pipelined data, forcing an Ajax
// fetch on the next draw (i.e. `table.clearPipeline().draw()`)
$.fn.dataTable.Api.register( 'clearPipeline()', function () {
    return this.iterator( 'table', function ( settings ) {
        settings.clearCache = true;
    } );
} );
var employerName = "University Of Pittsburgh";
var employerName2 = "Google Inc."; //for test
var iniCityName = "Pittsburgh";

var table = null;

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];
var employers = [];
var cities = [];
var positions = [];


function updateByEmployer(employerName){
    url = "salary/employer/" + employerName;
    table.ajax.url(url).load();
}

function updateByPosition(position){
    url = "salary/title/" + position;
    table.ajax.url(url).load();
}

function updateByCity(city){
    url = "salary/city/" + city;
    table.ajax.url(url).load();

}

function updateByState(state){
    url = "salary/state/" + state;
    table.ajax.url(url).load();
}
function initTable(url){
    table = $('#entry').DataTable({
        "serverSide": true,
        "bProcessing": true,
        "ajax": $.fn.dataTable.pipeline({
            url: url,    //specify ajax url
            pages: 5   // no of pages you wish to cache
        }),
        "columns": [
            { "data": "employerName" },
            { "data": "jobInfoJobTitle" },
            { "data": "jobInfoWorkCity" },
            { "data": "jobInfoWorkState" },
            { "data": "wageOfferFrom9089" }, 
            { "data": "decisionDate" }
        ],
        
        "order": [[ 5, "desc" ]], // order by date
        "columnDefs": [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return "$" +data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                },
                "targets": 4
            },
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data.split(" ")[0];
                },
                "targets": 5
            }
            
        ]
    });
}
function iniByCity(iniCityName){
    initTable("salary/city/" + iniCityName);
    
}

function init(){
    console.log("init start");
    $("#city").val(iniCityName);
    iniByCity(iniCityName);
    $('#entry').removeClass( 'display' )
		.addClass('table table-striped table-bordered');

}
function getJsonObjLength(jsonObj) {
        var Length = 0;
        for (var item in jsonObj) {
            Length++;
        }
        return Length;
}

function employerChange(){
    var position = $("#position").val();
       var city = $("#city").val();
       var state = $("#state").val();
       if(position.length===0&&city.length===0&&state.length===0){
            console.log("first query");
            updateByEmployer($("#employerName").val());
       }else{
           table
                   .columns(0)
                   .search($("#employerName").val())
                   .draw();
       }
       
       $("#employerName").css({"color":"#337ab7"});
       var value = $("#employerName").val();
       console.log(value.length);
       if(position.length===0&&city.length===0&&state.length===0&&value.length===0){
          updateByCity(iniCityName);
       }
}
function positionChange(){
        var employer = $("#employerName").val();
        var city = $("#city").val();
        var state = $("#state").val();
        if(employer.length===0&&city.length===0&&state.length===0){
            console.log("first query");
            updateByPosition($("#position").val());
        }else{
          table
                   .columns(1)
                   .search($("#position").val())
                   .draw();
       }
       $("#position").css({"color":"#337ab7"});
       var value = $("#position").val();
        if(position.length===0&&city.length===0&&state.length===0&&value.length===0){
            updateByCity("Pittsburgh");
       }
}
function cityChange(){
        var employer = $("#employerName").val();
        var position = $("#position").val();
        var state = $("#state").val();
        if(employer.length===0&&position.length===0&&state.length===0){
            console.log("first query");
            updateByCity($("#city").val());
        }else{
          table
                   .columns(2)
                   .search($("#city").val())
                   .draw();
       }
       $("#city").css({"color":"#337ab7"});
        var value = $("#city").val();
        if(position.length===0&&city.length===0&&state.length===0&&value.length===0){
            updateByCity(iniCityName);
        }
}

function stateChange(){
        var employer = $("#employerName").val();
        var position = $("#position").val();
        var city = $("#city").val();
        if(employer.length===0&&position.length===0&&city.length===0){
            console.log("first query");
            updateByState($("#state").val());
        }else{
          table
                   .columns(3)
                   .search($("#state").val())
                   .draw();
       }
       $("#state").css({"color":"#337ab7"});
        var value = $("#state").val();
        if(position.length===0&&city.length===0&&employer.length===0&&value.length===0){
            updateByCity("Pittsburgh");
       }
}

function changeMonitor(){
    $("#employer").change(function() {
        if($("#employer").val().length == 0){
            console.log("employer is empty");
            table.columns(0).search("")
                   .draw();
        }
    });
        
    $("#position").change(function() {
        if($("#position").val().length == 0){
            table.columns(1).search("")
                   .draw();
        }
    });
    
    $("#city").change(function() {
        if($("#city").val().length == 0){
            
            table.columns(2).search("")
                   .draw();
        }
    });

    $("#state").change(function() {
        if($("#state").val().length == 0){
            table.columns(3).search("")
                   .draw();
        }
    });
}
function backToInit(position, city, state, employer){
    if(position.length===0&&city.length===0&&state.length===0&&employer.length===0){
           init();
       };
}

function initSuggestion(){
     $.getJSON("json/employer.json",function(data){
        $.each(data.employer, function( index, value ) {
            employers.push(value._id);
        });
            
        employers = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: employers
        }); 
        
         $('#employerName').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'employers',
            source: employers
       }).on('typeahead:selected', function (obj, data) {
           employerChange();
       });
    });
    
  
    $.getJSON("json/title.json",function(data){
        $.each(data.title, function( index, value ) {
            positions.push(value._id);
        });
        positions = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: positions
        });   
        $("#position").typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'positions',
            source: positions
       }).on('typeahead:selected', function (obj, datum) {
            positionChange();
       });  
   });
       
       
    $.getJSON("json/city.json",function(data){
        $.each(data.city, function( index, value ) {
            cities.push(value._id);
        });
        cities = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: cities
        });   
        $("#city").typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'cities',
            source: cities
       }).on('typeahead:selected', function (obj, datum) {
            cityChange();
       });

   });
    
    states = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,

        local: states
    });
    
    
    $('#state').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
        },
        {
        name: 'states',
        source: states
        }).on('typeahead:selected', function (obj, datum) {
             stateChange();
        });


}
$(document).ready(function() {
       var position = $("#position").val();
       var city = $("#city").val();
       var state = $("#state").val();
       var employer = $("#employerName").val();
       backToInit(position, city, state, employer);
       initSuggestion();
       changeMonitor();
} );
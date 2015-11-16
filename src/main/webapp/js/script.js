/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

function update(){
    var url = "salary/search";
    table.ajax.url(url).load();
}
function updateByEmployer(employerName){
    var url = "salary/employer/" + employerName;
    table.ajax.url(url).load();
}

function updateByPosition(position){
    var url = "salary/title/" + position;
    table.ajax.url(url).load();
}

function updateByCity(city){
    var url = "salary/city/" + city;
    table.ajax.url(url).load();
}

function updateByState(state){
    url = "salary/state/" + state;
    table.ajax.url(url).load();
}
function initTable(url){
    table = $('#entry').DataTable({
//        "search": {
//            "regex": true
//        },
        "lengthMenu": [50, 100],
        "bFilter": false, 
        "pageLength": 50,
        "serverSide": true,
        "bProcessing": true,
        "ajax": {
            url: url,    //specify ajax url
            data: function ( d ) {
                 d.employerName = $('#employerName').val();
                 d.cityName = $('#city').val();
                 d.stateName = $('#state').val();
                 d.titleName = $('#position').val();
            }
        },
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
function isAllEmpty(){
    return $("#employerName").val().length + $("#position").val().length + 
            $("#state").val().length + $("#city").val().length == 0
}
function employerChange(){
   update();
   $("#employerName").css({"color":"#337ab7"});
}
function positionChange(){
   update();
   $("#position").css({"color":"#337ab7"});
}
function cityChange(){
    update();
    $("#city").css({"color":"#337ab7"});
}

function stateChange(){
    update();
    $("#state").css({"color":"#337ab7"});
}

function changeMonitor(){
    $("#employerName").keyup(function() {
       if(isAllEmpty())
           return;
       if($("#employerName").val().length == 0){
           update();
       }
    });
        
     $("#position").keyup(function() {
        if(isAllEmpty())
           return;
       if($("#position").val().length == 0){
           update();
       }
    });
    
     $("#city").keyup(function() {
       if(isAllEmpty())
           return;
       if($("#city").val().length == 0){
           update();
       }
    });
    
     $("#state").keyup(function() {
       if(isAllEmpty())
           return;
       if($("#state").val().length == 0){
           update();
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
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var employerName = "University Of Pittsburgh";

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
var isFirst = true;

var employerEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 5,
  remote: {
    url: 'typehead/employer?query=%QUERY',
    wildcard: '%QUERY'

  }
});


var positionEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 5,
  remote: {
    url: 'typehead/title?query=%QUERY',
    wildcard: '%QUERY'

  }
});


var cityEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 5,
  remote: {
    url: 'typehead/city?query=%QUERY',
    wildcard: '%QUERY'

  }
});
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
    var url = "salary/state/" + state;
    table.ajax.url(url).load();
}
function enableClick(key, value){
    var result = "<a href='#' onclick=\"inputUpdate(\'" + key + "\', \'" + value + "\')\">" + value + "</a>";
    return result;
}
function initTable(url){
    table = $('#entry').DataTable({
        "bProcessing": true,
        "bFilter": false, 
        "pageLength": 50,
        "serverSide": true,
        "bLengthChange": false,
        "ajax": {
            url: url,    //specify ajax url
            data: function ( d ) {
                 d.employerName = $('#employerName').val();
                 d.cityName = $('#city').val();
                 d.stateName = $('#state').val();
                 d.titleName = $('#position').val();
            },
             "dataSrc": function ( json ) {
                //Make your callback here.
                //alert("Done!");
                return json.data;
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
            { "width": "23%", "targets": 0 },
            { "width": "35%", "targets": 1 },
            { "width": "10%", "targets": 2 },
            { "width": "10%", "targets": 3 },
            { "width": "10%", "targets": 4 },
            { "width": "12%", "targets": 5 },
 
            {
                "render": function ( data, type, row ) {
                    return enableClick("employerName", data);
                },
                "targets": 0
            },
            {
                "render": function ( data, type, row ) {
                    return enableClick("position", data);
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {
                    return enableClick("city", data);
                },
                "targets": 2
            },
            {
                "render": function ( data, type, row ) {
                    return enableClick("state", data);
                },
                "targets": 3
            },
            {
                "render": function ( data, type, row ) {
                    return "$" +data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                },
                "targets": 4
            },
            {
                "render": function ( data, type, row ) {
                    return data.split(" ")[0];
                },
                "targets": 5
            }
            
        ]
    });
    
    table.on( 'processing.dt', function ( e, settings, processing ) {
       // $('#processing-modal').css( 'display', processing ? 'block' : 'none' );
        if(processing ){
            isFirst = false;
            $('html,body').animate({scrollTop:0},'0');
            $( '#processing-modal' ).modal( { show: true} );
        }else if(!isFirst){
            
            $( '#processing-modal' ).modal( 'toggle' );
        }
        
    } );
}
function initByEmployer(employerName){
    initTable("salary/employer/" + employerName);
    
}

function init(){
    $("#employerName").val(employerName);
    initByEmployer(employerName);
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
            $("#state").val().length + $("#city").val().length == 0;
}

function employerChange(){
   update();
}

function positionChange(){
   update();
}
function cityChange(){
    update();
}

function stateChange(){
    update();
}

function inputUpdate(key, value){
    $("#" + key).val(value);
    update();
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
function cancelAjax(){
     $.fn.DataTable.settings[0].jqXHR.abort();
}

function initSuggestion(){
$('#employerName').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'employers',
            source: employerEngine
       }).on('typeahead:selected', function (obj, data) {
           employerChange();
       });
   
    
  
    
        $("#position").typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'positions',
            source: positionEngine
       }).on('typeahead:selected', function (obj, datum) {
            positionChange();
       });  

       
       
       
    $("#city").typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'cities',
            source: cityEngine
       }).on('typeahead:selected', function (obj, datum) {
            cityChange();
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

function typeheadFix(){
    $('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
    $('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');
}
$(document).ready(function() {
        
       var position = $("#position").val();
       var city = $("#city").val();
       var state = $("#state").val();
       var employer = $("#employerName").val();
       backToInit(position, city, state, employer);
       initSuggestion();
       changeMonitor();
       typeheadFix();
       var amountScrolled = 300;

        $(window).scroll(function() {
            if ( $(window).scrollTop() > amountScrolled ) {
   		$('#top-link-block').fadeIn('fast');
            } else {
   		$('#top-link-block').fadeOut('fast');
            }
         });
        
} );
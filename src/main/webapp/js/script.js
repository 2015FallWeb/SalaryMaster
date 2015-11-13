/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var employerName = "University Of Pittsburgh";
var employerName2 = "Google Inc."; //for test
var iniCityName = "Pittsburgh";
var position ="";
var city = "";
var state = "";
var table = null;

function updateByCompany(employerName){
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

function iniByCity(iniCityName){
    table = $('#entry').DataTable({
        "ajax": {
            "url": "salary/city/" + iniCityName,
            "dataSrc": ""
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
function initByCompany(employerName){
    table = $('#entry').DataTable({
        "ajax": {
            "url": "salary/employer/" + employerName,
            "dataSrc": ""
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

function init(){
    console.log("init start");
    iniByCity(iniCityName);
    $('#entry').removeClass( 'display' )
		.addClass('table table-striped table-bordered');
        
        
//   $('#employerName').val(employerName);
//    $('#employerName').change(function(){
//        updateByCompany($('#employerName').val());
//    });
}
function getJsonObjLength(jsonObj) {
        var Length = 0;
        for (var item in jsonObj) {
            Length++;
        }
        return Length;
}

$(document).ready(function() {
       var Position = $("#position").val();
       var City = $("#city").val();
       var State = $("#state").val();
       var Employer = $("#employerName").val();
       if(Employer.length===0&&Position.length===0&&City.length===0&&State.length===0){
           init();
       };
   
    
   $.getJSON("json/employer.json",function(data){
       var employers = data;
       //var cities = jQuery.parseJSON(city);
       //console.log(typeof(employers));
       //console.log(employers); 
        var a;
       $.each(employers,function(key,value){
        if (key === "employer"){
            a = value;
        }
       });
      //console.log(a[1]._id); 
        var count = getJsonObjLength(a);
       
 
        var companies = new Array();
        for(var i=0;i<24248;i++){
          companies.push(a[i]._id);    
       }
       //console.log(companies[10000]);
       
        var companies = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,

            local: companies
        });
       
        
       $('#employerName').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'companies',
            source: companies
       });
       
   });
   
   
    $("#employerName").blur(function(){
       var position = $("#position").val();
       var city = $("#city").val();
       var state = $("#state").val();
       if(position.length===0&&city.length===0&&state.length===0){
           console.log("abcd");
            updateByCompany($("#employerName").val());
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
          updateByCity("Pittsburgh");
       }
   });
  
    $.getJSON("json/title.json",function(data){
       var positions = data;
       //var cities = jQuery.parseJSON(city);
//       console.log(typeof(positions));
//       console.log(positions); 
       
        var b;
       $.each(positions,function(key,value){
        if (key === "title"){
            a = value;
        }
       });
     // console.log(a[0]._id); 
        //var count = getJsonObjLength(a);
       
 
        var title = new Array();
        for(var i=0;i<a.length;i++){
          title.push(a[i]._id);    
       }
      // console.log(title[10000]);
       
        var title = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,

            local: title
        });
       
        
       $("#position").typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'title',
            source: title
       });
       
   });
     
    $("#position").blur(function(){
        var employer = $("#employerName").val();
        var city = $("#city").val();
        var state = $("#state").val();
        if(employer.length===0&&city.length===0&&state.length===0){
            console.log("abcd");
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
    });
    
    $.getJSON("json/city.json",function(data){
       var cities = data;
       //var cities = jQuery.parseJSON(city);
       console.log(typeof(cities));
       console.log(cities); 
       
        var a;
       $.each(cities,function(key,value){
        if (key === "city"){
            a = value;
        }
       });
      console.log(a[0]._id); 
       //var count = getJsonObjLength(a);
       
 
        var city = new Array();
        for(var i=0;i<a.length;i++){
          city.push(a[i]._id);    
       }
       console.log(city[2]);
       
        var city = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,

            local: city
        });
       
        
       $("#city").typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'city',
            source: city
       });
       
   });
   
    $("#city").blur(function(){
        var employer = $("#employerName").val();
        var position = $("#position").val();
        var state = $("#state").val();
        if(employer.length===0&&position.length===0&&state.length===0){
            //console.log("abcd");
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
            updateByCity("Pittsburgh");
       }
    });
    
    
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

var states = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // `states` is an array of state names defined in "The Basics"
  local: states
});

$('#state ').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: states
});

  $("#state").blur(function(){
        var employer = $("#employerName").val();
        var position = $("#position").val();
        var city = $("#city").val();
        if(employer.length===0&&position.length===0&&city.length===0){
            //console.log("abcd");
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
    });
    

    
} );
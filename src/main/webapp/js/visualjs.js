/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var employer = [];
console.log("abc");
var company ="University Of Pittsburgh";
var table = null;
var min = "";
var max = "";
var med = "";
var First = true ;

function iniCompanyTable(){
     url="titleStatistics/"+company;
    console.log("----"+company+"----");
    table = $("#companyEntry").DataTable({
        "ServerSide": true,
        "bProcessing": true,
         "lengthMenu": [5],
         "bFilter": false, 
        "ajax": {
            "url": url,    //specify ajax url
             //"type":"JSON",
             "dataSrc": ""
        },
        "columns": [
            { "data": "jobTitle"},
            { "data": "stat.salaryMin"},
            { "data": "stat.salaryMax"},
            { "data": "stat.salaryMedian"},
            { "data": "count"}
           
        ],
        
        "order": [[ 4, "desc" ]]
       
    });
      table.on( 'processing.dt', function ( e, settings, processing ) {
       // $('#processing-modal').css( 'display', processing ? 'block' : 'none' );
        if(processing ){
            First = false;
            $( '#processing-modal' ).modal( { show: true} );
        }else if(!First){
            
            $( '#processing-modal' ).modal( 'toggle' );
        }
        
    } );
    $("#companyTable").hide();
     //console.log("00000000");
    
}
function searchResult(){
   var companyname = $("#company").val();
   summary(companyname);
   pieChart();
   titleTable(companyname);
   map();
   //$(".allgraphs").show(200);
};


function summary(companyname){
    //alert(min+"!!");
    if(min!== ""){
        var url = "statistics/" +companyname ;
     $.ajax({
         url:url,
         type:"GET",
     
         dataType:"Json",
         success:function(data){
             min = data.salaryMin;
             max = data.salaryMax;
             med = data.salaryMedian;
             console.log(min,max,med);
//           
             $("#maxSalary").text("$"+max+".00");
             $("#minSalary").text("$"+min+".00");
             $("#medSalary").text("$"+med+".00");
             $("#summary").show(200);
             
         },
         error:function(data){
             alert("data loading failed");
         }
     });
     
    }
    else{
        console.log(min,max,med+"00");
        var url = "statistics/" +company ;
            $.ajax({
        url:url,
        type:"GET",
     
        dataType:"Json",
         success:function(data){
             min = data.salaryMin;
             max = data.salaryMax;
             med = data.salaryMedian;
             console.log(min,max,med);
//           
             $("#maxSalary").text("$"+max+".00");
             $("#minSalary").text("$"+min+".00");
             $("#medSalary").text("$"+med+".00");
             $("#summary").show(200);
             
         },
         error:function(data){
             alert("data loading failed");
         }
     });
    } 
};
function pieChart(){
    
};
function titleTable(company){
    url="titleStatistics/"+company;
    table.ajax.url(url).load();
    $("#companyTable").show(200);
    
};
function map(){
    
};

function reSearchAction(){
 
    $("#company").keyup(function() {
        $("#companyTable").hide();
        $("#summary").hide();
    });
        
}

function updateGraphs(){
    
    var companyname = $("#company").val();
    console.log("ssss"+companyname);
    $("#company").keydown(function(){
        console.log("change"+companyname);
         if(companyname.length !== 0){
        updateSummary(companyname);
        updatePie();
        updateTable(companyname);
        updateMap();
    }
    });
   
}

function updateSummary(company){
     console.log("update graph1");
     var url = "statistics/" +company ;
     $.ajax({
         url:url,
         type:"GET",
     
         dataType:"Json",
         success:function(data){
             var min = data.salaryMin;
             var max = data.salaryMax;
             var med = data.salaryMedian;
             console.log(min,max,med);
//           
             $("#maxSalary").text("$"+max+".00");
             $("#minSalary").text("$"+min+".00");
             $("#medSalary").text("$"+med+".00");
        
             
         },
         error:function(data){
             alert("data loading failed");
         }
     });
    
}

function updateTable(company){
    console.log("update table");
    var url="titleStatistics/"+company;
    table.ajax.url(url).load();
}

function companySuggestion(){
 
  $.getJSON("json/employer.json",function(data){
    
        $.each(data.employer, function(index, value ) {
            employer.push(value._id);
        });
 
        
        employer = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: employer
        }); 
        
         $('#company').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
       },
       {
            name: 'employer',
            source: employer
       }).on('typeahead:selected', function (obj, datum) {
            searchResult();
       });
    });  
};


$(document).ready(function() {
   // $(".allgraphs").hide();
   $("#summary").hide();
   iniCompanyTable();
    // $("#maxSalary").text(123444);
   companySuggestion();
    reSearchAction();
  
} );
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var employer = [];
console.log("abc");
var company ="";

function searchResult(){
   var companyname = $("#company").val();
   summary(companyname);
   pieChart();
   titleTable(companyname);
   map();
   //$(".allgraphs").show(200);
};


function summary(company){
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
             $("#summary").show(200);
             
         },
         error:function(data){
             alert("data loading failed");
         }
     });
     
     
    
    
};
function pieChart(){
    
};
function titleTable(company){
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
    
     console.log("00000000");
    
};
function map(){
    
};

function research(){
 
    $("#company").keyup(function() {
       if($("#company").val().length === 0){
           update();
       };
    });
        
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
    // $("#maxSalary").text(123444);
    companySuggestion();
    
  
} );
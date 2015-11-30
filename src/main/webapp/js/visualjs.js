/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var employer = [];
console.log("abc");
var company = "University Of Pittsburgh";
var table = null;
var min = "";
var max = "";
var med = "";
var First = true;
 var mapdata="";

function iniCompanyTable() {
    url = "titleStatistics/" + company;
    console.log("----" + company + "----");
    table = $("#companyEntry").DataTable({
        "ServerSide": true,
        "bProcessing": true,
        "lengthMenu": [5],
        "bFilter": false,
        "ajax": {
            "url": url, //specify ajax url
            //"type":"JSON",
            "dataSrc": ""
        },
        "columns": [
            {"data": "jobTitle"},
            {"data": "stat.salaryMin"},
            {"data": "stat.salaryMax"},
            {"data": "stat.salaryMedian"},
            {"data": "count"}

        ],
        "order": [[4, "desc"]]

    });
    table.on('processing.dt', function (e, settings, processing) {
        // $('#processing-modal').css( 'display', processing ? 'block' : 'none' );
        if (processing) {
            First = false;
            $('#processing-modal').modal({show: true});
        } else if (!First) {

            $('#processing-modal').modal('toggle');
        }

    });
    $("#companyTable").hide();
 

}
function searchResult() {
    var companyname = $("#company").val();
    summary(companyname);
    pieChart();
    titleTable(companyname);
    map(companyname);
   
}
;


function summary(companyname) {
    //alert(min+"!!");
    if (min !== "") {
        var url = "statistics/" + companyname;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "Json",
            success: function (data) {
                min = data.salaryMin;
                max = data.salaryMax;
                med = data.salaryMedian;
                console.log(min, max, med);
//           
                $("#maxSalary").text("$" + max  );
                $("#minSalary").text("$" + min );
                $("#medSalary").text("$" + med );
                $("#summary").show(200);

            },
            error: function (data) {
                alert("data loading failed");
            }
        });

    }
    else {
        console.log(min, max, med + "00");
        var url = "statistics/" + company;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "Json",
            success: function (data) {
                min = data.salaryMin;
                max = data.salaryMax;
                med = data.salaryMedian;
                console.log(min, max, med);
//           
                $("#maxSalary").text("$" + max + ".00");
                $("#minSalary").text("$" + min + ".00");
                $("#medSalary").text("$" + med + ".00");
                $("#summary").show(200);

            },
            error: function (data) {
                alert("data loading failed");
            }
        });
    }
}
;
function pieChart() {

}
;
function titleTable(company) {
    url = "titleStatistics/" + company;
    table.ajax.url(url).load();
    $("#companyTable").show(200);

}
;

function map(companyname){
        var url = "statistics/map/" + companyname;
 
        $.ajax({
            url: url,
            type: "GET",
            dataType: "Json",
            success: function (data) {
              mapdata = data;
               console.log(data); 
               
               function min(data){
        var a = data[0].numOfEmployee;
        for(var i = 1;i<data.length;i++){
            var b = data[i].numOfEmployee;
            if (b<=a){
                a = b;
            }
        }
        return a;
    }
               function max(data){
        var a = data[0].numOfEmployee;
        for(var i = 1;i<data.length;i++){
            var b = data[i].numOfEmployee;
            if (b>=a){
                a = b;
            }
        }
        return a;
        
    }
    
               var max = max(data);
               var min = min(data);
               var dataset = [["NY",66]];
               var map = new Datamap({
                  element: document.getElementById('location'),
                  scope:'usa',
                  fills: { defaultFill: '#F5F5F5' },
                  data: dataset,
                  geographyConfig: {
                        borderColor: '#DEDEDE',
                        highlightBorderWidth: 2,
                        // don't change color on mouse hover
                        highlightFillColor: function(geo) {
                            return geo['fillColor'] || '#F5F5F5';
                        },
                        // only change border
                        highlightBorderColor: '#B7B7B7',
                        // show desired information in tooltip
                        popupTemplate: function(geo, data) {
                        // don't show tooltip if country don't present in dataset
                             if (!data) { return ; }
                         // tooltip content
                            return ['<div class="hoverinfo">',
                                    '<strong>', geo.properties.name, '</strong>',
                                    '<br>Count: <strong>', data.numberOfThings, '</strong>',
                                    '</div>'].join('');
            }
        }
               });
            
               
            },
            error: function (data) {
                alert("Map data loading failed");
            }
        }); 

}

;
//
//function reSearchAction() {
//
//    $("#company").keyup(function () {
//        $("#companyTable").hide();
//        $("#summary").hide();
//    });
//
//}

function updateGraphs() {

    var companyname = $("#company").val();
    console.log("ssss" + companyname);
    $("#company").keydown(function () {
        console.log("change" + companyname);
        if (companyname.length !== 0) {
            updateSummary(companyname);
            updatePie();
            updateTable(companyname);
            updateMap();
        }
    });

}

function updateSummary(company) {
    console.log("update graph1");
    var url = "statistics/" + company;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "Json",
        success: function (data) {
            var min = data.salaryMin;
            var max = data.salaryMax;
            var med = data.salaryMedian;
            console.log(min, max, med);
//           
            $("#maxSalary").text("$" + max + ".00");
            $("#minSalary").text("$" + min + ".00");
            $("#medSalary").text("$" + med + ".00");


        },
        error: function (data) {
            alert("data loading failed");
        }
    });

}

function updateTable(company) {
    console.log("update table");
    var url = "titleStatistics/" + company;
    table.ajax.url(url).load();
}

function companySuggestion() {

    $.getJSON("json/employer.json", function (data) {

        $.each(data.employer, function (index, value) {
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
}
;

function back() {
    $("#backTop").on("click", function () {
        move();

    });

    $(window).on('scroll', function () {
        checkPosition($(window).height());
    });

    function move() {
        console.log("aaaaa");
        $("html,body").animate({
            scrollTop: 0
        }, 800);
    }
    function checkPosition(pos) {
        if ($(window).scrollTop() > pos) {
            $("#backTop").fadeIn();

        } else {
            $("#backTop").fadeOut();
        }
    }
}

$(document).ready(function () {
    // $(".allgraphs").hide();
//    $("#summary").hide();
    iniCompanyTable();

    companySuggestion();

    back();

});

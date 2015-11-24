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

function iniCompanyTable(company) {
    
    url = "titleStatistics/" + company;
    console.log("----" + company + "----");
    table = $("#companyEntry").DataTable({

        "pageLength": 5,
        "bFilter": false,
        "bLengthChange": false,
        "ajax": {
            "url": url, //specify ajax url
            //"type":"JSON",
            "dataSrc": ""
        },
        "columnDefs": [
            { "width": "50%", "targets": 0 },
            { "width": "15%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "15%", "targets": 3 },
            { "width": "5%", "targets": 4 },
            {
                "render": function ( data, type, row ) {
                    return "$" +data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {
                    return "$" +data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                },
                "targets": 2
            },
            {
                "render": function ( data, type, row ) {
                    return "$" +data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                },
                "targets": 3
            }

        ],
        "columns": [
            {"data": "jobTitle"},
            {"data": "stat.salaryMin"},
            {"data": "stat.salaryMax"},
            {"data": "stat.salaryMedian"},
            {"data": "count"},
            
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
    
    //console.log("00000000");

}
function searchResult() {
    var companyname = $("#company").val();
    summary(companyname);
    pieChart();
    titleTable(companyname);
    map();
}
function toDollar(data){
    return "$" +data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function summary(companyname) {
    var url = "statistics/" + encodeURIComponent(companyname);
        $.ajax({
            url: url,
            type: "GET",
            dataType: "Json",
            success: function (data) {
                min = data.salaryMin;
                max = data.salaryMax;
                med = data.salaryMedian;
           
                $("#maxSalary").text(toDollar(max));
                $("#minSalary").text(toDollar(min));
                $("#medSalary").text(toDollar(med));
                $("#summary").show(200);

            },
            error: function (data) {
                alert("data loading failed");
            }
        });
    
}
;
function pieChart() {

}
;
function titleTable(company) {
    if(table == null){
        console.log("table null");
        iniCompanyTable(company);
    }else{
        url = "titleStatistics/" + encodeURIComponent(company);
        table.ajax.url(url).load();

    }
    $("#table_wrapper").show(200);
    

}
;
function map() {

}
;

function reSearchAction() {

    $("#company").keyup(function () {
        $("#table_wrapper").hide();
        $("#summary").hide();
    });

}

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
    var url = "titleStatistics/" + encodeURIComponent(company);
    table.ajax.url(url).load();
}

var employerEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 5,
  remote: {
    url: 'typehead/employer?query=%QUERY',
    wildcard: '%QUERY'

  }
});

function companySuggestion() {
    $('.ajax-typehead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
        },{
        name:"employer",
        source: employerEngine
    }).on('typeahead:selected', function (obj, datum) {
            searchResult();
    });
}


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
    $('#companyEntry').removeClass( 'display' )
		.addClass('table table-striped table-bordered');

    $("#summary").hide();
    employerEngine.initialize();
    companySuggestion();
    reSearchAction();
    back();
    

});

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var employerName = "University Of Pittsburgh";
var employerName2 = "Google Inc."; //for test
var city = "";
var state = "";
var table = null;
function updateByCompany(employerName){
    url = "salary/employer/" + employerName;
    table.ajax.url(url).load();
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
    initByCompany(employerName);
    $('#entry').removeClass( 'display' )
		.addClass('table table-striped table-bordered');
    $('#employerName').val(employerName);
    $('#employerName').change(function(){
        updateByCompany($('#employerName').val());
    });
}

$(document).ready(function() {
    init();
} );
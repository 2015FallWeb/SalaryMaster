/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var employerName = "University Of Pittsburgh";
function updateByCompany(employerName){
    $('#entry').DataTable({
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
        ],
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
            
        ]
    });
    
}
function init(){
     console.log("init start");
     updateByCompany(employerName);
     $('#entry')
		.removeClass( 'display' )
		.addClass('table table-striped table-bordered');
}

$(document).ready(function() {
    init();
} );
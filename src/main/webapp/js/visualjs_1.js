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

var statesname = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

var statesShort= ['AL', 'AK', 'AZ', 'AR', 'CA',
  'CO', 'CT', 'DE', 'FL', 'GA', 'HI',
  'ID', 'IL', 'IN', 'Iowa', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN',
  'MS', 'MO', 'MT', 'Nebraska', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND',
  'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY'
];


function findState(state){
    for(var i = 0;i<statesname.length;i++){
        if(state===statesname[i]){
            return statesShort[i]; 
        }
    }
}

function map(companyname){
        $("#location").remove();
        $('#mapIntro').append("<div class='container' id='location'></div>");
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
               var dataset = {};
               var colorset = {};
               var series=[];
               for(var i =0;i<data.length;i++){
                   var state = data[i].state;
                   var shortName = findState(state);
                   series[i]=[shortName,data[i].numOfEmployee];
               }
               console.log("series= ~"+series);
               
                var paletteScale = d3.scale.linear()
                                     .domain([min,max])
                                     .range(["#EFEFFF","#02386F"]);
                            
                series.forEach(function(item){
                    var state = item[0];
                    var value = item[1];
                    dataset[state] = {
                        numberOfEmployees:value,
                        fillColor:paletteScale(value)
                    };
                    colorset[state]=paletteScale(value);
                    
                });
                
                console.log(colorset);
                $("#mapIntro").show(200);
               var map = new Datamap({
                  element: document.getElementById('location'),
                  scope:'usa',
                  fills: { defaultFill: '#FEFFFF' },
                  data: dataset,
                  geographyConfig: {
                        borderWidth: 1,
                        borderColor: '#999999',
                        popupOnHover: true,
                        highlightOnHover: true,
                        
                        
                       
                        highlightBorderWidth: 2,
                        // don't change color on mouse hover
                        highlightFillColor: function(geo) {
                            return geo['fillColor'] || '#FB7F5A';
                        },
                        // only change border
                        highlightBorderColor: '#B7B7B7',
                        // show desired information in tooltip
                        popupTemplate: function(geo, data) {
                        // don't show tooltip if country don't present in dataset
                             if (!data) {
                                 return ['<div class="hoverinfo">',
                                    '<strong>', geo.properties.name, '</strong>',
                                    '<br>Count: <strong>', 0, '</strong>',
                                    '</div>'].join(''); 
                            }
                         // tooltip content
                         else{
//                             console.log(data.numberOfEmployees+"0000000");
                            return ['<div class="hoverinfo">',
                                    '<strong>', geo.properties.name, '</strong>',
                                    '<br>Count: <strong>', data.numberOfEmployees, '</strong>',
                                    '</div>'].join('');
                            }
                             return ['<div class="hoverinfo">',
                                    '<strong>', geo.properties.name, '</strong>',
                                    '<br>Count: <strong>', data.numberOfEmployees, '</strong>',
                                    '</div>'].join('');
            }
        }
               });
            
               map.updateChoropleth(colorset);
               
               
               
            },
            error: function (data) {
                alert("Map data loading failed");
            }
        }); 

}

function pieChart(companyname) {
    $("#pieChart").remove();
    $('#graph12').append("<div  id='pieChart'></div>");
    url = "titleStatistics/" + companyname;
      $.ajax({
            url: url,
            type: "GET",
            dataType: "Json",
            success: function (piedata) {
                var top1 = piedata[0];
                var top2 = piedata[1];
                var top3 = piedata[2];
                var top4 = piedata[3];
                var top5 = piedata[4];
                
                var data = {
        "content": [
			{
				"label": top1.jobTitle,
				"value": top1.count,
				"color": "#FB7F5A"
			},
			{
				"label": top2.jobTitle,
				"value": top2.count,
				"color": "#525C89"
			},
                        {
				"label": top3.jobTitle,
				"value": top3.count,
				"color": "#1276EF"
			},
                         {
				"label": top4.jobTitle,
				"value": top4.count,
				"color": "#52D5CD"
			},
                         {
				"label": top5.jobTitle,
				"value": top5.count,
				"color": "#FEFFFF"
			}
                        
                    ]
    };
    
                var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"fontSize": 24,
			"font": "open sans"
		},
		"subtitle": {
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 9
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasHeight": 230,
		"canvasWidth": 600,
		"pieInnerRadius": "38%",
		"pieOuterRadius": "100%"
	},
	"data": data,
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"fontSize": 11
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "back",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
});         
            $("#top5").show(200);
            },
            error: function (data) {
                alert("data loading failed");
            }
        });
    
  
    
}

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
    pieChart(companyname);
    titleTable(companyname);
    map(companyname);
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

function reSearchAction() {

    $("#company").keyup(function () {
        $("#table_wrapper").hide();
        $("#summary").hide();
        $("#top5").hide();
        $("#mapIntro").hide();
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
    $("#top5").hide();
    employerEngine.initialize();
    companySuggestion();
    reSearchAction();
    back();
    

});

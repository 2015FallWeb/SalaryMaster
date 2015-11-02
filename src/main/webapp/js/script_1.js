/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('salaryApp', []);
var defaultEmployer = "University Of Pittsburgh"
app.controller('salaryCtrl', function($scope, $http, $filter) {
    $scope.employerName = defaultEmployer;
    $scope.$watch("salaryList", function() {
       sleep(1000);
       init();
    });
    $scope.query = function(){
           
         $http.get("salary/employer/" + $scope.employerName).success(function(response) {
         $scope.salaryList = response;
         console.log($scope.salaryList.length);});
      
    };
    $scope.query();
    
    
});

function init(){
     console.log("init start");
     $('#example').DataTable();
     console.log($('#example'));
     $('#example')
		.removeClass( 'display' )
		.addClass('table table-striped table-bordered');
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
//$(document).ready(function() {
//    init();
//} );
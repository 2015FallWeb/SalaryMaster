/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){

 	    	$("#aboutUsArea").hide();

 	    	$(".btnShow").hover(
 	    		function(){
 	    			$("#aboutUsArea").show(200);
 	    			$(".header").css({"background-color":"#DEE7EF"});
 	    		},
 	    		function(){
					$("#aboutUsArea").hide(200);
					$(".header").css({"background-color":"rgb(256,256,256)"});
 	    		})

 	    		
 	    });
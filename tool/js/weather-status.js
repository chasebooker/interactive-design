// jQuery(document).ready(function($) {
// 	$.ajax({
// 		url : "http://api.wunderground.com/api/2148427742f34360/geolookup/conditions/q/France/Toulouse.json",
// 		dataType : "jsonp",

// 		success : function(response) {


// 		if ($("#status").html().indexOf("inside") != -1) {
// 		  $("#weather").hide();
// 		}

// 		var location = response['location']['city'];
// 		var weather = response['current_observation']['weather'];
// 		$("#weather_text").html(weather + " <em>chez</em> Pépito");

// 	}
// 	});
// });
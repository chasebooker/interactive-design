$(document).ready(function(){

	$("#countdown").countdown({
		until: new Date(2015, 4-1, 10),
		format: 'd',
		layout: '{dn} {dl}'
	});

});
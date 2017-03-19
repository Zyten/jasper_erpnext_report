

function bind_events() {

	$(document).find("#jasper_print").click(function() {
		
		// hiding <br> elements and bringing them back after print
		// cant get @media print style overriding to work
		// if you were able to do it, pls send a PR :)
		$("#jasper_viewer").contents().find("br").css("display", "none");
		
		window.frames["jasper_viewer"].focus();
		window.frames["jasper_viewer"].print();
		
		$("#jasper_viewer").contents().find("br").css("display", "block");
	});

	$(document).find("#jasper_fullscreen").click(function() {
		var viewer = document.getElementById('jasper_viewer');
		var rFS = viewer.mozRequestFullScreen || viewer.webkitRequestFullscreen || viewer.requestFullscreen;
		rFS.call(viewer);
	});

};

frappe.ready(function() {

	$("#jasper_viewer").on('load', function(){
		
		if (rtype == "html") { 
			// do these only if its html we are previewing.. rtype comes from jinja /pages/Jasper Reports.html
		
			var jasper_viewer = $("#jasper_viewer").contents();		
			// make everything in pt rather than in px
			jasper_viewer.find("html").html(function(i, html){
				return html.replace(/\px/g, "pt");
			});			
			// make jrPage css to have page-break-after:always
			jasper_viewer.find('.jrPage').css("page-break-after", "always");		
		}
		
		bind_events();
	});

	$("#jasper_viewer").css({
		"padding":"10px",
		"padding-top":"30px",
	   "background":"#404040",
	   "webkit-border-radius": "7px",
	   "-moz-border-radius": "7px",
	   "border-radius": "7px",
	   "margin":"0 auto",
	   "overflow":"hidden"
	});

});
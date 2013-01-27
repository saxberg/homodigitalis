jQuery(function($){
	
	$('#bookindex ol').affix({
		offset: {
			top: function () {
				var pos = $('#bookexcerpt').position();
				return pos.top - $('#topnav').height();
			},
			bottom: function () {
				return $('#sources').height() + $('#natasha').height();
			}
		}
	});
	
});
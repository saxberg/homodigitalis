jQuery(function($){
	
	// set affix for book menu
	$('#bookindex ol').affix({
		offset: {
			top: function () {
				var pos = $('#bookexcerpt').position();
				return pos.top - $('#topnav').outerHeight(true);
			},
			bottom: function () {
				return $('#Natasha').outerHeight(true);
			}
		}
	});

	// track outbound links
	$.expr[':'].external = function (obj) {
		return (obj.hostname != location.hostname);
	};
	$('a:external').on('click', function (event) {
		event.preventDefault();
		var url = $(this).attr('href');
		try { 
			_gaq.push(['_trackEvent', 'Outbound Links', url]);
			if (url.indexOf('tel:') !== 0) {
				_gaq.push(function(){
					document.location.href = url;
				});
			}
		} catch (err) {
			document.location.href = url;
		}
	});
	
});
jQuery(function($){
	
	// size #slide1
	$(window).resize(function(){
		$('#slide1').css({
			height: $(window).height() - 100
		});
	});
	$(window).resize();
	
	// click #slide1 scrolls to #bookindex
	$('#slide1').on('click', function(){
		$('html, body').animate({
			scrollTop: $('#bookindex').position().top - 20
		}, 888);
	});
	
	// set affix for book menu
	$('#bookindex ol').affix({
		offset: {
			top: function () {
				return $('#bookexcerpt').position().top - $('#topnav').outerHeight(true);
			},
			bottom: 425
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


	// Facebook
	if ($('#fb-root').length > 0) {
		window.fbAsyncInit = function(){

			/*
			var access_token = null;

			FB.Event.subscribe('auth.statusChange', function (response) {
				if (response.status == 'connected') {
					access_token = response.authResponse.accessToken;
				}
			});
		
			FB.Event.subscribe('edge.create', function (response) {
				if (access_token == null) {
					return;
				}
				FB.api('/me/homodigitalis:toread', 'post', {
					access_token: access_token,
					book: 'http://homodigitalis.org/'
				}, function(){});
			});
			*/

		    // init the FB JS SDK
			FB.init({
				appId: '155692864582714',
				channelUrl: '//homodigitalis.org/channel.html',
				status: false,
				xfbml: true,
				cookie: false
			});

		};

		$.ajaxSetup({
			cache: true
		});	
		$.getScript('//connect.facebook.net/en_US/all.js');
	}

});
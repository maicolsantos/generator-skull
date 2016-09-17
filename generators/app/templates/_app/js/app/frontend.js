// LOAD FADE-IN-OUT IN PAGES
setTimeout(function() {
	$('body').attr('style', '-webkit-transform:translateY(-20px);-webkit-transform-origin:top center;opacity:0;-webkit-transition:0.5s;-moz-transition:0.5s;-ms-transition:0.5s;-o-transition:0.5s;transition:0.5s').addClass('loaded');
	setTimeout(function() {
		$('body').css('opacity', 1).css('-webkit-transform', 'none');
	}
	, 100);
}, 10);
$('a[href]:not([href^="mailto:"], [href^="tel:"], [href="#"], [target!="_blank"])').click(function(event) {
	if(!$(this).data('type')){
		if ($(this).attr('href').replace(/\/$/, "") != window.location.href.replace(/\/$/, "")) {
			if (!event.ctrlKey && !event.metaKey) {
				$('body').css('opacity', 0);
				setTimeout(function() {
					$('body').css('opacity', 1);
				}
				, 5000);
			}
		}
	}
	else{
		return false;
	}
});
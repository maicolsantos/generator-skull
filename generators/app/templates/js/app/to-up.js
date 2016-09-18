// Âncoras Topo
$(".to-up").on("click", function(event){
	var ancora = $(this).attr("href");
	if (ancora[0] == '#'){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $(ancora).offset().top-100
		}, 1000);
	}
});
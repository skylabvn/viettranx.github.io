//$(function() {
	$(document).ready(function() {
		setInterval(function() {
			$('div.youtube').each(function() {
				yID = $(this).attr('id');
				yW	= $(this).attr('yW') ? $(this).attr('yW') : 420;
				yH	= $(this).attr('yH') ? $(this).attr('yH') : 315;

				$(this).append('<iframe width="'+yW+'" height="'+yH+'" src="https://www.youtube.com/embed/'+yID+'" frameborder="0" allowfullscreen></iframe>').attr('class', '');

			});
		}, 1000);

		
	});
	
//});


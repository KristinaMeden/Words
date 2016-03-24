$(function() {
	$('#start-button').on('click', function() {
		var letters = $('#text-content').val().split('');
		
		for (var i=0; i<letters.length; i++) {
			$('<div></div>')
			.addClass('letter')
			.text(letters[i]).appendTo('#letters-container');
		}
		$('#form-container').hide();
		$('#game-container').show();
		
		
	});
	
	$('#letters-container').on('click', '.letter', function() {
		if ($(this).hasClass('letter-used')) {
			return;
		}
		var letter = $(this).text();
		$('#word-content').append(letter);
		$(this).addClass('letter-used');
	});
	
});
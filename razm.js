$(function() {
	var counter=0;
	var resultsPool=[];
	$('#start-button').on('click', function() {
		var letters = $('#text-content').val().toUpperCase().split('');
		
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

	$("#clear-button").on('click', function(){
		$('#word-content').text(' ');
		$(".letter").removeClass('letter-used');
	});
	$('#check-button').on('click', function(){
		var word = $('#word-content').text();
		if(resultsPool.indexOf(word) != -1){
			return;
		}
		$.ajax({
			url:"https://dictionary.yandex.net/api/v1/dicservice.json/lookup",
			dataType: "jsonp",
			data: {
				key: "dict.1.1.20160324T130623Z.85f31445d88c9608.2c29d693e88018bf388e176b296377e29fc02b49",
				text: word,
				lang: "ru-ru"
			}

		}).then(function(data) {
			if(data.def &&data.def.length>0){
				$('#word-content').text(' ');
				$(".letter").removeClass('letter-used');
				counter++;
				$('<div></div>')
				.addClass('result-item')
				.html(counter+". "+word+" &mdash; "+data.def[0].tr[0].text).appendTo('#result-container');
				resultsPool.push(word);
			}
		})
	})
});
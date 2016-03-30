$(document).ready(function(){
	var currentData;
	var x = $.ajax({
		type: "GET",
		url: "http://pokeapi.co/api/v1/pokemon/?limit=12",
		dataType: "json",
		beforeSend: function() {
			$('.main_header').hide();
			$('.next_page').hide();
		},
		cache: true,
		success: loadData
	});

	function loadData(data) {
		appendData(data);
		$('.main_header').show();
		$('.next_page').css("display", "flex");
	}

	function appendData(data){
		currentData = data;
		$.each(currentData.objects, function(index, element) {
			var source = $("#pokemon-template").html();
			var template = Handlebars.compile($.trim(source));
			var output = template(element);
			$('.pokemon_list').append(output);
			/*var item = "<li class='pokemon_list-item' data-id=" + element.national_id + ">";
				item += 	'<img src="http://pokeapi.co/media/img/' + element.national_id + '.png" class="pokemon_item-img">';
				item += 	"<h3 class='pokemon_list-heading'>" + element.name + "</h3>";
				item += 	"<ul class='pokemon_list-skills'>";
			for(var j = 0; j< element.types.length; j++) {
				item += "		<li class='pokemon_list-skills-item'>" + element.types[j].name + "</li>";
			}
				item += 	"</ul>";
				item += "</li>";
			$('.pokemon_list').append(item);*/
		});
	};

		/*for(var i=0; i<currentData.objects.length; i++) {

			
	}*/

	$("body").on("click", ".pokemon_list-item", function(){
		var $this = $(this);
		var id = $(this).data("id");
		var indexEl = $(this).index();
		var currentPokemon = $.get({
			type: "GET",
			url: "http://pokeapi.co/api/v1/pokemon/" + id,
			beforeSend: function(){
				$('.show').css("top", $(window).scrollTop()+"px");
			},
			dataType: "json",
			cache: true,
			success: showCurrentPokemon
		});

		function showCurrentPokemon(currentPokemon) {
			var source = $("#show-template").html();
			var template = Handlebars.compile($.trim(source));
			var output = template(currentPokemon);
			console.log(output)
			$("#show-template").html(output);
			/*var show = "";
			show += "<img src=" + $this.find('.pokemon_item-img').attr('src') + " class='show_img'>";	
			show += "<h1 class='show_heading'>" + currentPokemon.name + " #" + ('000' + (indexEl+1)).slice(-3) + "</h1>";
			show += "<div class='show_wrapper'>"
			for(var j = 0; j<currentPokemon.types.length; j++) {
				var type_name = "";
				type_name += currentPokemon.types[j].name;
			}
			show += "<div class='row'><span class='show_type key'>Type</span><span class='show_type value'>" + type_name + "</span></div>";
			show += "<div class='row'><span class='show_attack key'>Attack</span><span class='show_attack value'>" + currentPokemon.attack + "</span></div>";
			show += "<div class='row'><span class='show_defense key'>Defense</span><span class='show_defense value'>" + currentPokemon.defense + "</span></div>";
			show += "<div class='row'><span class='show_hp key'>HP</span><span class='show_hp value'>" + currentPokemon.hp + "</span></div>";
			show += "<div class='row'><span class='show_spAtk key'>SP Attack</span><span class='show_spAtk value'>" + currentPokemon.sp_atk + "</span></div>";
			show += "<div class='row'><span class='show_spDef key'>SP Defense</span><span class='show_spDef value'>" + currentPokemon.sp_def + "</span></div>";
			show += "<div class='row'><span class='show_speed key'>Speed</span><span class='show_speed value'>" + currentPokemon.speed + "</span></div>";
			show += "<div class='row'><span class='show_weight key'>Weight</span><span class='show_weight value'>" + currentPokemon.weight + "</span></div>";
			show += "<div class='row'><span class='show_moves key'>Total moves</span><span class='show_moves value'>" + currentPokemon.moves.length + "</span></div>";
			show += "</div>";*/
			/*$('.show').html(show).css('border', '2px solid #000');*/
		};
	});

	$('.next_page').on('click', function(e){
		e.preventDefault();
		$.get("http://pokeapi.co" + currentData.meta.next, loadData);
	});

	(function(){
		var type_list = $('.pokemon_list-skills');
		var pokemonType = $('.pokemon_list-skills-item');
		for(var i = 0; i<type_list.length; i++) {
			if(pokemonType[i].innerHTML === "water") { console.log("+"); pokemonType[i].css("backgroung-color", "lightblue")}
		}
	})()

})


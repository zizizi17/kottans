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
		$(".loader").hide(); 
		appendData(data);
		$('.main_header').show();
		$('.next_page').css("display", "flex");
	}

	function appendData(data){
		currentData = data;
		console.log(currentData);

		for(var i=0; i<data.objects.length; i++) {

			var item = "<li class='pokemon_list-item' data-id=" + data.objects[i].national_id + ">";
				item += 	'<img src="http://pokeapi.co/media/img/' + data.objects[i].national_id + '.png" class="pokemon_item-img">';
				item += 	"<h3 class='pokemon_list-heading'>" + data.objects[i].name + "</h3>";
				item += 	"<ul class='pokemon_list-skills'>";
			for(var j = 0; j<data.objects[i].types.length; j++) {
				item += "		<li class='pokemon_list-skills-item'>" + data.objects[i].types[j].name + "</li>";
			}
				item += 	"</ul>";
				item += "</li>";
			$('.pokemon_list').append(item);
		};
	}

	$("body").on("click", ".pokemon_list-item", function(){
			var $this = $(this);
			var id = $(this).data("id");
			var indexEl = $(this).index();
			var currentPokemon = $.get({
				type: "GET",
				url: "http://pokeapi.co/api/v1/pokemon/" + id,
				beforeSend: function(){
					$('.show_loader').show();
					$('.show').css("top", $(window).scrollTop());
				},
				dataType: "json",
				cache: true,
				success: loadPokemon
			});
			
			function loadPokemon(currentPokemon) {
				$('.show_loader').hide();
				showCurrentPokemon(currentPokemon);
			}	

			function showCurrentPokemon(currentPokemon) {
				var show = "";
				show += "<img src='721.gif' class='show_loader' style='display: none'>"
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
				show += "</div>";
				$('.show').html(show).css('border', '2px solid #000');
				
		};
	});

	$('.next_page').on('click', function(e){
		e.preventDefault();
		$(".loader").show();
		window.scrollTo(0,document.body.scrollHeight);
		$.get("http://pokeapi.co" + currentData.meta.next, loadData);
	});


})
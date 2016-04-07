$(document).ready(function(){
	var currentData;
	var pokemonTypeLabel = ["water", "grass", "poison", "ground", "fire", "electric", "bug", "flying", "fairy", "fighting", "physics", "rock", "steel", "ice", "ghost", "dragon", "dark"];
	var pokemonTypeColor = ["#25d5f2", "#21fbb0", "#b514aa", "brown", "#f04877", "#dfcf8f", "#949494", "#ffa500", "#cfd05c", "#547ded", "#29b7ce", "#a19898", "#b8d1e7", "#00adef", "rgba(255,255,255, .9)", "#ff6666", 
"#ba8d38", "#eae5e5"];
	var x = $.ajax({
		type: "GET",
		url: "http://pokeapi.co/api/v1/pokemon/?limit=12",
		dataType: "json",
		beforeSend: function() {
			$('.main_header').hide();
			$('.next_page').hide();
		},
		success: loadData
	});

	function loadData(data) {
		appendData(data);
		$('.main_header').show();
		$('.navigation').show();
		$('.loader').hide();
		$('.next_page').css("display", "flex");
	}
	//function for taking data from server and make pokemon_card
	function appendData(data){
		currentData = data;
		$.each(currentData.objects, function(i, el){
			el.types.sort(function(a,b){
				return a.name > b.name ? 1 : -1;
			});
		});
		$.each(currentData.objects, function(index, element) {
			var source = $("#pokemon-template").html();
			var template = Handlebars.compile($.trim(source));
			var output = template(element);
			$('.pokemon_list').append(output);
		});

		$('.pokemon_list-skills-item').each(function(){
			$(this).css('background', pokemonTypeColor[pokemonTypeLabel.indexOf($(this).html())]);
		});
	};

	//adding new displaying pokemon_show-card to the list
	$("body").on("click", ".pokemon_list-item", function(){
		var $this = $(this);
		var id = $(this).data("id");
		var indexEl = $(this).index();
		var currentPokemon = $.get({
			type: "GET",
			url: "http://pokeapi.co/api/v1/pokemon/" + id,
			beforeSend: function(){
				$(".show_loader").show();
			},
			dataType: "json",
			cache: true,
			success: showCurrentPokemon
		});
		//creating pokemon_show-card
		function showCurrentPokemon(currentPokemon) {
			var show = "";
			var type_name = "";
			show += "<img src=" + $this.find('.pokemon_item-img').attr('src') + " class='show_img'>";	
			show += "<h1 class='show_heading'>" + currentPokemon.name + " #" + ('000' + (indexEl+1)).slice(-3) + "</h1>";
			show += "<div class='show_wrapper'>"
			for(var j = 0; j<currentPokemon.types.length; j++) {
				type_name += currentPokemon.types[j].name;
				type_name += "</br>"
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
			show += "<img class='show_loader' src='default.svg'>"
			show += "</div>";
			$('.show').html(show).css('border', '2px solid #777');
			$(".show_loader").hide();
		};
	});
	//load another 12 pokemon cards
	$('.next_page').on('click', function(e){
		e.preventDefault();
		$('.loader').css("display", "flex");
		window.scrollTo(0,document.body.scrollHeight);
		$.get("http://pokeapi.co" + currentData.meta.next, loadData);
	});

	$("body").on("click", ".pokemon_list-skills-item", function() {
		$("html, body").animate({scrollTop: 0}, 500);
		skillToSortBy = $(this).html();
		$('.pokemon_list-item').each(function() {
			$(this).find('.pokemon_list-skills-item').each(function() {
				if ($(this).html() == skillToSortBy) {
					$(this).prependTo($(this).parent());
				}
			});
		});

		var _this = $(this);
		var ul = $(".pokemon_list");
		var arr = $.makeArray(ul.children("li"));

		arr.sort(function(a, b) {
		    var skillsA = concatList($(a).find(".pokemon_list-skills"));
		    var skillsB = concatList($(b).find(".pokemon_list-skills"));

		    if (skillsA == skillsB) {
		    	var pokemonAName = $(a).find('.pokemon_list-heading').html();
		    	var pokemonBName = $(b).find('.pokemon_list-heading').html();
		    	return genericCompare(pokemonAName, pokemonBName);
		    }

		    if(skillsA.startsWith(skillToSortBy)) {
		    	if(skillsB.startsWith(skillToSortBy)) {
		    		return genericCompare(skillsA, skillsB)
		    	} else {
		    		return -1;
		    	}
		    } else {
		    	if(skillsB.startsWith(skillToSortBy)) {
		    		return +1;
		    	} else {
		    		return genericCompare(skillsA, skillsB)
		    	}
		    }
		});

		ul.empty();

		$.each(arr, function() {
		    ul.append(this);
		});
	})
});

	//functions for sorting elements
	function genericCompare(a, b) {
		if(a == b) {
			return 0;
		} else if (a > b) {
			return 1;
		} else {
			return -1;
		}
	}

	function concatList($list) {
		var res = "";
		$($list).children('li').each(function() {
			res += $(this).html();
		});
		return res;
	}


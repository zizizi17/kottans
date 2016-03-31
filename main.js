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
	//function for taking data from server and make pokemon_card
	function appendData(data){
		currentData = data;

		console.log(currentData)
		$.each(currentData.objects, function(index, element) {
			var source = $("#pokemon-template").html();
			var template = Handlebars.compile($.trim(source));
			var output = template(element);
			$('.pokemon_list').append(output);
			for(var i = 0; i<$('.pokemon_list-skills-item').length; i++) { 
			  labels(i);
			}
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
				$('.show').css("top", $(window).scrollTop()+"px");
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
			show += "</div>";
			$('.show').html(show).css('border', '2px solid #000');
		};
	});
	//load another 12 pokemon cards
	$('.next_page').on('click', function(e){
		e.preventDefault();
		$.get("http://pokeapi.co" + currentData.meta.next, loadData);
	});

	//taking the color for the label at card
	function labels(i) { 
		switch($('.pokemon_list-skills-item')[i].innerHTML) {
			case "water":
				$('.pokemon_list-skills-item')[i].style.background = "#25d5f2";
				break;
			case "grass": 
				$('.pokemon_list-skills-item')[i].style.background = "#21fbb0";
				break;
			case "poison":
				$('.pokemon_list-skills-item')[i].style.background = "#b514aa";
				break;
			case "ground":
				$('.pokemon_list-skills-item')[i].style.background = "brown";
				break;
			case "fire":
				$('.pokemon_list-skills-item')[i].style.background = "#f04877";
				break;
			case "electric":
				$('.pokemon_list-skills-item')[i].style.background = "#dfcf8f";
				break;
			case "bug": 
				$('.pokemon_list-skills-item')[i].style.background = "#949494";
				break;
			case "flying":
				$('.pokemon_list-skills-item')[i].style.background = "#ffa500";
				break;
			case "fairy":
				$('.pokemon_list-skills-item')[i].style.background = "#cfd05c";
				break;
			case "fighting":
				$('.pokemon_list-skills-item')[i].style.background = "#e5447ded";
				break;
			case "physics":
				$('.pokemon_list-skills-item')[i].style.background = "#29b7ce";
				break;
			case "rock":
				$('.pokemon_list-skills-item')[i].style.background = "#a19898";
				break;
			case "steel":
				$('.pokemon_list-skills-item')[i].style.background = "#b8d1e7";
				break;
			case "ice":
				$('.pokemon_list-skills-item')[i].style.background = "#00adef";
				break;
			case "ghost":
				$('.pokemon_list-skills-item')[i].style.background = "rgba(255,255,255, .9)";
				break;
			case "dragon":
				$('.pokemon_list-skills-item')[i].style.background = "#ff6666";
				break;
			case "dark":
				$('.pokemon_list-skills-item')[i].style.background = "#ba8d38";
				break;
			default:
				$('.pokemon_list-skills-item')[i].style.background = "#eae5e5;"
		}	
	}

	$(".sort").on('click', function(){
	/*	var ul = $(".pokemon_list");
		var arr = $.makeArray(ul.children("li"));

		arr.sort(function(a, b) {
		    var textA = $(a).data("type");
		    var textB = $(b).data("type");
		    
			
			
		});

		ul.empty();

		$.each(arr, function() {
		    ul.append(this);
		});
	})*/


    var that = this, 
    	$allListElements = $('.pokemon_list > li');

    var $matchingListElements = $allListElements.filter(function(i, li){
        var listItemText = $(li).text().toLowerCase(), 
            searchText = "normal".toLowerCase();
        return ~listItemText.indexOf(searchText);
    });

    $allListElements.hide();
    $matchingListElements.show();




	});

	 $('body').on('click', '.reset', function() {
		$('.pokemon_list > li').show();
	})

});


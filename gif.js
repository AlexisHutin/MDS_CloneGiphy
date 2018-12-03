
var GIF_URL = "http://api.giphy.com";
var KEY = "0yAMhr3SDIyS3MuNDZ4MtqO4TJzJz0EZ";
var LIMIT_GIFS = 35;
var OFFSET_GIFS = 0;

$(document).keypress(function(e){
	if(e.which == 13){
		searchGIFs();
	}
});

$(window).scroll(function(){
	if($(window).scrollTop() + $(window).height() > $(document).height() - 20){
		OFFSET_GIFS += LIMIT_GIFS;
		searchGIFs();
	}
});



function searchGIFs(){
	var query = $("#search > input").val();

	if(!query.trim()){
		alert("MET DES MOTS !");
		return;
	}


	$.get(GIF_URL + "/v1/gifs/search?api_key=" + KEY + "&q=" + query + "&limit=" + LIMIT_GIFS + "&offset=" + OFFSET_GIFS, function(data,status){
		
		if(status != "success"){
			alert("ERROR");
			return;
		}

		var gifs = data.data;

		if(gifs.length <= 0){
			alert("ERROR ! no data found");
			return;
		}

		for(var i = 0; i < gifs.length; i++){
			var gif = gifs[i];
			var previewUrl = gif.images.preview_gif.url;
			//console.log(previewUrl);
			$("#gifs").append("<img src='"+previewUrl+"' class='gif'>");
		}
	})
}
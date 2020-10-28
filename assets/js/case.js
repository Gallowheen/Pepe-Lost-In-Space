document.documentElement.className = document.documentElement.className.replace("no-js","js");

$(document).ready(function(){
	
	var p = document.querySelectorAll(".p");
	var i = 1;
	var test = document.querySelectorAll(".button");

	p[0].classList.add("appeared");

	setTimeout(function(){
		for (var i = 0; i < test.length; i++){
			test[i].classList.add("loaded");
		}
	},500);

	$(window).scroll(function() {
	   	var y = window.scrollY;


	   	if($(window).width() <= 500){
	   		if ( window.scrollY >= i * 200){
				if ( i < p.length){
					if (!p[i].classList.contains('appeared'))
					p[i].classList.add("appeared");
					i++;
				}
			}
	   	}	
	   	else if ($(window).width() <= 1024){
	   		if ( window.scrollY >= i * 250){
				if ( i < p.length){
					if (!p[i].classList.contains('appeared'))
					p[i].classList.add("appeared");
					i++;
				}
			}
	   	}   	
	   	else{
	   		if ( window.scrollY >= i * 350){
				if ( i < p.length){
					if (!p[i].classList.contains('appeared'))
					p[i].classList.add("appeared");
					i++;
				}
			}
	   	}
	}); 
});
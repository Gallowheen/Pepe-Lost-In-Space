document.documentElement.className = document.documentElement.className.replace("no-js","js");

$(document).ready(function(){


	var test = document.querySelectorAll(".button");
	var i = 0;

	setTimeout(function(){
		for (var i = 0; i < test.length; i++){
			test[i].classList.add("loaded");
		}
	},500);

	var background = document.querySelector(".stars");
	var asteroid = document.querySelector(".asteroid");
	var earth = document.querySelector(".earth");
	var missile = document.querySelectorAll(".missile");
	var p = document.querySelectorAll(".p");
	var bonus = document.querySelectorAll(".bonus__el");
	var play = document.querySelector(".play");

	play.addEventListener("click", function(){
		document.querySelector('.game__div').scrollIntoView({ behavior: 'smooth' });
	});
	$(window).scroll(function() {
	   	var y = window.scrollY;
		background.style.backgroundPosition = "0px " + y/5+"px";

		if ( window.scrollY >= 100){
			for (var i = 0; i < p.length; i++){
				if (!p[i].classList.contains('appeared'))
				p[i].classList.add("appeared");
			}
		}

		if ( window.scrollY <= 600){
			asteroid.style.top = -15 + y/100 * 3 +"%";
			earth.style.bottom = 0 + y/100 * 10+"%"; 
		}
		
		if ( window.scrollY >= 900 && window.scrollY <= 1200){
			for (var i = 0; i < bonus.length; i++){
				if (!bonus[i].classList.contains('appeared'))
				bonus[i].classList.add("appeared");
			}
		}

		if ( window.scrollY >= 2900){
			for (i = 0; i < missile.length; i++){
				if (i<2){
					missile[i].style.top = 0 + y/50 +"%";
				}
				else if(i >= 2 && i < 4){
					missile[i].style.top = -60 + y/40 +"%";
				}
				else{
					missile[i].style.top = -100 + y/40 +"%";
				}
			}
		}
	}); 
});
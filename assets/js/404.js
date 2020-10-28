document.documentElement.className = document.documentElement.className.replace("no-js","js");

$(document).ready(function(){

	var back = document.querySelectorAll(".back");

	back[0].addEventListener("click",function(){
		window.history.back();
	});
});
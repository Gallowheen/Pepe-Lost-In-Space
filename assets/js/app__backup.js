$(document).ready(function(){
	var canvas = document.getElementById("Canvas");
	var ctx = canvas.getContext("2d");
	var gameIsOn = false;
	var gameOver = false;

	//Permet d'avoir 60fps
	var targetFPS = 60;
	//var gameSpeed;
	var gameSpeed = setInterval(draw, 1000 / targetFPS);

	//Demo du jeu
	var demoIsOn = true;

	//Différents onclick
	var pause = document.getElementById("resume");
	pause.addEventListener("click",function(){
		triggerGame();
	});
	var reset = document.getElementById("restart");
	reset.addEventListener("click",function(){
		resetGame();
	});
	var mute = document.getElementById("mute");
	mute.addEventListener("click",function(){
		muteGame();
	});
	var restartOver = document.getElementById("restartOver");
	restartOver.addEventListener("click",function(){
		resetGame();
	});

	var twitter = document.querySelector(".twitter");
	var gameMenu;
	gameMenu = document.getElementById("menu");
	var gameOverlay;
	gameOverlay = document.getElementById("overlay");
	var gameOverDiv = document.getElementById("over");
	var scoreDiv = document.getElementById("score");
	var record = document.getElementById("record");
	var pseudoText = document.getElementById("pseudo");

	var send = document.getElementById("send");
	send.addEventListener("click",function(){

		sendScore(-score)
		// var scoreToSend = -score;
		// var pseudo = "ZZZ";
		// //console.log(scoreToSend);	
		// if(!$('#pseudo').val() == ""){
		// 	pseudo = $('#pseudo').val().toUpperCase();
		// }
		// if(scoreToSend > 0){

		// 	$.ajax({
		// 		method: "POST",
		// 		data:{score:scoreToSend,pseudo:pseudo},
		// 		url:"updatescore.php",
		// 	})
		// 	.done(function(result){ 
		// 		console.log(result)
		// 		//On charge le highscore après s'être assuré que le score est dans la base de donnée
		// 		//Comme Ajax est asynchrone
		// 		$.getJSON('highscore.php',jsonCallBack);

		// 		function jsonCallBack(data){
		// 			if(data != undefined){
		// 				highscore = data.score[0].score;
		// 				hiScore = data.score[0].score;
		// 				//console.log(data.score[0].score);

		// 				var html = "<li class='list__header clearfix'>"+"<div>"+"Rank"+"</div>"+"<div>"+"Score"+"</div>"+"<div>"+"Name"+"</div>"+"</li>";

		// 				for(var i = 0; i < 10 && data.score[i].pseudo != undefined; i++){
		// 					$(".top10").html(html += "<li class='list__el clearfix'>"+ "<div>"+ (i+1) +"</div>" +"<div>" + data.score[i].score + "</div>" +  "<div>" + data.score[i].pseudo +"</div>" + "</li>");
		// 				}

		// 				$(".top10").html(html);
		// 			}
		// 			//console.log(highscore);
		// 		}
		// 		jsonCallBack();
		// 	});
		// }
		// $('.pseudo__div').css('display', 'none');
	});


	//Information du personnage
	var posX = canvas.width / 2 - 22.5;
	var posY = canvas.height - 35 ;
	var length = 50;
	var height = 50;
	var isInvulnerable = false;
	var numberOfMissileMax = 5;
	var numberOfShield = 1;
	var numberOfShieldMax = 3;
	var isShielded = false;
	var reload = 0;
	var reloadTime = 20;//10 max, 20 au début

	//Velocité
	var accelX = 0;
	var accelY = 0;

	//nombre de vie
	var life = 1;

	// Image du personnage
	var herosImg = new Image();
	herosImg.src = "assets/img/vaisseau2.png";
	//Image du terrain
	var background = new Image();
	background.src = "assets/img/nebula2.jpg";

	//Image de l'astéroides
	var asteroideImg1 = new Image();
	asteroideImg1.src = "assets/img/asteroide1.png";
	var asteroideImg2 = new Image();
	asteroideImg2.src = "assets/img/asteroide2.png";
	var asteroideImg3 = new Image();
	asteroideImg3.src = "assets/img/asteroide3.png";
	//Objet astéroide
	var asteroide = {
		posX:50, 
		posY:10,
		length:50,
		height:50,
		velocityX:1,
		velocityY:2,
		img:asteroideImg1
	};

	//Image du missile
	var missileImg = new Image();
	missileImg.src = "assets/img/missile.png";
	//Objet missile
	var missile = {
		posX:0, 
		posY:0,
		length:15,
		height:25,
		velocityY:5,
		img:missileImg
	};
	var shieldImg = new Image();
	shieldImg.src = "assets/img/shield.png";
	//Objet shield
	var shield = {
		posX:0, 
		posY:0,
		length:25,
		height:25,
		velocityY:1,
		img:shield
	};
	var fireRateUpImg = new Image();
	fireRateUpImg.src = "assets/img/fireRateUp.png";
	//Objet shield
	var fireRateUp = {
		posX:0, 
		posY:0,
		length:25,
		height:25,
		velocityY:1,
		img:fireRateUpImg
	};
	var healImg = new Image();
	healImg.src = "assets/img/heal.png";
	//Objet shield
	var heal = {
		posX:0, 
		posY:0,
		length:25,
		height:25,
		velocityY:1,
		img:healImg
	};
	var healUI = new Image();
	healUI.src = "assets/img/healUI.png";
	var shieldUI = new Image();
	shieldUI.src = "assets/img/shieldUI.png";

	var numberOfAsteroidMax = 2;
	var listeAsteroides = [];
	var listeMissile = [];
	var listeBonus = [];
	var listeExplosion = [];

	//Taille du canvas
	var x = canvas.width;
	var y = canvas.height;

	//Defilement
	var score = 0;
	var scroll = 0;

	//Random
	var randomSpawnBonus;

	//Sprite
	var tick = 0;
	var tickSpeed = 4;
	var frame = 1;
	var sprite = new Image();
	sprite.src = "assets/img/sprite.png";
	var offsetX = 0;
	var offsetY = 0;

	//Banque des sons du jeu
	var explosion = new Audio("assets/sound/explosion3.wav");
	explosion.volume = .50;
	explosion.muted = true;
	var launch = new Audio("assets/sound/launchMissile2.wav");
	launch.volume = .15;
	launch.duration = 0.15;
	launch.muted = true;
	var shieldSound = new Audio("assets/sound/shield.wav");
	shieldSound.volume = 1;
	shieldSound.muted = true;
	var shieldDeflect = new Audio("assets/sound/shielddeflect.wav");
	shieldDeflect.muted = true;
	var ambiant = new Audio("assets/sound/Corneria.mp3");
	ambiant.volume = 0.30;
	ambiant.muted = true;
	var bonus = new Audio("assets/sound/bonus.wav");
	bonus.volume = 1;
	bonus.muted = true;
	var alertSound = new Audio("assets/sound/alert.wav");
	alertSound.volume = 0.05;
	alertSound.muted = true;

	//anticheat
	var element;
	var showWarning = false;
	//L'anticheat ne fonctionne que sur Chrome
	var isFirefox = typeof InstallTrigger !== 'undefined';
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
	var devtools = false;

	//HighScore
	var highscore;
	var hiScore;
	//On charge le highscore
	$.getJSON('highscore.php',jsonCallBack);

	function jsonCallBack(data){
		if(data != undefined){
			highscore = data.score[0].score;
			hiScore = data.score[0].score;
			//console.log(data.score[0].score);

			var html = "<li class='list__header clearfix'>"+"<div>"+"Rank"+"</div>"+"<div>"+"Score"+"</div>"+"<div>"+"Name"+"</div>"+"</li>";

			for(var i = 0; i < 10 && data.score[i].pseudo != undefined; i++){
				$(".top10").html(html += "<li class='list__el clearfix'>"+ "<div>"+ (i+1) +"</div>" +"<div>" + data.score[i].score + "</div>" +  "<div>" + data.score[i].pseudo +"</div>" + "</li>");
			}

			$(".top10").html(html);
		}
		//console.log(highscore);
	}
	jsonCallBack();

	//Affichage des données pour le joueurs
	function showLogs(){
		ctx.beginPath();
		ctx.font = "30px PixelyishFont";
		ctx.fillText((-score),x-100,90);
		ctx.fillStyle = "white";
		ctx.closePath();
		ctx.beginPath();
		ctx.font = "30px PixelyishFont";
		ctx.fillText(hiScore,355,90);
		ctx.fillStyle = "white";
		ctx.closePath();
		ctx.beginPath();
		ctx.font = "35px PixelyishFont";
		ctx.fillText(life,90,45);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.closePath();
		ctx.beginPath();
		ctx.font = "35px PixelyishFont";
		ctx.fillText(numberOfShield + "/"+numberOfShieldMax,100,y - 20);
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.closePath();
		ctx.beginPath();
		ctx.font = "30px PixelyishFont";
		ctx.fillText("SCORE",x-100,45);
		ctx.fillStyle = "red";
		ctx.closePath();
		ctx.beginPath();
		ctx.font = "30px PixelyishFont";
		ctx.fillText("HIGH SCORE",355,45);
		ctx.fillStyle = "white";
		ctx.closePath();
		

		drawImage(shieldUI,45,y-35,50,50);
		drawImage(healUI,45,35,50,50);
		//document.getElementById("logs").innerHTML = posX + " " +  (posY + (-totalScroll)) +"<br>" + -totalScroll +"<br>" + -scroll +"<br>" + "life : " + life + "<br>" + "Score " + (posY + (-totalScroll));
	}

	function draw(){
		tick += 1;

		if(tick >= tickSpeed){

			tick = 0;
			if ( -score > hiScore){
				hiScore = -score;
			}
		}
		

		//Liste des index des astéroïdes à supprimer
		var removeFromIndexAsteroide = [];
		//Liste des index des missiles à supprimer
		var removeFromIndexMissile = [];
		//Liste des index des bonus
		var removeFromIndexBonus = [];
		//Liste des index des explosions
		var removeFromIndexExplosion =[];

		initCanvas();
		drawImage(herosImg,posX,posY,length,height);

		if(!demoIsOn){
			//Permet de gérer le tir des missiles
				if (reload == reloadTime){
				launch.currentTime = 0;
				launch.play();
				listeMissile.push(launchMissileLeft(posX,posY));
				listeMissile.push(launchMissileRight(posX,posY));
				reload = 0;
			}
		}

		//Conditions pour ne pas que le héros sorte de l'écran
		if (posX + accelX > canvas.width - length / 2  || posX + accelX < 0 + length / 2){

		}
		else{
			posX = posX + accelX;
		}

		if (posY + accelY > canvas.height - height / 2 || posY + accelY < 0 + height / 2 ){

		}
		else{
			posY = posY + accelY;
		}
		//----------------------------------------------------------------

		//Scroll
		if(!demoIsOn){
			score = score - 1;
		}
		scroll = scroll - 1;

		if(!demoIsOn){
			//Condition et boucle qui permet de faire spawn les nouveaux astéroïdes
			if ( listeAsteroides.length < numberOfAsteroidMax){
				//console.log(listeAsteroides.length);
				for (var i = 0; i < numberOfAsteroidMax - listeAsteroides.length; i++){
					//console.log("lol");
					listeAsteroides.push(randomAsteroid());
				}
			}
		}
		//--------------------------------------------------------------------

		//Condition qui permet de reset le scroll et augmenter la difficulté du jeu
		if (scroll < -canvas.height ){

			// scroll = 500;
			if(!demoIsOn){
				numberOfAsteroidMax += 1;
			}
			scroll = 0;

			if(!demoIsOn){
				randomSpawnBonus = Math.floor((Math.random() * 100) + 1);
				if (randomSpawnBonus >= 0 && randomSpawnBonus <= 50){

					var randomChoiceBonus = Math.floor((Math.random() * 3) + 1);

					if(randomChoiceBonus == 1){
						listeBonus.push(spawnShield());
					}
					if(randomChoiceBonus == 2){
						listeBonus.push(spawnFireRateUp());
					}
					if(randomChoiceBonus == 3){
						listeBonus.push(spawnHeal());
					}
				}
			}
		}
		if(!demoIsOn){
			//Si un bonus existe en jeu
			if (listeBonus.length >= 1){
				//Pour chaque bonus
				$.each(listeBonus, function(cle,value){
					//on update sa position horizontale
					listeBonus[cle].posY += listeBonus[cle].velocityY;

					//on dessine le bonus
					drawImage(listeBonus[cle].img,listeBonus[cle].posX,listeBonus[cle].posY,listeBonus[cle].length,listeBonus[cle].height);

					//gestion de collision
					if (calculDistance(listeBonus[cle].posX,listeBonus[cle].posY,posX,posY) <= listeBonus[cle].length / 2 ){
						removeFromIndexBonus.push(cle);

						//On différencie les types de bonus
						if ( listeBonus[cle].type == "shield" && numberOfShield < numberOfShieldMax)
							numberOfShield += 1;
						if (listeBonus[cle].type == "fireUp" && reloadTime > 8){
							reloadTime -= 2 ;
							reload = 0;
						}
						if (listeBonus[cle].type == "heal"){
							life += 1;
						}
						score = score - 500;
						bonus.play();
					}

					//on ajoute l'index du bonus pris
					if(listeBonus[cle].posY + listeBonus[cle].height >= canvas.height + (listeBonus[cle].height * 2 )){
		   				removeFromIndexBonus.push(cle);
		  			}
				});
				//On supprime le bonus
				for (var i = removeFromIndexBonus.length -1; i >= 0; i--){
		    		listeBonus.splice(removeFromIndexBonus[i],1);
				}
			}

			//Condition qui permet d'éviter les erreurs
			if(listeMissile.length >= 1){
				//On parcourt la liste des missiles
				$.each(listeMissile, function(cle, value){
					//On update leurs positions
					listeMissile[cle].posY -= listeMissile[cle].velocityY;

					//On les dessines
					drawImage(listeMissile[cle].img,listeMissile[cle].posX,listeMissile[cle].posY,listeMissile[cle].length,listeMissile[cle].height);

					//On parcourt la liste des astéroïdes
					$.each(listeAsteroides,function(cle2, value){
						//Si un astéroïde et un missile rentre en collision
						if (calculDistance(listeAsteroides[cle2].posX,listeAsteroides[cle2].posY,listeMissile[cle].posX,listeMissile[cle].posY) <= listeAsteroides[cle2].length / 2){
							removeFromIndexAsteroide.push(cle2);
							removeFromIndexMissile.push(cle);
							score = score - 100;
							explosion.currentTime = 0;
							explosion.play();

							//On ajoute l'impact dans la liste d'explosion
							listeExplosion.push({
								posExplosionX:listeAsteroides[cle2].posX,
								posExplosionY:listeAsteroides[cle2].posY,
								widthExplosion:listeAsteroides[cle2].length,
								heightExplosion:listeAsteroides[cle2].height,
							 	offsetX:0,
								offsetY:0,
								tickActuel:0,
								tickSpeed:3,
								frame:1
							})
						}
					});

					//Gestion des missiles : Si il dépasse du canvas, il est mis dans le tableau removeFromIndex
					if(listeMissile[cle].posY + listeMissile[cle].height <= 0 - (listeMissile[cle].height * 2 )){
		   				removeFromIndexMissile.push(cle);
		  			}
		  			//------------------------------------------------------------------------------------------------------------------
				});

				//On supprime les missiles à l'aide de leurs indexs
				for (var i = removeFromIndexMissile.length -1; i >= 0; i--){
				    listeMissile.splice(removeFromIndexMissile[i],1);
				}
			}

			//boucle sur chaque element dans le tableau astéroïdes
			$.each(listeAsteroides, function(cle, value) {
				//console.log(listeAsteroides[cle]);

				//Condition pour prévenir des erreurs
				if ( listeAsteroides[cle] != undefined){

					//On update la position de l'astéroïde
					listeAsteroides[cle].posX += listeAsteroides[cle].velocityX;
					listeAsteroides[cle].posY += listeAsteroides[cle].velocityY;
					listeAsteroides[cle].rotate += listeAsteroides[cle].rotatespeed;
					//---------------------------------------------------------------

					//On desine l'astéroïde
					drawAsteroid(listeAsteroides[cle].img,listeAsteroides[cle].posX,listeAsteroides[cle].posY,listeAsteroides[cle].length,listeAsteroides[cle].height,listeAsteroides[cle].rotate);

					//Gestion de la collision
					if (!isInvulnerable){
						if (calculDistance(listeAsteroides[cle].posX,listeAsteroides[cle].posY,posX,posY) <= listeAsteroides[cle].length / 2 ){
							removeFromIndexAsteroide.push(cle);

							if (!isShielded){
								alertSound.currentTime = 0;
								alertSound.play();
								herosImg.src = "assets/img/vaisseau4.png";

								listeExplosion.push({
									posExplosionX:posX,
									posExplosionY:posY,
									widthExplosion:length,
									heightExplosion:height,
								 	offsetX:0,
									offsetY:0,
									tickActuel:0,
									tickSpeed:3,
									frame:1
								})

								life -= 1;

								if ( life <= 0 ){
									gameOver = true;
									triggerGame();
									gameIsOn = !gameIsOn;
									pause.disabled = true;
								}

								isInvulnerable = !isInvulnerable;
								setTimeout(function(){
									isInvulnerable =! isInvulnerable;
									herosImg.src = "assets/img/vaisseau2.png";
								},3000);
							}
							else{
								shieldDeflect.play();
							}
							//On ajoute l'explosion de l'impact dans le tableau
							listeExplosion.push({
								posExplosionX:listeAsteroides[cle].posX,
								posExplosionY:listeAsteroides[cle].posY,
								widthExplosion:listeAsteroides[cle].length,
								heightExplosion:listeAsteroides[cle].height,
							 	offsetX:0,
								offsetY:0,
								tickActuel:0,
								tickSpeed:3,
								frame:1
							})
						}
					}

					//Gestion de l'astéroïde : Si il dépasse du canvas, il est mis dans le tableau removeFromIndex
					if(listeAsteroides[cle].posY + listeAsteroides[cle].height >= canvas.height + (listeAsteroides[cle].height * 2 )){
		   				removeFromIndexAsteroide.push(cle);
		  			}
		  			else if(listeAsteroides[cle].posX + listeAsteroides[cle].length >= canvas.width + (listeAsteroides[cle].length * 2)){
		   				removeFromIndexAsteroide.push(cle);
		  			}
		  			//------------------------------------------------------------------------------------------------------------------
				}
			});
			//Si le tableau d'explosion n'est pas vide
			if (listeExplosion.length >= 1){
				//Pour chaque explosion dans le tableau
				$.each(listeExplosion, function(cle2,value){

					listeExplosion[cle2].tickActuel += 1;

					//On utilise des tickspeed (vu dans le tutoriel) pour baisser la vitesse d'affichage des frames afin de pouvoir voir l'animation
					if (listeExplosion[cle2].tickActuel >= listeExplosion[cle2].tickSpeed ){
						listeExplosion[cle2].offsetX += 128;
						listeExplosion[cle2].tickActuel = 0;

						listeExplosion[cle2].frame += 1;

						if (listeExplosion[cle2].frame % 4 == 0 ){
							listeExplosion[cle2].offsetY += 128;
							listeExplosion[cle2].offsetX = 0;
							listeExplosion[cle2].tickActuel= 0;
						}
						//Il y'a 16 frames dans le sprite que j'utilise
						if (listeExplosion[cle2].frame >= 16){
							//Quand on arrive à la fin du sprite on le met à la poubelle
							removeFromIndexExplosion.push(cle2);
						}
					}
					//On print l'image du sprite
					ctx.drawImage(sprite, listeExplosion[cle2].offsetX, listeExplosion[cle2].offsetY, 128, 128, listeExplosion[cle2].posExplosionX - listeExplosion[cle2].widthExplosion, listeExplosion[cle2].posExplosionY - listeExplosion[cle2].heightExplosion, listeExplosion[cle2].widthExplosion * 2, listeExplosion[cle2].heightExplosion * 2);
				});
			}
			//On supprime l'index de l'explosion qui vient de se terminer
			for (var i = removeFromIndexExplosion.length -1; i >= 0; i--){
		    	listeExplosion.splice(removeFromIndexExplosion[i],1);
			}

			//Finalement, on supprime les astéroïdes présents dans le tableau
			for (var i = removeFromIndexAsteroide.length -1; i >= 0; i--){
		    	listeAsteroides.splice(removeFromIndexAsteroide[i],1);
			}

			//console.log(listeAsteroides);
			reload += 1;
			//console.log(reload);
			if(!gameOver){
				showLogs();	
			}
		}
	}

	function initCanvas(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	 	ctx.drawImage(background,0,-scroll,canvas.width, canvas.height);
	 	ctx.drawImage(background,0,-scroll-canvas.height,canvas.width, canvas.height);
		/*
		drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

		sx	Optional. The x coordinate where to start clipping	
		sy	Optional. The y coordinate where to start clipping	
		swidth	Optional. The width of the clipped image	
		sheight	Optional. The height of the clipped image	
		x	The x coordinate where to place the image on the canvas	
		y	The y coordinate where to place the image on the canvas	
		width	Optional. The width of the image to use (stretch or reduce the image)	
		height	Optional. The height of the image to use (stretch or reduce the image)

		*/
	}

	function drawImage(image, posH, posL, height, length){
		ctx.drawImage(image, posH-length/2, posL-height/2, height, length);
	}

	function calculDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
	}

	function muteGame() { 
		console.log(explosion.muted);
		if (explosion.muted == false){
			explosion.muted = true;
	    	launch.muted = true;
	    	shieldDeflect.muted = true;
	    	shieldSound.muted = true;
	    	ambiant.muted = true;
	    	bonus.muted = true;
	    	alertSound.muted = true;
	    	mute.innerHTML = "Enable SFX"
		}else{
			explosion.muted = false;
	    	launch.muted = false;
	    	shieldDeflect.muted = false;
	    	shieldSound.muted = false;
	    	ambiant.muted = false;
	    	bonus.muted = false;
	    	alertSound.muted = false;
	    	mute.innerHTML = "Disable SFX"
		}
	} 

	function drawAsteroid(image, posH, posL, height, length, rotate){
		ctx.save();
		ctx.translate(posH, posL);
		ctx.rotate(rotate*Math.PI/180);
		ctx.drawImage(image, -height/2, -length/2, height, length);
		ctx.restore();
	}

	function drawMissile(image,posH,posL,height,length){
		ctx.drawImage(image, posH-length/2, posL-height/2, height, length);
	}

	function spawnShield(){

		var randomX = Math.floor((Math.random() * canvas.width -70 ) + 35 );

		var shield = {
			posX:randomX, 
			posY:Math.floor((Math.random() * canvas.height) - canvas.height - 50),
			length:50,
			height:50,
			velocityY:2,
			img:shieldImg,
			type:"shield"
		};

		return shield;
	}

	function spawnFireRateUp(){

		var randomX = Math.floor((Math.random() * canvas.width -70 ) + 35 );

		var fireRateUp = {
			posX:randomX, 
			posY:Math.floor((Math.random() * canvas.height) - canvas.height - 50),
			length:50,
			height:50,
			velocityY:2,
			img:fireRateUpImg,
			type:"fireUp"
		};

		return fireRateUp;
	}

	function spawnHeal(){

		var randomX = Math.floor((Math.random() * canvas.width -70 ) + 35 );

		var heal = {
			posX:randomX, 
			posY:Math.floor((Math.random() * canvas.height) - canvas.height - 50),
			length:50,
			height:50,
			velocityY:2,
			img:healImg,
			type:"heal"
		};

		return heal;
	}

	function randomAsteroid(){

		var asteroideList = [asteroideImg1, asteroideImg2, asteroideImg3];
		var choice = Math.floor((Math.random() * 3) + 0);
		var image = asteroideList[choice];

		var larLong = Math.floor((Math.random() * 75) + 25);
		var asteroide = {
			posX:Math.floor((Math.random() * canvas.width) + 1), 
			posY:Math.floor((Math.random() * canvas.height) - canvas.height - 50),
			length:larLong,
			height:larLong,
			velocityX:Math.floor((Math.random() * 8) - 5),
			velocityY:Math.floor((Math.random() * 10) + 4),
			rotate:Math.floor((Math.random() * 180) + 1),
			rotatespeed:Math.floor((Math.random() * 4) + 2),
			img:image
		};

		return asteroide;
	}

	function launchMissileLeft(x,y){

		var missile = {
			posX:x-15, 
			posY:y - 30,
			length:15,
			height:25,
			velocityY:10,
			img:missileImg
		};

		return missile;
	}

	function launchMissileRight(x,y){

		var missile = {
			posX:x+25, 
			posY:y - 30,
			length:15,
			height:25,
			velocityY:10,
			img:missileImg
		};

		return missile;
	}

	function triggerGame() {

		if (!demoIsOn && !gameOver){
			if (gameSpeed != "undefined"){
			clearInterval(gameSpeed);
			}
			if(gameIsOn){
				clearInterval(gameSpeed);
				gameIsOn = false;
				ambiant.pause();
				gameMenu.style.display = "block";
			}
			else{
				gameSpeed = setInterval(draw, 1000 / targetFPS);
				gameIsOn = true;
				ambiant.play();
				gameMenu.style.display = "none";
				demoIsOn = false;
			}
		}
		if (gameOver){
			clearInterval(gameSpeed);
			gameIsOn = false;
			ambiant.pause();
			gameOverDiv.style.display = "block";
			scoreDiv.innerHTML = "Score : " + (-score);
			//console.log("lol");

			if (-score == 0){
				$('.pseudo__div').css('display', 'none');
			}
			if (-score > highscore){
				record.style.display = "block";
				$('.menu__button--over').css('margin-top', '75px');
				twitter.addEventListener("click", function(){
					var href = "https://twitter.com/intent/tweet?text=Je viens de finir une partie sur Pepe : Lost In Space ! J'ai réalisé le meilleur score avec "+(-score)+" ! Viens essayer de me battre ! https://dylanernoud.be/projets/tfa/"+'&hashtags=Pepe,Space,DWM';
					var width = window.innerWidth * 0.66 ;
				    var height = width * window.innerHeight / window.innerWidth ;
				    window.open(href , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
				});
			}
			else{
				$('.menu__button--over').css('margin-top', '150px');
				twitter.addEventListener("click", function(){
					var href = "https://twitter.com/intent/tweet?text=Je viens de finir une partie sur Pepe : Lost In Space ! J'ai réalisé un score de "+(-score)+" ! Viens essayer de me battre ! https://dylanernoud.be/projets/tfa/"+'&hashtags=Pepe,Space,DWM';
					var width = window.innerWidth * 0.66 ;
				    var height = width * window.innerHeight / window.innerWidth ;
				    window.open(href , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
				});
			}
		}
	}
	//Permet de remettre les variables à 0 pour pouvoir remettre le jeu à neuf
	function resetGame(){

		life = 5;
		scroll = 0;
		score = 0;
		listeMissile = [];
		listeAsteroides = [];
		listeShield = [];
		listeBonus = [];
		listeExplosion = [];
		numberOfAsteroidMax = 3;
		posX = canvas.width / 2 - 22.5;
		posY = canvas.height - 35 ;
		accelX = 0;
		accelY = 0;
		isFiring = false;
		numberOfMissileMax = 5;
		numberOfShield = 1;
		numberOfShieldMax = 3;
		isShielded = false;
		ambiant.currentTime = 0;
		reload = 0;
		targetFPS = 60;
		reloadTime = 20;

		setTimeout(function(){
			isInvulnerable = false;
		},3000);

		pause.disabled = false;
		gameSpeed = setInterval(draw, 1000 / targetFPS);
		gameIsOn = true;
		ambiant.currentTime = 0;
		ambiant.play();
		gameMenu.style.display = "none";
		gameOverDiv.style.display = "none";
		record.style.display = "none";
		$('.pseudo__div').css('display', 'inline-block');
		gameOver = false;
	}

	window.onkeydown = function(e) {
	   	var key;

		if(e.keyCode)
		{
			key = e.keyCode;
		}
		else
		{
			key = e.which;
		}
		if (key==88 && demoIsOn){
			demoIsOn = false;
			gameOverlay.style.display = "none";
			triggerGame();
		}
		if(!demoIsOn){
			if (key==27){
				triggerGame();
			}
			if(key == 69 && !gameOver){
				if( numberOfShield >= 1 && !isInvulnerable){
					numberOfShield -= 1;
					isShielded = true;
					isInvulnerable = !isInvulnerable;
					shield.currentTime = 0;
					shieldSound.play();
					herosImg.src = "assets/img/vaisseau5.png";

					isInvulnerable = !isInvulnerable;
					setTimeout(function(){
						isInvulnerable =! isInvulnerable;
						herosImg.src = "assets/img/vaisseau2.png";
						isShielded = false;
						isInvulnerable = false;
					},4000);
				}
			}
		   	if (key == 90 || key == 38) {
		       accelY = -10;
		       if(key==38){
		       		e.preventDefault();
		       }
		   	}else if (key == 68 || key == 39) {
		   		accelX = 10;
		   		if(key==39){
		       		e.preventDefault();
		       	}
		   	}
		   	else if (key == 83 || key == 40) {
		    	accelY = 10;
		    	if(key==40){
		       		e.preventDefault();
		       	}
		   	}
		   	else if (key == 81 || key == 37) {
		       accelX = -10;
		       if(key==37){
		       		e.preventDefault();
		       }
		   	}
		}
	}

	window.onkeyup = function(e) {
	   	var key;

		if(e.keyCode)
		{
			key = e.keyCode;
		}
		else
		{
			key = e.which;
		}
		if(!demoIsOn){
			if ( key == 90 || key == 38) {
				e.preventDefault();
		   		if(accelY < 0)
		   			accelY = 0;
		   	}else if (key == 68 || key == 39) {
		   		e.preventDefault();
		    	if(accelX > 0)
		   			accelX = 0;
		   	}
		   	else if (key == 83 || key == 40) {
		   		e.preventDefault();
		    	if(accelY > 0)
		   			accelY = 0;
		   	}
		   	else if (key == 81 || key == 37) {
		   		e.preventDefault();
		    	if(accelX < 0)
		   			accelX = 0;
		   	}
		}
	}
});
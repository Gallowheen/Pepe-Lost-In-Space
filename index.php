<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		
		<title>Play the game  | Pepe : Lost In Space </title>
		
		<meta charset="UTF-8" />
		<meta name="viewport" content="initial-scale=1">
		
		<!-- build:css main.min.css -->
		<link rel="stylesheet" href="main.css" />
		<!-- endbuild -->
		<link href="https://fonts.googleapis.com/css?family=Open+Sans%7cRaleway:400,700" rel="stylesheet">
		
		<!-- Favicon -->

		<link rel="apple-touch-icon" sizes="57x57" href="assets/favicon/apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="assets/favicon/apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="assets/favicon/apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="assets/favicon/apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="assets/favicon/apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="assets/favicon/apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="assets/favicon/apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="assets/favicon/apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-icon-180x180.png">
		<link rel="icon" type="image/png" sizes="192x192"  href="assets/favicon/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="assets/favicon/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
		<link rel="manifest" href="assets/favicon/manifest.json">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="assets/favicon/ms-icon-144x144.png">
		<meta name="theme-color" content="#ffffff">

		<!-- 				 -->

		<!-- Méta Google -->
		<meta name="title" content="Pepe : Lost In Space" />
		<meta name="description" content="Pepe : Lost In Space is an old-school shoot'em'up build with HTML5/CSS/JS !" />

		<!-- Métas Facebook Opengraph -->
		<meta property="og:title" content="Pepe : Lost In Space" />
		<meta property="og:description" content="Pepe : Lost In Space is an old-school shoot'em'up build with HTML5/CSS/JS !" />
		<meta property="og:url" content="http://dylanernoud.be/projet/tfa" />
		<meta property="og:image" content="assets/img/ico__meta.png" />
		<meta property="og:type" content="website"/>

		<!-- Métas Twitter Card -->
		<meta name="twitter:title" content="Pepe : Lost In Space" />
		<meta name="twitter:description" content="Pepe : Lost In Space is an old-school shoot'em'up build with HTML5/CSS/JS !" />
		<meta name="twitter:url" content="http://dylanernoud.be/projet/tfa" />
		<meta name="twitter:image" content="assets/img/ico__meta.png" />
		
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		
	</head>
	<body>
		<div class="stars"></div>
		<header class="header">
			<div class="container">
				<div class="header__logo">
					<h1>Pepe : Lost In Space</h1>
					<a href="index.php"><img class="logo zoom" alt="The logo of the game : Pepe Lost in Space" src="assets/img/logo.png"/></a>
				</div>
			</div>
			<nav class="nav">
				<div class="container">
					<ul class="navigation clearfix">
						<li class="navigation__el about__button levitate2"><a href="about.php"><img class="button" alt="a sipmle button labelled 'about' with blue background. He's levitating" src="assets/img/about__site.png"/></a></li>
						<li class="navigation__el button--big play levitate2"><img class="button" alt="a sipmle button labelled 'Play' with red background. He's levitating" src="assets/img/play__site.png"/></li>
						<li class="navigation__el hire__button levitate2"><a href="case.php"><img class="button" alt="a sipmle button labelled 'Hire me' with blue background. He's levitating" src="assets/img/study.png"/></a></li>
					</ul>
				</div>
			</nav>
		</header>
		<section class="introduction">
			<div class="container">
				<h2 class="title">LET'S GO BACK IN TIME !</h2>
				<p class="p p--first">
					Pepe : Lost In Space is an old-school shoot'em'up built from scratch. With basic gameplay and textures it aims to emulate the fun of old arcade games whitout leaving your room, office or anywhere you play !
				</p>
				<p class="p">
					The heros is Pepe, your boi, in his high-tech spacecraft on his way back to earth. Your goal is to help him by shooting asteroid and collecting bonuses. Every asteroid shooted and bonuses picked increase your score.
				</p>
				<p class="p">
					Help Pepe and achieve the highest score !
				</p>
				<img class="earth levitate" alt="a pixely earth floating in space" src="assets/img/earth.png"/>
				<img class="asteroid levitate" alt="a small group of asteroid floating in space" src="assets/img/asteroid.png"/>
			</div>
		</section>
		<section class="bonus">
			<div class="container">
				<img class="constellation" alt="a colorfull constellation" src="assets/img/constellation.png"/>
				<h2 class="title">BONUS</h2>
				<div class="bonus__div clearfix">
					<div data-tilt data-tilt-axis="x" class="bonus__el">
						<img class="bonus__img" alt="The shield icon. It's wrapped with green corner. The center is grey. Inside the shield is blue." src="assets/img/shield__site.png"/>
						<p class="bonus__description">
							The Shield is your best ally when you can't dodge an asteroid. You begin the game with 1 shield out of 3. 
						</p>
						<p class="bonus__description">
							The shield give you an immunity that last 3 seconds. Be sure to pick them up !
						</p>
					</div>
					<div data-tilt data-tilt-axis="x" class="bonus__el">
						<img class="bonus__img" alt="The heal icon. It's wrapped with green corner. The center is grey. Inside the hearth is red." src="assets/img/heal__site.png"/>
						<span class="bonus__description">
							You start your game with 5 lifes and each life you pick gives you 1 life and you can have as many life as you can. 
						</span>
						<p class="bonus__description">
							Be sure to pick them, they'll be usefull later. Trust me !
						</p>
					</div>
					<div data-tilt data-tilt-axis="x" class="bonus__el bonus__el--last">
						<img class="bonus__img" alt="The fire rate up icon. It's wrapped with green corner. The center is grey. Inside there is two missiles." src="assets/img/fireRateUp__site.png"/>
						<p class="bonus__description">
							With the fire rate up bonus, each one picked decrease your missile reload time and allow you to shoot faster. 
						</p>
						<p class="bonus__description">
							You can only decrease your missile reload time up to 6 times.
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="game" id="game">
			<img class="vaisseau vaisseau_up" alt="The spaseship of the hero. He's mainly grey with green spot. You can see the hero throught the hub. The spaseship is sourrended with flames" src="assets/img/vaisseau4__site.png"/>
			<div class="container container__game">
				<h2 class="ready title">ARE YOU READY TO PLAY ?</h2>
				<div class="game__div">
					<div id="devtool-status" class="status"></div>
					<div class="game__overlay game__overlay--main" id="overlay">
						<img class="zoom game__logo" alt="The game's logo where you can see the name's game" src="assets/img/logo.png"/>
					</div>
					<div class="game__overlay game__overlay--menu" id="menu">
					    <button class="menu__button" id="resume">Resume</button>
					    <button class="menu__button" id="restart">Restart</button>
					    <button class="menu__button" id="mute">Enable SFX</button>
					</div>
					<div class="game__overlay game__overlay--over" id="over">
						<p class="game__over">Game over</p>
						<div class="game__score" id="score"></div>
						<p id="record" class="game__score game__record">Congratulations, you achieved the newest highscore !</p>
						<div class="pseudo__div">
							<label for="pseudo">Your name :</label>
					        <input class="pseudo" type="text" name="pseudo" id="pseudo" placeholder="DIS" maxlength="3" />
					        <button id="send" class="send" type='submit'>Send</button>
					    </div>				        
						<button class="menu__button menu__button--over" id="restartOver">Try Again ?</button>
						<button class="twitter"></button>
					</div>
					<canvas id="Canvas" class="canvas" width="800" height="500"></canvas>
				</div>
				<div class="game__unavailable">
					<div class="container">
						<h2 class="title">IOS & ANDROID</h2>
						<div class="">
							<p class="p p--nobg">
								Unfortunately, the game cannot be played on your device since the game required a minimum size which is not possible. I don't aim to release the game on Google Store and Apple store for now. You should take a look on your computer !
							</p>
						</div>
					</div>
				</div>
			</div>
			<img class="vaisseau vaisseau_down" alt="The spaseship of the hero. He's mainly grey with green spot. You can see the hero throught the hub. The spaseship is sourrended with the shield"  src="assets/img/vaisseau5__site.png"/>
		</section>
		<section class="leaderboard">
			<div class="container">
				<h2 class="title">LEADERBOARD</h2>
				<p class="p p--first">
					Compete with friends and player all around the world and show your legendary skill on the leaderboard below ! Don't forget to send yours ! 
				</p>
				<div class="leaderboard__div">
					<ul class="top10">
						
					</ul>
				</div>
				<img class="missile missile1 levitate" alt="The missile is mainly grey with green spot." src="assets/img/missile__site.png"/>
				<img class="missile missile2 levitate"  alt="The missile is mainly grey with green spot." src="assets/img/missile__site.png"/>
				<img class="missile missile3 levitate"  alt="The missile is mainly grey with green spot." src="assets/img/missile__site.png"/>
				<img class="missile missile4 levitate"  alt="The missile is mainly grey with green spot." src="assets/img/missile__site.png"/>
				<img class="missile missile5 levitate"  alt="The missile is mainly grey with green spot." src="assets/img/missile__site.png"/>
				<img class="missile missile6 levitate"  alt="The missile is mainly grey with green spot." src="assets/img/missile__site.png"/>
			</div>
		</section>
		<footer class="footer clearfix">
			<div class="container">
				<img class="vaisseau vaisseau--footer levitate" alt="The spaseship of the hero. He's mainly grey with green spot. You can see the hero throught the hub." src="assets/img/vaisseau__site.png"/>
				<a class="dwm" href="http://dwm.re/" target="_blank">For DWM</a>
			</div>
		</footer>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="assets/js/jdetects.js"></script>
		<script src="assets/js/tilt.jquery.js"></script>
		<script src="assets/js/smoothscroll.min.js"></script>
		<script src="assets/js/main.js"></script>
		<script src="assets/js/app.min.js"></script>
	</body>
</html>
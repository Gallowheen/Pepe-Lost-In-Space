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

//10 max, 20 at the beginning
var reloadTime = 20;

//Velocity
var accelX = 0;
var accelY = 0;

//Number of lifes
var life = 5;
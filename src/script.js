let GAME = {
    width: 800,
    height: 800,
    backgroundColor: "#191A1F",
    score: 0,
    start: true,
    menu: true,
}



/*КОДИРОВКА:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    0 - quas
    1 - wex
    2 - exort
*/

var Ability = { // 1 - кол во quas, 2 - кол во wex, 3 - кол во exort
    type: [
        [3, 0, 0], //cold snap
        [2, 1, 0], //ghost walk
        [2, 0, 1], //ice wall
        [1, 2, 0], //tornado
        [0, 3, 0], //EMP
        [1, 0, 2], //forge spirit
        [0, 0, 3], //sun strike
        [1, 1, 1], //Deafening Blast
        [0, 2, 1], //Alacrity
        [0, 1, 2], //Chaos Meteor
    ],
    size: GAME.width * 0.15,
    color: "red",
    AbilityNow: "",
    AbilityBefore: "",
    get x(){
        return GAME.width / 2 - this.size / 2;
    },
    get y(){
        return (GAME.height / 2 - this.size / 2) - GAME.width * 0.25;
    }
}

var Spells = {
    size: GAME.width * 0.11,
    color1: "blue",
    color2: "pink",
    color3: "yellow",
    range: GAME.width * 0.08,
    get x1(){
        return GAME.width / 2 - this.size * 1.5 - this.range * 1; 
    },
    get y(){
        return GAME.height / 2 + this.size * 2;
    },
    get x2(){
        return GAME.width / 2 - this.size * 0.5; 
    },
    get x3(){
        return GAME.width / 2 + this.size * 0.5 + this.range * 1; 
    },
}

var SpellNow = {
    type: Array(3).fill(0),
    pos: [],
    size: GAME.width * 0.09,
    color: "green",
    range: GAME.width * 0.05,
    get x1(){
        return GAME.width / 2 - this.size * 1.5 - this.range * 1; 
    },
    get y(){
        return GAME.height / 2 - this.size * 0.9;
    },
    get x2(){
        return GAME.width / 2 - this.size * 0.5; 
    },
    get x3(){
        return GAME.width / 2 + this.size * 0.5 + this.range * 1; 
    },
}

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
canvas.width = GAME.width;
canvas.height = GAME.height;

let quas = new Image(),
    wex = new Image(),
    exort = new Image(),
    EMP = new Image(),
    tornado = new Image(),
    cold_snap = new Image(),
    alacrity = new Image();
    ice_wall = new Image(),
    forge_spirit = new Image(),
    deafing_blast = new Image(),
    Chaos_meteor = new Image();
    sun_strike = new Image(),
    ghost_walk = new Image();

quas.src = './src/img/quas.jpg';
wex.src = './src/img/wex.jpg';
exort.src = './src/img/exort.png';

EMP.src = './src/img/EMP.png';
tornado.src = './src/img/tornado.png';
cold_snap.src = './src/img/Cold_snap.png';
alacrity.src = './src/img/alacrity.png';
ice_wall.src = './src/img/Ice_wall.png';
forge_spirit.src = './src/img/Forge_Spirit.png';
deafing_blast.src = './src/img/Deafening_Blast.png';
Chaos_meteor.src = './src/img/Chaos_meteor.png';
ghost_walk.src = './src/img/Ghost_walk.png';
sun_strike.src = './src/img/Sun_strike.png';

quas.onload = function () {
    Spells.quas = quas;
}

wex.onload = function () {
    Spells.wex = wex;
}
exort.onload = function () {
    Spells.exort = exort;
}

EMP.onload = function () {
    Ability.EMP = EMP;
}

tornado.onload = function () {
    Ability.tornado = tornado;
}

cold_snap.onload = function () {
    Ability.cold_snap = cold_snap;
}

alacrity.onload = function () {
    Ability.alacrity = alacrity;
}

ice_wall.onload = function () {
    Ability.ice_wall = ice_wall;
}

forge_spirit.onload = function () {
    Ability.forge_spirit = forge_spirit;
}

deafing_blast.onload = function () {
    Ability.deafing_blast = deafing_blast;
}

Chaos_meteor.onload = function () {
    Ability.Chaos_meteor = Chaos_meteor;
}

ghost_walk.onload = function () {
    Ability.ghost_walk = ghost_walk;
}

sun_strike.onload = function () {
    Ability.sun_strike = sun_strike;
}

function initBullets() {
    var BULLET = {
        x: PLAYER.x + PLAYER.width / 2,
        y: PLAYER.y - bulletSize,
        size: bulletSize,
        speedy: -10,
    }
    bullets.push(BULLET);
}


function drawBack(){
    canvasContext.fillStyle = GAME.backgroundColor;
    canvasContext.beginPath();
    canvasContext.rect(0, 0, GAME.width, GAME.height);
    canvasContext.fill();
    canvasContext.closePath();
}

var buttonPlay = {
    text: "Start",
    width: 300,
    height: 150,
    textColor: "black",
    backgroundColor: "gray",
}

function drawMenu(){

}

function drawSpells(){
    if (Spells.quas) {
        canvasContext.drawImage(Spells.quas, Spells.x1, Spells.y, Spells.size, Spells.size);
    }
    if (Spells.wex) {
        canvasContext.drawImage(Spells.wex, Spells.x2, Spells.y, Spells.size, Spells.size);
    }
    if (Spells.exort) {
        canvasContext.drawImage(Spells.exort, Spells.x3, Spells.y, Spells.size, Spells.size);
    }
}

function drawSpellNow(){
    if (Spells.quas && SpellNow.pos[0] === 0) {
        canvasContext.drawImage(Spells.quas, SpellNow.x1, SpellNow.y, SpellNow.size, SpellNow.size);
    }else if (Spells.wex && SpellNow.pos[0] === 1) {
        canvasContext.drawImage(Spells.wex, SpellNow.x1, SpellNow.y, SpellNow.size, SpellNow.size);
    }else if (Spells.exort && SpellNow.pos[0] === 2) {
        canvasContext.drawImage(Spells.exort, SpellNow.x1, SpellNow.y, SpellNow.size, SpellNow.size);
    }else{
        canvasContext.fillStyle = "black";
        canvasContext.beginPath();
        canvasContext.rect(SpellNow.x1, SpellNow.y, SpellNow.size, SpellNow.size);
        canvasContext.fill();
        canvasContext.closePath();
    }

    if (Spells.quas && SpellNow.pos[1] === 0) {
        canvasContext.drawImage(Spells.quas, SpellNow.x2, SpellNow.y, SpellNow.size, SpellNow.size);
    }else if (Spells.wex && SpellNow.pos[1] === 1) {
        canvasContext.drawImage(Spells.wex, SpellNow.x2, SpellNow.y, SpellNow.size, SpellNow.size);
    }else if (Spells.exort && SpellNow.pos[1] === 2) {
        canvasContext.drawImage(Spells.exort, SpellNow.x2, SpellNow.y, SpellNow.size, SpellNow.size);
    }else{
        canvasContext.fillStyle = "black";
        canvasContext.beginPath();
        canvasContext.rect(SpellNow.x2, SpellNow.y, SpellNow.size, SpellNow.size);
        canvasContext.fill();
        canvasContext.closePath();
    } 

    if (Spells.quas && SpellNow.pos[2] === 0) {
        canvasContext.drawImage(Spells.quas, SpellNow.x3, SpellNow.y, SpellNow.size, SpellNow.size);
    }else if (Spells.wex && SpellNow.pos[2] === 1) {
        canvasContext.drawImage(Spells.wex, SpellNow.x3, SpellNow.y, SpellNow.size, SpellNow.size);
    }else if (Spells.exort && SpellNow.pos[2] === 2) {
        canvasContext.drawImage(Spells.exort, SpellNow.x3, SpellNow.y, SpellNow.size, SpellNow.size);
    }else{
        canvasContext.fillStyle = "black";
        canvasContext.beginPath();
        canvasContext.rect(SpellNow.x3, SpellNow.y, SpellNow.size, SpellNow.size);
        canvasContext.fill();
        canvasContext.closePath();
    }  
}

function drawAbility(){
    /*canvasContext.fillStyle = Ability.color;
    canvasContext.beginPath();
    canvasContext.rect(Ability.x, Ability.y, Ability.size, Ability.size);
    canvasContext.fill();
    canvasContext.closePath();*/
    if (Ability.cold_snap && Ability.AbilityNow === 0) {
        canvasContext.drawImage(Ability.cold_snap, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.ghost_walk && Ability.AbilityNow === 1) {
        canvasContext.drawImage(Ability.ghost_walk, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.ice_wall && Ability.AbilityNow === 2) {
        canvasContext.drawImage(Ability.ice_wall, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.tornado && Ability.AbilityNow === 3) {
        canvasContext.drawImage(Ability.tornado, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.EMP && Ability.AbilityNow === 4) {
        canvasContext.drawImage(Ability.EMP, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.forge_spirit && Ability.AbilityNow === 5) {
        canvasContext.drawImage(Ability.forge_spirit, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.sun_strike && Ability.AbilityNow === 6) {
        canvasContext.drawImage(Ability.sun_strike, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.deafing_blast && Ability.AbilityNow === 7) {
        canvasContext.drawImage(Ability.deafing_blast, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.alacrity && Ability.AbilityNow === 8) {
        canvasContext.drawImage(Ability.alacrity, Ability.x, Ability.y, Ability.size, Ability.size);
    } else if (Ability.Chaos_meteor && Ability.AbilityNow === 9) {
        canvasContext.drawImage(Ability.Chaos_meteor, Ability.x, Ability.y, Ability.size, Ability.size);
    } else{
        canvasContext.fillStyle = "black";
        canvasContext.beginPath();
        canvasContext.rect(Ability.x, Ability.y, Ability.size, Ability.size);
        canvasContext.fill();
        canvasContext.closePath();
    }
}

function draw(){
    drawBack();
    drawAbility();
    drawSpells();
    drawSpellNow();
}

function initEventListeners() {
    window.addEventListener("click", onMouseClick);
}

function swapPos(){
    SpellNow.type[SpellNow.pos[0]]--;
    SpellNow.pos[0] = SpellNow.pos[1];
    SpellNow.pos[1] = SpellNow.pos[2];
}

function onMouseClick(event) {
    if((event.clientY >= Spells.y) && (event.clientY <= Spells.y + Spells.size) && (event.clientX >= Spells.x1) && (event.clientX <= Spells.x1 + Spells.size)){
        swapPos();
        SpellNow.type[0]++;
        SpellNow.pos[2] = 0;
    }
    if((event.clientY >= Spells.y) && (event.clientY <= Spells.y + Spells.size) && (event.clientX >= Spells.x2) && (event.clientX <= Spells.x2 + Spells.size)){
        swapPos();
        SpellNow.type[1]++;
        SpellNow.pos[2] = 1;
    }
    if((event.clientY >= Spells.y) && (event.clientY <= Spells.y + Spells.size) && (event.clientX >= Spells.x3) && (event.clientX <= Spells.x3 + Spells.size)){
        swapPos();
        SpellNow.type[2]++;
        SpellNow.pos[2] = 2;
    }
    newAbility();
}

function initAbility(){
    Ability.AbilityBefore = Ability.AbilityNow;
    while(Ability.AbilityNow === Ability.AbilityBefore){
        Ability.AbilityNow = Math.round(Math.random() * 9);
    }
    console.log(Ability.AbilityNow);
    console.log(Ability.type[Ability.AbilityNow]);
}

function checkAbility(){
    for(var i = 0; i < SpellNow.type.length; i++) // Цикл по всем эле­мен­там
    if (SpellNow.type[i] !== Ability.type[Ability.AbilityNow][i]) return false; // Ес­ли хоть один эле­мент от­ли­ча­ет­ся, мас­си­вы не рав­ны

    return true; // Ина­че они рав­ны
}

var data = new Date();

function timer(){
    var datenow = new Date();
    var seconds = (datenow - data) / 1000;
    canvasContext.fillStyle = "black";
    canvasContext.font = "48px serif";
    canvasContext.beginPath();
    canvasContext.fillText(seconds.toFixed(2), 350, 100 , 100);
    canvasContext.fillText(GAME.score, 380, 315 , 100);
    if(seconds >= 60){
        GAME.start = false;
    }
}

function newAbility(){
    if (checkAbility()){
        initAbility();
        console.log("correct");
        GAME.score++;
    }
}

function play1() {
    if(GAME.start){
        draw();
        timer();
        requestAnimationFrame(play1);
    }
}

initAbility();
initEventListeners();
play1()
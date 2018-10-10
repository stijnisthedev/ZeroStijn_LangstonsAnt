var canvas;
var ctx;
var label;

var grid = [];
var gridSpace = 5;
var xA = 240;
var yA = 160;

var antX = 120;
var antY = 80;
var antD = 3;

var steps = 0;

function setup() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    label = document.getElementById("label");

    generateGrid();

    window.requestAnimationFrame(loop);
}

function start() {
    setInterval(moveAnt, 1);
}

function move(steps) {
    for(var i = 0; i < steps; i++) {
        moveAnt();
    }
}

function loop() {
    draw();
    window.requestAnimationFrame(loop);
}

function draw() {
    drawGrid();
    drawAnt();
}

function moveAnt() {

    //0 UP 1 RIGHT 2 DOWN 3 LEFT
    var white = grid[antY][antX] == 0;
    grid[antY][antX] = white ? 1 : 0;

    if(white) {
        antD = antD + 1 < 4 ? antD + 1 : 0;
    } else {
        antD = antD - 1 < 0 ? 3 : antD - 1;
    }

    //MOVE
    var nextX = antX;
    var nextY = antY;

    if(antD == 0) {
        if(nextY - 1 < 0) {
            nextY = yA;
        }
        nextY--;
    }
    if(antD == 1) {
        if(nextX + 2 > xA) {
            nextX = -1;
        }
        nextX++;
    }
    if(antD == 2) {
        if(nextY + 2 > yA) {
            nextY = -1;
        }
        nextY++;
    }
    if(antD == 3) {
        if(nextX - 1 < 0) {
            nextX = xA;
        }
        nextX--;
    }

    antX = nextX;
    antY = nextY;
    steps++;
    label.innerHTML = "Steps: " + steps;
}

function generateGrid() {
    for(var y = 0; y < yA; y++) {
        grid.push([]);
        for(var x = 0; x < xA; x++) {
            grid[y][x] = 0;
        }
    }
}

function drawGrid() {
    for(var y = 0; y < yA; y++) {
        for(var x = 0; x < xA; x++) {
            if(grid[y][x] == 0) {
                ctx.fillStyle = '#ffffff'
            } else {
                ctx.fillStyle = '#000000'
            }

            ctx.fillRect(x * gridSpace, y * gridSpace, gridSpace, gridSpace);
        }
    }
}

function drawAnt() {
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(antX * gridSpace, antY * gridSpace, gridSpace, gridSpace);
}

document.addEventListener("DOMContentLoaded", function(event) {
  setup();
  start();
});

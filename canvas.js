class Ant {
    constructor(initialX, initialY, initialD, color) {
        this.x = initialX;
        this.y = initialY;
        //0 Up 1 Right 2 Down 3 Left
        this.direction = initialD;
        this.color = color;
    }
    move(canvas) {
        let currentWhite = canvas.grid[this.y][this.x] === 0;

        canvas.grid[this.y][this.x] = currentWhite ? 1 : 0;

        this.direction = currentWhite ? (this.direction + 1 < 4 ? this.direction + 1 : 0) : (this.direction - 1 < 0 ? 3 : this.direction - 1);

        this.y = this.direction === 0 ? (this.y - 1 < 0 ? canvas.gridHeight - 1 : this.y - 1) : this.y;
        this.x = this.direction === 1 ? (this.x + 2 > canvas.gridWidth ? 0 : this.x + 1) : this.x;
        this.y = this.direction === 2 ? (this.y + 2 > canvas.gridHeight ?  0 : this.y + 1) : this.y;
        this.x = this.direction === 3 ? (this.x - 1 < 0 ? canvas.gridWidth - 1 : this.x - 1) : this.x;

        canvas.steps++;
        document.getElementById("label").innerHTML = "Steps: " + canvas.steps;
    }
    draw(canvas) {
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fillRect(this.x * canvas.gridSpace, this.y * canvas.gridSpace, canvas.gridSpace, canvas.gridSpace);
    }
}

class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.steps = 0;

        this.grid = [];
        this.gridSpace = 5;
        this.gridWidth = 240;
        this.gridHeight = 160;

        this.ant = new Ant(120, 80, 3, "#ff00ff");
    }
    setup() {
        for(let y = 0; y < this.gridHeight; y++) {
            this.grid.push([]);
            for(let x = 0; x < this.gridWidth; x++) {
                this.grid[y][x] = 0;
            }
        }

        setInterval(() => this.ant.move(this), 20);
        window.requestAnimationFrame(this.loop.bind(this));
    }
    loop() {
        this.draw();

        window.requestAnimationFrame(this.loop.bind(this));
    }
    draw() {
        for(let y = 0; y < this.gridHeight; y++) {
            for(let x = 0; x < this.gridWidth; x++) {
                this.ctx.fillStyle = this.grid[y][x] === 0 ? "#ffffff" : "#000000";
                this.ctx.fillRect(x * this.gridSpace, y * this.gridSpace, this.gridSpace, this.gridSpace);
            }
        }

        this.ant.draw(this);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let canvas = new Canvas(document.getElementById("canvas"));
    canvas.setup();
    canvas.draw();
});
const canvas = document.querySelector("#lotto-machine-canvas");
const ctx = canvas.getContext("2d");
const balls = [];

class Ball {
    constructor(num, y, x, radius, dy, dx, r, g, b) {
        this.num = num;
        this.y = y;
        this.x = x;
        this.radius = radius;
        this.dy = dy;
        this.dx = dx;
        this.color = {
            r,
            g,
            b,
        };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${this.num}`, this.x, this.y);
        ctx.closePath();

        this.y += this.dy;
        this.x += this.dx;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx = -this.dx;
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy = -this.dy;
        }
    }
}

const initBalls = () => {
    for (let i = 1; i <= 45; i++) {
        const r = Math.floor(Math.random() * 256) + 1;
        const g = Math.floor(Math.random() * 256) + 1;
        const b = Math.floor(Math.random() * 256) + 1;
        const ball = new Ball(i, canvas.height / 2 + Math.random() * 10, canvas.width / 2 + Math.random() * 10, 20, getRandomNumber(), getRandomNumber(), r, g, b);

        balls.push(ball);
        console.log(ball);
    }
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 45; i++) {
        balls[i].draw();
    }

    requestAnimationFrame(animate);
}

function getRandomNumber() {
    return Math.random() * 1;
}

initBalls();
animate();

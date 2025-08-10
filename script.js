const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let heartParticles = [];
let fallingHearts = [];

// Criar partículas para formar um coração gigante
function generateHeartPoints() {
    const points = [];
    const scale = 15; // Tamanho do coração
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = scale * 16 * Math.pow(Math.sin(t), 3);
        let y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        points.push({
            x: canvas.width / 2 + x,
            y: canvas.height / 2 + y
        });
    }
    return points;
}

// Criar partículas do coração central
function createHeartParticles() {
    const points = generateHeartPoints();
    for (let p of points) {
        for (let i = 0; i < 6; i++) { // Densidade dos pontinhos
            heartParticles.push({
                x: p.x + Math.random() * 2,
                y: p.y + Math.random() * 2,
                size: 2,
                color: "red"
            });
        }
    }
}

// Criar corações caindo
function spawnFallingHeart() {
    fallingHearts.push({
        x: Math.random() * canvas.width,
        y: -20,
        size: 10 + Math.random() * 10,
        speed: 1 + Math.random() * 2
    });
}

function drawFallingHeart(h) {
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.scale(h.size / 15, h.size / 15);
    ctx.beginPath();
    ctx.fillStyle = "red";
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o coração central
    for (let p of heartParticles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    // Atualiza e desenha corações caindo
    fallingHearts.forEach((h, index) => {
        h.y += h.speed;
        drawFallingHeart(h);
        if (h.y > canvas.height) {
            fallingHearts.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// Mostrar mensagem ao clicar
document.addEventListener("click", () => {
    const msg = document.getElementById("mensagem");
    msg.style.opacity = 15;
    setTimeout(() => {
        msg.style.opacity = 15;
    }, 3000);
});

// Ajustar tamanho ao redimensionar
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    heartParticles = [];
    createHeartParticles();
});

// Criar efeitos
createHeartParticles();
setInterval(spawnFallingHeart, 100);
animate();

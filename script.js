const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let heartPoints = [];
let t = 0;

// Gera os pontos do coração (equação matemática)
function generateHeartPoints() {
  heartPoints = [];
  for (let i = 0; i < Math.PI * 2; i += 0.05) {
    const x = 16 * Math.pow(Math.sin(i), 3);
    const y = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
    heartPoints.push({ x, y });
  }
}
generateHeartPoints();

// Desenha o coração pouco a pouco (linha a linha)
function drawHeartStep() {
  if (t < heartPoints.length - 1) {
    const scale = 15;
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(heartPoints[t].x * scale + offsetX, heartPoints[t].y * scale + offsetY);
    ctx.lineTo(heartPoints[t + 1].x * scale + offsetX, heartPoints[t + 1].y * scale + offsetY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    t++;
    requestAnimationFrame(drawHeartStep);
  }
}
drawHeartStep();

// Cria um coraçãozinho flutuante
function spawnMiniHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "mini-heart";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.textContent = "❤️EU TE AMOO EMANUELA";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

// Ao clicar na tela, cria vários coraçõezinhos
document.addEventListener("click", (e) => {
  for (let i = 0; i < 10; i++) {
    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = (Math.random() - 0.5) * 50;
    setTimeout(() => {
      spawnMiniHeart(e.clientX + offsetX, e.clientY + offsetY);
    }, i * 100);
  }
});

// Redimensiona o canvas quando a janela mudar de tamanho
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
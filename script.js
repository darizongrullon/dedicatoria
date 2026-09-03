const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Estructura de Puntos
var Point = function (x, y) {
  this.x = (typeof x !== 'undefined') ? x : 0;
  this.y = (typeof y !== 'undefined') ? y : 0;
};

// Ecuación matemática de la forma del corazón
function pointOnHeart(t) {
  return new Point(
    160 * Math.pow(Math.sin(t), 3),
    130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
  );
}

// Crear partículas
const particles = [];
const particleCount = 600; // Más partículas para mayor densidad

// Escalar según la pantalla
const scale = Math.min(width, height) < 500 ? 0.8 : 1.2;

for (let i = 0; i < particleCount; i++) {
  const step = (Math.PI * 2) * (i / particleCount);
  const pos = pointOnHeart(step);
  particles.push({
    targetX: pos.x * scale,
    targetY: -pos.y * scale,
    x: (Math.random() - 0.5) * width,
    y: (Math.random() - 0.5) * height,
    speed: 0.01 + Math.random() * 0.03,
    size: Math.random() * 2.5 + 0.5
  });
}

let time = 0;

function render() {
  // Limpia el canvas manteniendo un rastro transparente para el efecto neón
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2 + 40;

  time += 0.04;

  particles.forEach(p => {
    // Animación de latido (pulso)
    const beat = 1 + Math.sin(time) * 0.08;
    const destX = centerX + p.targetX * beat;
    const destY = centerY + p.targetY * beat;

    // Movimiento suave hacia el destino
    p.x += (destX - p.x) * p.speed;
    p.y += (destY - p.y) * p.speed;

    // Dibujar partícula
    ctx.fillStyle = '#00bfff';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00bfff';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(render);
}

render();
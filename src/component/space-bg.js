const canvas = document.getElementById("space-background");
const ctx = canvas.getContext("2d");

let w, h;
let parallaxX = 0;
let parallaxY = 0;

const stars = [];
const shootingStars = [];
const planets = [];
const nebulae = [];
const asteroids = [];

export function resize() {
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

// Mouvement souris pour parallaxe
window.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  parallaxX = (e.clientX - centerX) * 0.02;
  parallaxY = (e.clientY - centerY) * 0.02;
});

// Étoiles
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.1,
    opacity: Math.random() * 0.5 + 0.5,
  });
}

// Planètes
for (let i = 0; i < 3; i++) {
  planets.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 40 + 30,
    color: ["#FFA500", "#FF69B4", "#8A2BE2", "#FFFFFF"][
      Math.floor(Math.random() * 4)
    ],
    speed: (Math.random() - 0.5) * 0.1,
  });
}

// Nébuleuses
for (let i = 0; i < 2; i++) {
  nebulae.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 400 + 300,
    rotation: 0,
    speed: Math.random() * 0.001 + 0.0003,
    colors: [
      ["rgba(255,125,0,0.2)", "rgba(0,0,0,0)"],
      ["rgba(138,43,226,0.2)", "rgba(0,0,0,0)"],
    ][Math.floor(Math.random() * 2)],
  });
}

// Astéroïdes
for (let i = 0; i < 10; i++) {
  asteroids.push({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 8 + 5,
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 0.5 + 0.2,
    color: "#555",
  });
}

// Étoiles filantes générées périodiquement
setInterval(() => {
  shootingStars.push({
    x: Math.random() * w,
    y: (Math.random() * h) / 2,
    length: Math.random() * 100 + 80,
    speed: Math.random() * 12 + 8,
    angle: Math.PI / 4,
    opacity: 1,
  });
}, 2500);

function draw() {
  ctx.clearRect(0, 0, w, h);

  // Nébuleuses
  nebulae.forEach((n) => {
    ctx.save();
    ctx.translate(n.x + parallaxX, n.y + parallaxY);
    ctx.rotate(n.rotation);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.radius);
    gradient.addColorStop(0, n.colors[0]);
    gradient.addColorStop(1, n.colors[1]);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    n.rotation += n.speed;
  });

  // Étoiles
  stars.forEach((s) => {
    s.y += s.speed;
    if (s.y > h) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x + parallaxX, s.y + parallaxY, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
  });

  // Étoiles filantes
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    const dx = Math.cos(s.angle) * s.length;
    const dy = Math.sin(s.angle) * s.length;

    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x + parallaxX, s.y + parallaxY);
    ctx.lineTo(s.x + dx + parallaxX, s.y + dy + parallaxY);
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.opacity -= 0.02;

    if (s.opacity <= 0) shootingStars.splice(i, 1);
  }

  // Astéroïdes
  asteroids.forEach((a) => {
    a.x += a.speedX;
    a.y += a.speedY;
    if (a.x < -10) a.x = w + 10;
    if (a.x > w + 10) a.x = -10;
    if (a.y > h + 10) a.y = -10;
    ctx.beginPath();
    ctx.arc(a.x + parallaxX, a.y + parallaxY, a.size, 0, Math.PI * 2);
    ctx.fillStyle = a.color;
    ctx.fill();
  });

  // Planètes
  planets.forEach((p) => {
    p.x += p.speed;
    if (p.x > w + p.radius) p.x = -p.radius;
    if (p.x < -p.radius) p.x = w + p.radius;
    ctx.beginPath();
    ctx.arc(p.x + parallaxX, p.y + parallaxY, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(draw);
}

export function start() {
  draw();
}

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

// Fonction pour (re)générer tous les éléments selon la taille actuelle
function regenerateScene() {
  stars.length = 0;
  shootingStars.length = 0;
  planets.length = 0;
  nebulae.length = 0;
  asteroids.length = 0;

  // Étoiles
  for (let i = 0; i < 250; i++) {
    const size = Math.random() * 1.2 + 0.3;
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size,
      baseSize: size,
      depth: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.5 + 0.3,
      twinkle: Math.random() * 0.05 + 0.01,
    });
  }

  // Nébuleuses
  for (let i = 0; i < 3; i++) {
    nebulae.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 600 + 400,
      rotation: 0,
      speed: Math.random() * 0.001 + 0.0002,
      layers: [
        ["rgba(138,43,226,0.07)", "rgba(0,0,0,0)"],
        ["rgba(255,105,180,0.07)", "rgba(0,0,0,0)"],
        ["rgba(173,216,230,0.07)", "rgba(0,0,0,0)"],
      ],
    });
  }

  // Planètes
  for (let i = 0; i < 4; i++) {
    const radius = Math.random() * 50 + 30;
    const color = ["#FF6B6B", "#1E90FF", "#00FA9A", "#FFD700"][
      Math.floor(Math.random() * 4)
    ];
    planets.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius,
      color,
      speed: (Math.random() - 0.5) * 0.05,
    });
  }

  // Astéroïdes
  for (let i = 0; i < 12; i++) {
    asteroids.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 10 + 4,
      speedX: Math.random() * 0.6 - 0.3,
      speedY: Math.random() * 0.6 + 0.2,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: "#777",
    });
  }
}

// Initialisation de la taille + génération scène
export function resize() {
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
  regenerateScene();
}

window.addEventListener("resize", resize);
resize();

// Parallax sur mouvement souris
window.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  parallaxX = (e.clientX - centerX) * 0.03;
  parallaxY = (e.clientY - centerY) * 0.03;
});

// Génération étoiles filantes toutes les 2.5s
setInterval(() => {
  shootingStars.push({
    x: Math.random() * w,
    y: Math.random() * h * 0.4,
    length: Math.random() * 150 + 100,
    speed: Math.random() * 14 + 10,
    angle: Math.PI / 4,
    opacity: 1,
    trail: [],
  });
}, 2500);

function draw() {
  ctx.clearRect(0, 0, w, h);

  // Nébuleuses
  nebulae.forEach((n) => {
    ctx.save();
    ctx.translate(n.x + parallaxX * 0.2, n.y + parallaxY * 0.2);
    ctx.rotate(n.rotation);
    n.layers.forEach((colors) => {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.radius);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    n.rotation += n.speed;
  });

  // Étoiles
  stars.forEach((s) => {
    s.y += s.speed;
    if (s.y > h) s.y = 0;
    s.size = s.baseSize + Math.sin(Date.now() * s.twinkle) * 0.3;
    const depthFactor = s.depth;
    ctx.beginPath();
    ctx.arc(
      s.x + parallaxX * depthFactor,
      s.y + parallaxY * depthFactor,
      s.size,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
  });

  // Étoiles filantes
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    const dx = Math.cos(s.angle) * s.length;
    const dy = Math.sin(s.angle) * s.length;

    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(s.x + parallaxX, s.y + parallaxY);
    ctx.lineTo(s.x + dx + parallaxX, s.y + dy + parallaxY);
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.opacity -= 0.015;

    if (s.opacity <= 0) shootingStars.splice(i, 1);
  }

  // Astéroïdes
  asteroids.forEach((a) => {
    a.x += a.speedX;
    a.y += a.speedY;
    a.angle += a.rotationSpeed;
    if (a.x < -10) a.x = w + 10;
    if (a.x > w + 10) a.x = -10;
    if (a.y > h + 10) a.y = -10;

    ctx.save();
    ctx.translate(a.x + parallaxX * 0.5, a.y + parallaxY * 0.5);
    ctx.rotate(a.angle);
    ctx.beginPath();
    ctx.arc(0, 0, a.size, 0, Math.PI * 2);
    ctx.fillStyle = a.color;
    ctx.shadowColor = "#444";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  });

  // Planètes
  planets.forEach((p) => {
    p.x += p.speed;
    if (p.x > w + p.radius) p.x = -p.radius;
    if (p.x < -p.radius) p.x = w + p.radius;

    const px = p.x + parallaxX * 0.3;
    const py = p.y + parallaxY * 0.3;

    // Halo
    const halo = ctx.createRadialGradient(
      px,
      py,
      p.radius * 0.8,
      px,
      py,
      p.radius * 1.8
    );
    halo.addColorStop(0, `${p.color}22`);
    halo.addColorStop(1, "transparent");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(px, py, p.radius * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Planète
    ctx.beginPath();
    ctx.arc(px, py, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(draw);
}

export function start() {
  draw();
}

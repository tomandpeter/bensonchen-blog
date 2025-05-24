const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = [];

function drawRipples() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r of ripples) {
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
    ctx.stroke();
    r.radius += 0.5;
    r.alpha -= 0.005;
  }
  ripples = ripples.filter(r => r.alpha > 0);
  requestAnimationFrame(drawRipples);
}

canvas.addEventListener("click", (e) => {
  ripples.push({x: e.clientX, y: e.clientY, radius: 0, alpha: 0.5});
});

drawRipples();

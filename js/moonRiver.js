document.addEventListener('DOMContentLoaded', () => {
  const riverCanvas = document.getElementById('riverCanvas');
  const moon = document.getElementById('moon');

  if (!riverCanvas || !moon) {
    console.warn('River canvas or moon element not found.');
    return;
  }

  const ctx = riverCanvas.getContext('2d');
  let ripples = []; // 存储涟漪
  const moonRadius = moon.offsetWidth / 2; // 月亮半径

  // 调整 Canvas 大小
  function resizeCanvas() {
    riverCanvas.width = window.innerWidth;
    riverCanvas.height = window.innerHeight * 0.6; // 江面占据 60% 视口高度
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 创建涟漪
  function createRipple(x, y) {
    ripples.push({
      x,
      y,
      radius: 0,
      opacity: 0.8,
      speed: 2,
    });
  }

  // 动画循环
  function animateRiver() {
    ctx.clearRect(0, 0, riverCanvas.width, riverCanvas.height);

    // 绘制涟漪
    ripples.forEach((ripple, index) => {
      ripple.radius += ripple.speed;
      ripple.opacity -= 0.008;

      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
      ctx.fill();

      if (ripple.opacity <= 0) {
        ripples.splice(index, 1);
      }
    });

    // 绘制月亮倒影 (简化版)
    const moonX = moon.offsetLeft + moonRadius;
    const moonY = moon.offsetTop + moonRadius;
    const reflectionY = riverCanvas.height - (moonY - riverCanvas.offsetTop); // 倒影 Y 坐标

    ctx.beginPath();
    ctx.arc(moonX, reflectionY, moonRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 220, 0.3)'; // 倒影颜色，更淡
    ctx.fill();

    requestAnimationFrame(animateRiver);
  }

  // 初始涟漪 (模拟江水流动)
  for (let i = 0; i < 5; i++) {
    createRipple(Math.random() * riverCanvas.width, Math.random() * riverCanvas.height);
  }

  // 点击时创建涟漪 (互动)
  riverCanvas.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });

  animateRiver(); // 启动动画
});

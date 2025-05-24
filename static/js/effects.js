// --- 1. 花瓣飘落效果 ---
document.addEventListener('DOMContentLoaded', () => {
    const petalContainer = document.getElementById('petalContainer');
    if (!petalContainer) {
        console.warn("Petal container not found, petal effect not initialized.");
        return;
    }

    const numPetals = 40; // 屏幕上同时存在的花瓣数量，可以调整
    const minPetalSize = 10; // 花瓣最小尺寸 (px)
    const maxPetalSize = 25; // 花瓣最大尺寸 (px)
    const minFallDuration = 10; // 花瓣飘落最短时间 (秒)
    const maxFallDuration = 25; // 花瓣飘落最长时间 (秒)
    const minDelay = 0; // 花瓣开始飘落的最小延迟 (秒)
    const maxDelay = 10; // 花瓣开始飘落的最大延迟 (秒)

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * (maxPetalSize - minPetalSize) + minPetalSize;
        petal.style.width = `${size}px`;
        // 让花瓣稍微椭圆一些，更像花瓣形状
        petal.style.height = `${size * (0.8 + Math.random() * 0.4)}px`;
        // 随机起始水平位置
        petal.style.left = `${Math.random() * 100}vw`;
        // 随机起始垂直位置（稍高于屏幕顶部）
        petal.style.top = `-${Math.random() * 20}vh`;

        const duration = Math.random() * (maxFallDuration - minFallDuration) + minFallDuration;
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        // 随机初始旋转角度
        const rotateStart = Math.random() * 360;
        // 随机旋转方向和最终旋转角度（至少转两圈）
        const rotateEnd = rotateStart + (Math.random() > 0.5 ? 1 : -1) * 720;

        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.animationName = 'fall'; // 应用 CSS 中定义的 fall 动画
        // 随机的缓动函数，让飘落更自然
        petal.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
        petal.style.animationIterationCount = 'infinite'; // 无限循环
        petal.style.transform = `rotate(${rotateStart}deg)`; // 设置初始旋转
        petal.style.animationFillMode = 'both'; // 确保动画开始前和结束后样式生效

        // 随机花瓣颜色（偏粉/白，透明度也随机）
        const hue = 330 + Math.random() * 30; // 330-360/0-30 之间，偏粉红到浅红色
        const saturation = 50 + Math.random() * 30; // 50-80% 饱和度
        const lightness = 70 + Math.random() * 20; // 70-90% 亮度
        const alpha = 0.5 + Math.random() * 0.3; // 0.5-0.8 透明度
        petal.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

        petalContainer.appendChild(petal);
    }

    // 初始化花瓣
    for (let i = 0; i < numPetals; i++) {
        createPetal();
    }
});


// --- 2. 简单水波涟漪效果 (点击生成) ---
document.addEventListener('DOMContentLoaded', () => {
    const rippleCanvas = document.getElementById('rippleCanvas');
    if (!rippleCanvas) {
        console.warn("Ripple canvas not found, ripple effect not initialized.");
        return;
    }

    const ctx = rippleCanvas.getContext('2d');
    let ripples = []; // 存储所有涟漪对象

    // 调整 Canvas 大小以适应窗口
    function resizeCanvas() {
        rippleCanvas.width = window.innerWidth;
        rippleCanvas.height = window.innerHeight;
    }
    resizeCanvas(); // 初始化时调整大小
    window.addEventListener('resize', resizeCanvas); // 窗口大小改变时调整

    // 点击事件：在点击位置生成涟漪
    rippleCanvas.addEventListener('click', (e) => {
        ripples.push({
            x: e.clientX, // 点击的X坐标
            y: e.clientY, // 点击的Y坐标
            radius: 0, // 初始半径
            opacity: 1, // 初始透明度
            speed: 20 // 涟漪扩散速度 (像素/帧)
        });
    });

    // 涟漪动画循环
    function animateRipples() {
        ctx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height); // 清除上一帧内容

        for (let i = 0; i < ripples.length; i++) {
            let ripple = ripples[i];

            // 更新涟漪属性
            ripple.radius += ripple.speed; // 半径逐渐增大
            ripple.opacity -= 0.01; // 透明度逐渐降低，使其淡出

            // 如果涟漪太淡或太大，则从列表中移除
            if (ripple.opacity <= 0 || ripple.radius > Math.max(rippleCanvas.width, rippleCanvas.height) * 0.7) {
                ripples.splice(i, 1);
                i--; // 移除元素后，索引需要回退
                continue;
            }

            // 绘制涟漪（圆形）
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2, false);
            // 设置涟漪的颜色和透明度
            ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`; // 白色涟漪
            ctx.lineWidth = 2; // 涟漪线条粗细
            ctx.stroke(); // 描边绘制
        }
        requestAnimationFrame(animateRipples); // 请求下一帧动画
    }

    animateRipples(); // 启动动画循环
});

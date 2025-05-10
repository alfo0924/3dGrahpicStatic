// 等待DOM完全加載
document.addEventListener('DOMContentLoaded', function() {
    // 3D立方體控制
    const cube = document.getElementById('cube');
    const rotateBtn = document.getElementById('rotate-btn');
    const resetBtn = document.getElementById('reset-btn');

    let isRotating = false;
    let rotationInterval;
    let rotateX = -15;
    let rotateY = 15;

    // 旋轉按鈕點擊事件
    rotateBtn.addEventListener('click', function() {
        if (isRotating) {
            clearInterval(rotationInterval);
            rotateBtn.textContent = '旋轉立方體';
            isRotating = false;
        } else {
            rotationInterval = setInterval(function() {
                rotateY += 1;
                cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }, 30);
            rotateBtn.textContent = '停止旋轉';
            isRotating = true;
        }
    });

    // 重置按鈕點擊事件
    resetBtn.addEventListener('click', function() {
        if (isRotating) {
            clearInterval(rotationInterval);
            rotateBtn.textContent = '旋轉立方體';
            isRotating = false;
        }
        rotateX = -15;
        rotateY = 15;
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // 滑鼠拖動控制立方體旋轉
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    cube.addEventListener('mousedown', function(e) {
        isDragging = true;
        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            rotateY += deltaX * 0.5;
            rotateX -= deltaY * 0.5;

            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // 產品展示互動
    const product = document.getElementById('product');

    product.addEventListener('click', function() {
        this.classList.toggle('zoomed');
        if (this.classList.contains('zoomed')) {
            this.style.transform = 'scale(1.2) rotateY(0deg)';
        } else {
            this.style.transform = 'rotateY(0deg)';
        }
    });

    // 動態背景粒子效果
    const particlesContainer = document.getElementById('particles');

    function createParticles(num) {
        for (let i = 0; i < num; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // 隨機大小
            const size = Math.random() * 5 + 2;

            // 隨機位置
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100;

            // 隨機顏色
            const hue = Math.floor(Math.random() * 360);

            // 隨機動畫持續時間
            const duration = Math.random() * 20 + 10;

            // 設置樣式
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: hsl(${hue}, 80%, 60%);
                border-radius: 50%;
                left: ${xPos}%;
                top: ${yPos}%;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: float ${duration}s linear infinite;
            `;

            // 添加到容器
            particlesContainer.appendChild(particle);
        }
    }

    // 創建浮動動畫
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(0) translateX(20px);
            }
            75% {
                transform: translateY(20px) translateX(10px);
            }
            100% {
                transform: translateY(0) translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    // 創建粒子
    createParticles(30);

    // 標題動畫效果
    const title = document.querySelector('.animated-title');

    function animateTitle() {
        title.style.transform = 'translateY(0)';
        title.style.opacity = '1';
    }

    // 延遲執行標題動畫
    setTimeout(animateTitle, 500);
});

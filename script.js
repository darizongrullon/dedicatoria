const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

var Point = function (x,y){
    this.x = (typeof x !== 'undefined') ? x : 0;
    this.y = (typeof y !== 'undefined') ? y : 0;
};

Point.prototype.clone = function(){
    return new Point(this.x, this.y);
};

function pointOnHeart(t){
    return new Point(
        160 * Math.pow(Math.sin(t),3),
        130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
    );
}

const particules = [];
const particuleCount = 450;

const scale = Math.min(width, height) < 500 ? 0.75 : 1;

for (let i = 0; i < particuleCount; i++){
    const step = (Math.PI * 2) * (i / particuleCount);
    const pos = pointOnHeart(step);
    particules.push({
        targetX: pos.x * scale,
        targetY: -pos.y * scale,
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        speed: 0.015 + Math.random() * 0.025,
        size: Math.random() * 2 + 1,
        offset: Math.random() * Math.PI * 2
    });
}

let time = 0;

function reader (){
    ctx.fillStyle = 'rgba(5, 5, 16, 0.25)';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 + 30;

    time += 0.05;

    particules.forEach(p => {
        const beat = 1 + Math.sin(time) * 0.05;
        const destX = centerX + p.targetX * beat;
        const destY = centerY + p.targetY * beat;

        p.x += (destX - p.y) * p.speed;
        p.y += (destY - p.y) * p.speed;

        ctx.fillStyle = '#00bfff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00bfff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    });
    requestAnimationFrame(reader);
}
reader();
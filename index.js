document.addEventListener('DOMContentLoaded', () => {
    const pendulum = new Pendulum();
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let animationFrameId = null;

    let len1 = 2;
    let len2 = 2;
    let mass1 = 30;
    let mass2 = 30;
    let angle1 = 45 * (Math.PI / 180);
    let angle2 = 90 * (Math.PI / 180);
    let g = 9.81;
    let dampRate = 0.05;
    let vel1 = 0;
    let vel2 = 0;

    function setVars() {
        len1 = Number(document.getElementById("len1").value);
        len2 = Number(document.getElementById("len2").value);
        mass1 = Number(document.getElementById("mass1").value);
        mass2 = Number(document.getElementById("mass2").value);
        angle1 = Number(document.getElementById("angle1").value) * (Math.PI / 180);
        angle2 = Number(document.getElementById("angle2").value) * (Math.PI / 180);
        g = Number(document.getElementById("g").value);
        dampRate = Number(document.getElementById("dampRate").value);
        vel1 = 0;
        vel2 = 0;
    }

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#1a1a1a'; // Set canvas background color
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawPendulum();
        pendulum.tick(1 / 60);
        animationFrameId = requestAnimationFrame(animate);
    }

    function drawPendulum() {
        const coords = pendulum.coordinates;
        let x1 = canvas.width / 2;
        let y1 = canvas.height / 2;

        for (let i = 0; i < pendulum.n; i++) {
            const x2 = x1 + xScale(coords[i].x);
            const y2 = y1 + yScale(coords[i].y);
            context.fillStyle = 'red';
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();

            context.beginPath();
            context.arc(x2, y2, 3, 0, Math.PI * 2);
            context.fill();

            x1 = x2;
            y1 = y2;
        }
    }

    function update() {
        setVars();
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPendulum();
    }

    // Event listeners for controls
    document.getElementById('len1').addEventListener('input', update);
    document.getElementById('len2').addEventListener('input', update);
    document.getElementById('mass1').addEventListener('input', update);
    document.getElementById('mass2').addEventListener('input', update);
    document.getElementById('angle1').addEventListener('input', update);
    document.getElementById('angle2').addEventListener('input', update);
    document.getElementById('g').addEventListener('input', update);
    document.getElementById('dampRate').addEventListener('input', update);
    document.getElementById('restart-button').addEventListener('click', () => {
        setVars();
        update();
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    });
    document.getElementById('pause-button').addEventListener('click', () => {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    });
    document.getElementById('play-button').addEventListener('click', () => {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
        }
    });

    // Initial setup
    setVars();
    requestAnimationFrame(animate);
});

function xScale(x) {
    return x * 100;
}

function yScale(y) {
    return -y * 100;
}
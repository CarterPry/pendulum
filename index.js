let color = {
    theme: "rgba(0, 0, 0, 0)",
    themetransparent: "rgba(0, 0, 0, 0.04)",
    entry: "rgb(46, 46, 51)",
    primary: "rgb(218, 218, 219)",
    secondary: "rgb(155, 156, 157)",
    tertiary: "rgb(65, 66, 68)",
    border: "rgb(51, 51, 51)"
}

let length1, length2;
let mass1, mass2;
let angle1, angle2;
let velocity1, velocity2;
let g;
let xoffset, yoffset;
let firstFrame;
let startButtonTime;



function setVars() {
    length1 = Number(document.getElementById("length1Input").value);
    length2 = Number(document.getElementById("length2Input").value);
    
    mass1 = Number(document.getElementById("mass1Input").value);
    mass2 = Number(document.getElementById("mass2Input").value);
    
    angle1 = Number(document.getElementById("angle1Input").value) * (Math.PI / 180);
    angle2 = Number(document.getElementById("angle2Input").value) * (Math.PI / 180);
    
    velocity1 = 0;
    velocity2 = 0;
    g = Number(document.getElementById("g-input").value);
    firstFrame = true;
    xoffset = width / 2;
    yoffset = height / 4;
}



function setup() {
    var div = document.getElementById("sim");
    var canvas = createCanvas(div.offsetWidth, div.offsetHeight);
    canvas.parent('sim');

    setVars();
    noLoop();

    startButtonTime = millis();
}



function drawGradient(pg) {
    let ctx = pg.drawingContext;
    let gradient = ctx.createLinearGradient(0, 0, pg.width, pg.height);
    gradient.addColorStop(0, "#0a0910"); // Background gradient color
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, pg.width, pg.height);
}



function draw() {
    clear();  // Clear the canvas after each frame
    drawGradient(this);  // Gradient background each frame, this took me a bit to figure out

    let accel1 = (-g * (2 * mass1 + mass2) * Math.sin(angle1) - mass2 * g * Math.sin(angle1 - 2 * angle2) - 2 * Math.sin(angle1 - angle2) * mass2 * (velocity2 * velocity2 * length2 + velocity1 * velocity1 * length1 * Math.cos(angle1 - angle2))) / (length1 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2)));
    
    let accel2 = (2 * Math.sin(angle1 - angle2) * (velocity1 * velocity1 * length1 * (mass1 + mass2) + g * (mass1 + mass2) * Math.cos(angle1) + velocity2 * velocity2 * length2 * mass2 * Math.cos(angle1 - angle2))) / (length2 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2)));


    let dt = 1 / frameRate();
    if (frameRate() <= 2 || frameRate() >= 9000) {
        dt = 0.01667; // Assume 60 fps?
    }

    let netAccel1 = accel1;
    let netAccel2 = accel2;

    velocity1 += netAccel1 * dt;
    velocity2 += netAccel2 * dt;
    angle1 += velocity1 * dt;
    angle2 += velocity2 * dt;

    document.getElementById("angle1Input").value = (Math.round(angle1 * (180 / Math.PI)));
    document.getElementById("angle1Output").innerHTML = (Math.round(angle1 * (180 / Math.PI)) + "°");

    document.getElementById("angle2Input").value = (Math.round(angle2 * (180 / Math.PI)));
    document.getElementById("angle2Output").innerHTML = (Math.round(angle2 * (180 / Math.PI)) + "°");

    updateScreen();
}



function updateScreen(updating = false) {
    if (!updating) {
        drawGradient(this);
    }

    stroke(color.secondary);
    strokeWeight(4);

    if (!updating) {
        translate(xoffset, yoffset);
    }

    x1 = (length1 * 100) * Math.sin(angle1);
    y1 = (length1 * 100) * Math.cos(angle1);
    x2 = x1 + (length2 * 100) * Math.sin(angle2);
    y2 = y1 + (length2 * 100) * Math.cos(angle2);

    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);

    // Set the color for the balls and draw them
    fill('rgb(227, 216, 113)'); // Color didn;t really stick not too sure why but if it works don't touch it
    ellipse(x1, y1, fancyLog(mass1), fancyLog(mass1));
    fill('rgb(227, 216, 113)');
    ellipse(x2, y2, fancyLog(mass2), fancyLog(mass2));
}

window.onresize = () => {
    loop();
    setup();
}
let restartButtonTime;



document.getElementById("restart-button").addEventListener("click", () => {
    if (millis() - restartButtonTime <= 500) {
        console.log(`Ignored, it's only been ${millis() - restartButtonTime} ms.`);
        restartButtonTime = millis();
        return;
    }
    restartButtonTime = millis();
    loop();
    document.getElementById("angle1Input").value = 45;
    document.getElementById("angle1Output").innerHTML = "45°";
    document.getElementById("angle2Input").value = 90;
    document.getElementById("angle2Output").innerHTML = "90°";
    setVars();

    noLoop();
});



document.getElementById("pause-button").addEventListener("click", () => {
    noLoop();
    restartButtonTime = millis();
});



document.getElementById("play-button").addEventListener("click", () => {
    if (millis() - startButtonTime <= 500 || millis() - restartButtonTime <= 500) {
        console.log(`Ignored, it's only been ${millis} ms.`);
        return;
    }
    loop();
});



function fancyLog(n) {
    return 20 * Math.log2(n + 16) - 80;
}



document.getElementById("mass1Input").addEventListener("change", () => {
    mass1 = Number(document.getElementById("mass1Input").value);
    document.getElementById("mass1Output").innerHTML = (mass1 + " kg"); // kg over lbs any day
    if (!isLooping()) {
        updateScreen(true);
    }
});



document.getElementById("mass2Input").addEventListener("change", () => {
    mass2 = Number(document.getElementById("mass2Input").value);
    document.getElementById("mass2Output").innerHTML = (mass2 + " kg");
    if (!isLooping()) {
        updateScreen(true);
    }
});



document.getElementById("length1Input").addEventListener("change", () => {
    length1 = Number(document.getElementById("length1Input").value);
    document.getElementById("length1Output").innerHTML = (length1 + " m");
    if (!isLooping()) {
        updateScreen(true);
    }
});



document.getElementById("length2Input").addEventListener("change", () => {
    length2 = Number(document.getElementById("length2Input").value);
    document.getElementById("length2Output").innerHTML = (length2 + " m");
    if (!isLooping()) {
        updateScreen(true);
    }
});



document.getElementById("g-input").addEventListener("change", () => {
    g = Number(document.getElementById("g-input").value);
    document.getElementById("g-output").innerHTML = (g + " m/s²");
    if (!isLooping()) {
        updateScreen(true);
    }
});



document.getElementById("angle1Input").addEventListener("change", () => {
    angle1 = Number(document.getElementById("angle1Input").value) * (Math.PI / 180);
    document.getElementById("angle1Output").innerHTML = document.getElementById("angle1Input").value + "°";
    if (!isLooping()) {
        updateScreen(true);
    }
});



document.getElementById("angle2Input").addEventListener("change", () => {
    angle2 = Number(document.getElementById("angle2Input").value) * (Math.PI / 180);
    document.getElementById("angle2Output").innerHTML = document.getElementById("angle2Input").value + "°";
    if (!isLooping()) {
        updateScreen(true);
    }
});

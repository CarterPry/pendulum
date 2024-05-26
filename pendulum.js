let len1, len2, mass1, mass2, angle1, angle2;
let gravity, damping;
let aVel1 = 0, aVel2 = 0;
let aAcc1 = 0, aAcc2 = 0;

function setup() {
    createCanvas(800, 600);
    len1 = select('#len1-input').value();
    len2 = select('#len2-input').value();
    mass1 = select('#mass1-input').value();
    mass2 = select('#mass2-input').value();
    angle1 = radians(select('#angle1-input').value());
    angle2 = radians(select('#angle2-input').value());
    gravity = select('#gravity').value();
    damping = select('#damping').value();
    
    select('#len1-input').input(updateValues);
    select('#len2-input').input(updateValues);
    select('#mass1-input').input(updateValues);
    select('#mass2-input').input(updateValues);
    select('#angle1-input').input(updateValues);
    select('#angle2-input').input(updateValues);
    select('#gravity').input(updateValues);
    select('#damping').input(updateValues);
}

function draw() {
    background(26, 26, 26);
    translate(width / 2, height / 4);

    let num1 = -gravity * (2 * mass1 + mass2) * sin(angle1);
    let num2 = -mass2 * gravity * sin(angle1 - 2 * angle2);
    let num3 = -2 * sin(angle1 - angle2) * mass2;
    let num4 = aVel2 * aVel2 * len2 + aVel1 * aVel1 * len1 * cos(angle1 - angle2);
    let den = len1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
    aAcc1 = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * sin(angle1 - angle2);
    num2 = (aVel1 * aVel1 * len1 * (mass1 + mass2) + gravity * (mass1 + mass2) * cos(angle1) + aVel2 * aVel2 * len2 * mass2 * cos(angle1 - angle2));
    den = len2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
    aAcc2 = (num1 * num2) / den;

    aVel1 += aAcc1;
    aVel2 += aAcc2;
    aVel1 *= damping;
    aVel2 *= damping;
    angle1 += aVel1;
    angle2 += aVel2;

    let x1 = len1 * sin(angle1);
    let y1 = len1 * cos(angle1);
    let x2 = x1 + len2 * sin(angle2);
    let y2 = y1 + len2 * cos(angle2);

    stroke(255);
    strokeWeight(2);
    fill(255);
    line(0, 0, x1, y1);
    ellipse(x1, y1, mass1 * 5, mass1 * 5);
    line(x1, y1, x2, y2);
    ellipse(x2, y2, mass2 * 5, mass2 * 5);
}

function updateValues() {
    len1 = select('#len1-input').value();
    len2 = select('#len2-input').value();
    mass1 = select('#mass1-input').value();
    mass2 = select('#mass2-input').value();
    angle1 = radians(select('#angle1-input').value());
    angle2 = radians(select('#angle2-input').value());
    gravity = select('#gravity').value();
    damping = select('#damping').value();
}
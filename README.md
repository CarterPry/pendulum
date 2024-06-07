# Double Pendulum Simulation: README.md

This project is a pendulum simulation where you can adjust the parameters such as lengths, masses, gravity, even the angle string. I used the [p5](https://p5js.org/) library and also added some options like controls to start, pause, or reset the simulation.

### Double Pendulum Dynamics
This is a double pendulum which consists of two masses attached end to end. The motion of the double pendulum can be pretty chaotic/sensitive to change of conditions. The dynamics are all influenced by the lengths, mass sizes, and gravity.

### Equations of Motion
The motion equations use Lagrangian mechanics and involve coupled nonlinear differential equations. 
Let $\theta_1$ and $\theta_2$ represent the angles of the first and second pendulums. The angular velocities are $\omega_1$ and $\omega_2$, and the angular accelerations are $\alpha_1$ and $\alpha_2$.

The equations of motion for the double pendulums:
$$
\alpha_1 = \frac{-g(2m_1 + m_2)\sin(\theta_1) - m_2g\sin(\theta_1 - 2\theta_2) - 2\sin(\theta_1 - \theta_2)m_2(\omega_2^2L_2 + \omega_1^2L_1\cos(\theta_1 - \theta_2))}{L_1(2m_1 + m_2 - m_2\cos(2\theta_1 - 2\theta_2))}
$$

and

$$
\alpha_2 = \frac{2\sin(\theta_1 - \theta_2)(\omega_1^2L_1(m_1 + m_2) + g(m_1 + m_2)\cos(\theta_1) + \omega_2^2L_2m_2\cos(\theta_1 - \theta_2))}{L_2(2m_1 + m_2 - m_2\cos(2\theta_1 - 2\theta_2))}
$$

Where:
- $g$ is the gravity.
- $m_1$ and $m_2$ are the masses of the first and second pendulums.
- $L_1$ and $L_2$ are the lengths of the first and second pendulums.
- $\theta_1$ and $\theta_2$ are the angles of the first and second pendulums from the vertical.
- $\omega_1$ and $\omega_2$ are the angular velocities of the first and second pendulums.

These equations show how the angular accelerations $\alpha_1$ and $\alpha_2$ change over time based on the angles, angular velocities, and other parameters.

### Diameter Representation of Mass

In the pendulum simulation, the size of the dot representing each mass can be visualized in various ways. Here are the different equations used to represent the diameter of the dot as a function of its mass:

1. **Direct Correlation**:
    $$
    y = x
    $$
   This represents a direct linear relationship between mass (x) and diameter (y), meaning the size of the dot grows directly proportional to the mass.

2. **Logarithmic Correlation**:
    $$
    y = 20 \log_2(x + 16) - 80
    $$
   This equation uses a logarithmic scale to represent the diameter of the dot, which can be useful to visualize a wide range of masses without the dots becoming excessively large.

3. **Area of a Circle**:
    $$
    y = 2\sqrt{\frac{x}{\pi}}
    $$
   This equation relates the diameter of the dot to its mass, assuming the dot represents the area of a circle.

4. **Volume of a Sphere**:
    $$
    y = 2\sqrt[3]{\frac{3x}{4\pi}}
    $$
   This equation assumes the dot represents the volume of a sphere, relating its diameter to the mass.

### Setup

- `setVars()`: Initializes the variables for length, mass, angles, angle velocities, and gravity, for HTML inputs.

    ```javascript
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
    ```

- `setup()`: Sets up the canvas and initializes the simulation parameters.

    ```javascript
    function setup() {
        var div = document.getElementById("sim");
        var canvas = createCanvas(div.offsetWidth, div.offsetHeight);
        canvas.parent('sim');

        setVars();
        noLoop();

        startButtonTime = millis();
    }
    ```

#### Drawing and Simulation

- `draw()`: This function is called constantly to update the simulation. Updates the new positions of the pendulums based on the equations and renders the pendulums on the canvas.

    ```javascript
    function draw() {
    clear();  // Clear the canvas after each frame
    drawGradient(this);  // Gradient background each frame, this took me a bit to figure out

        let accel1 = (-g * (2 * mass1 + mass2) * Math.sin(angle1) - mass2 * g * Math.sin(angle1 - 2 * angle2) - 2 * Math.sin(angle1 - angle2) * mass2 * (velocity2 * velocity2 * length2 + velocity1 *  velocity1 * length1 * Math.cos(angle1 - angle2))) / (length1 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2)));
    
        let accel2 = (2 * Math.sin(angle1 - angle2) * (velocity1 * velocity1 * length1 * (mass1 + mass2) + g * (mass1 + mass2) * Math.cos(angle1) + velocity2 * velocity2 * length2 * mass2 * Math.cos(angle1 -     angle2))) / (length2 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2)));


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
    ```

- `updateScreen()`: Updates the visual representation of the pendulums on the screen.

    ```javascript
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

        fill('rgb(227, 216, 113)'); 
        ellipse(x1, y1, fancyLog(mass1), fancyLog(mass1));
        fill('rgb(227, 216, 113)');
        ellipse(x2, y2, fancyLog(mass2), fancyLog(mass2));
    }
    ```

#### Event Listeners

Tons and tons of event listeners to handle the input parameters and control buttons (play, pause, restart).

- `Restart button`:

    ```javascript
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
    ```

- `Pause button`:

    ```javascript
    document.getElementById("pause-button").addEventListener("click", () => {
        noLoop();
        restartButtonTime = millis();
    });
    ```

- `Play button`:

    ```javascript
    document.getElementById("play-button").addEventListener("click", () => {
        if (millis() - startButtonTime <= 500 || millis() - restartButtonTime <= 500) {
            console.log(`Ignored, it's only been ${millis()} ms.`);
            return;
        }
        loop();
    });
    ```

- `Parameters`:

    ```javascript
    document.getElementById("mass1Input").addEventListener("change", () => {
        mass1 = Number(document.getElementById("mass1Input").value);
        document.getElementById("mass1Output").innerHTML = mass1 + " kg";
        if (!isLooping()) {
            updateScreen(true);
        }
    });

    document.getElementById("mass2Input").addEventListener("change", () => {
        mass2 = Number(document.getElementById("mass2Input").value);
        document.getElementById("mass2Output").innerHTML = mass2 + " kg";
        if (!isLooping()) {
            updateScreen(true);
        }
    });

    document.getElementById("length1Input").addEventListener("change", () => {
        length1 = Number(document.getElementById("length1Input").value);
        document.getElementById("length1Output").innerHTML = length1 + " m";
        if (!isLooping()) {
            updateScreen(true);
        }
    });

    document.getElementById("length2Input").addEventListener("change", () => {
        length2 = Number(document.getElementById("length2Input").value);
        document.getElementById("length2Output").innerHTML = length2 + " m";
        if (!isLooping()) {
            updateScreen(true);
        }
    });

    document.getElementById("g-input").addEventListener("change", () => {
        g = Number(document.getElementById("g-input").value);
        document.getElementById("g-output").innerHTML = g + " m/s²";
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
    ```

### Dependencies

- **p5.min.js**: The p5.js library is used for drawing and animating the pendulums. I had trouble calling the script in the HTML file, so I manually added the file to the repo for it to use. This file is linked in the `index.html`, but linked locally.

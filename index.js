<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendulum Simulation</title>
    <link rel="stylesheet" href="style.css">
    <script src="p5.min.js" defer></script>
    <script src="index.js" defer></script>
</head>


<body>
    <div class="container">
        <div class="common-controls">
            <div class="box">
                <div class="parameter">
                    <div>
                        <i class="fa-solid fa-earth-americas"></i>
                        <strong>Gravity</strong>
                        <p id="g-output">9.81 m/s²</p>
                    
                    </div>
                    <input type="range" id="g-input" min="0" max="50" value="9.81" step="0.01">
                </div>
            </div>
        </div>



        <div class="controls-left">
            <div class="box">
                <h2><b>Options for Mass 1</b></h2>
                <br><br>
                <div class="parameter">
                    <div>
                        <i class="fa-solid fa-ruler"></i>
                        <strong>Length 1</strong>
                        <p id="length1Output">1.5 m</p>
                    </div>
                    <input type="range" id="length1Input" min="0.5" max="5" value="2" step="0.1">
                </div>
              
              
                <div class="parameter">
                    <div>
                        <i class="fa-solid fa-weight-hanging"></i>
                        <strong>Mass 1</strong>
                        <p id="mass1Output">30 kg</p>
                    </div>
                    <input type="range" id="mass1Input" min="10" max="100" value="30">
                </div>
             
             
             
                <div class="parameter">
                    <div>
                        <i class="fa-solid fa-circle-dot"></i>
                        <strong>Angle 1</strong>
                        <p id="angle1Output">45°</p>
                    </div>
                    <input type="range" id="angle1Input" min="-180" max="180" value="45" step="5">
                </div>
            </div>
        </div>
     
     
     
        <div class="sim" id="sim"></div>
        <div class="controls-right">
            <div class="box">
                <h2><b>Options for Mass 2</b></h2>
                <br><br>
                <div class="parameter">
                    <div>
                        <i class="fa-solid fa-ruler"></i>
                        <strong>Length 2</strong>
                        <p id="length2Output">1.5 m</p>
                    </div>
                    <input type="range" id="length2Input" min="0.5" max="5" value="2" step="0.1">
                </div>
                <div class="parameter">
                    <div>
                        <i class="fa-solid fa-weight-hanging"></i>
                        <strong>Mass 2</strong>
                        <p id="mass2Output">30 kg</p>
                    </div>
                    <input type="range" id="mass2Input" min="10" max="100" value="30">
                </div>
         
         
         
                <div class="parameter">
                    <div>
                        <i class="fa-solid fa-circle-dot"></i>
                        <strong>Angle 2</strong>
                        <p id="angle2Output">90°</p>
                    </div>
                    <input type="range" id="angle2Input" min="-180" max="180" value="90" step="5">
                </div>
            </div>
        </div>
    </div>
 
 
 
    <div class="time-controls" id="time-controls">
        <button id="play-button">
            <img src="start.png" alt="Play">
        </button>
        <button id="pause-button">
            <img src="pause.png" alt="Pause">
        </button>
        <button id="restart-button">
            <img src="restart.png" alt="Restart">
        </button>
    </div>
</body>
</html>

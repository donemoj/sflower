let water = 0; // Your interactions
let sunlight = 0; // Their interactions
let flowerHealth = 100; // Flower's health
let lastInteraction = 0;
let maxHealth = 100;
let minHealth = 20;
let wiltingRate = 0.1;
let bloomEffect = 0;

function setup() {
    createCanvas(400, 400, WEBGL);
    lastInteraction = millis(); // Initialize timer
}

function draw() {
    background(230); // Soft gray background

    // Smooth camera positioning
    rotateX(PI / 3);
    translate(0, 50, 0);
    scale(2.5);

    // Update health based on time
    let timeSinceLastInteraction = (millis() - lastInteraction) / 1000;
    flowerHealth -= wiltingRate * timeSinceLastInteraction;
    flowerHealth = constrain(flowerHealth, minHealth, maxHealth);

    // Bloom effect changes flower size
    let bloomSize = map(flowerHealth, minHealth, maxHealth, 0.6, 1.2);

    // Draw flower with bloom effect
    drawStem();
    drawFlower(0, -70, bloomSize);

    // Display stats
    resetMatrix();
    textSize(14);
    fill(0);
    text(`Water: ${water}`, -180, 170);
    text(`Sunlight: ${sunlight}`, -180, 185);
    text(`Health: ${Math.round(flowerHealth)}%`, -180, 200);
}

function drawStem() {
    push();
    fill(30, 120, 40);
    translate(0, 30, 0);
    cylinder(10, 100);
    pop();
}

function drawFlower(x, y, bloomSize) {
    push();
    translate(x, y, 0);
    scale(bloomSize);

    // 🌸 Draw 6 petals in a circular pattern
    for (let i = 0; i < 6; i++) {
        push();
        rotateY(TWO_PI * (i / 6));  // Spread evenly around the center
        translate(15, -10, 5); // Adjust petal placement
        drawPetal();
        pop();
    }

    // 🌞 Draw center of the flower
    fill(255, 204, 0);
    sphere(15); // Yellow sphere in the middle

    pop();
}

function drawPetal() {
    fill(220, 20, 60); // Deep red petals
    push();
    rotateX(HALF_PI / 1.5); // Adjust petal orientation
    rotateZ(HALF_PI / 3);
    scale(1, 1.5, 0.2);
    sphere(15, 8, 8); // Smoother petal with a sphere-like shape
    pop();
}


// Interaction handlers
function waterFlower() {
    water++;
    lastInteraction = millis();
    flowerHealth = min(flowerHealth + 5, maxHealth);
}

function sunlightFlower() {
    sunlight++;
    lastInteraction = millis();
    flowerHealth = min(flowerHealth + 5, maxHealth);
}

function mousePressed() {
    if (mouseX > width / 2) {
        sunlightFlower();
    } else {
        waterFlower();
    }
}

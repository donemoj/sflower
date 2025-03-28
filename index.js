let water = 0; // Amount of water (your interactions)
let sunlight = 0; // Amount of sunlight (their interactions)
let flowerHealth = 100; // Flower's health (starts full)
let lastInteraction = 0; // Time of the last interaction (in milliseconds)
let maxHealth = 100; // Maximum health for the flower
let minHealth = 20; // Minimum health for the flower before it wilts
let wiltingRate = 0.1; // Rate at which the flower wilts per second without interaction
let bloomEffect = 0; // Track bloom effect

function setup() {
    createCanvas(400, 400);
    lastInteraction = millis(); // Set the initial time
}

function draw() {
    background(255);

    // Check if it's time to reduce the flower's health
    let timeSinceLastInteraction = (millis() - lastInteraction) / 1000; // in seconds
    flowerHealth -= wiltingRate * timeSinceLastInteraction;

    // Make sure flower health doesn't go below minimum
    flowerHealth = max(flowerHealth, minHealth);

    // Update flower health based on water and sunlight
    flowerHealth = map(water + sunlight, 0, 200, minHealth, maxHealth);

    // Update flower's bloom effect based on interactions
    let bloomSize = bloomEffect > 0 ? map(bloomEffect, 0, 20, 1, 1.5) : 1; // Bloom animation
    bloomEffect -= 0.1; // Gradually reduce the bloom effect

    // Draw flower
    drawFlower(width / 2, height / 2, bloomSize);

    // Show health information
    fill(0);
    textSize(16);
    text(`Water: ${water}`, 10, height - 40);
    text(`Sunlight: ${sunlight}`, 10, height - 20);
    text(`Flower Health: ${Math.round(flowerHealth)}%`, 10, height - 60);
}

function drawFlower(x, y, bloomSize) {
    let petalSize = map(flowerHealth, minHealth, maxHealth, 10, 60);

    noStroke();
    fill(255, 0, 0); // Red petals
    ellipse(x, y - 20, petalSize * bloomSize, petalSize * bloomSize * 2); // Top petal
    ellipse(x, y + 20, petalSize * bloomSize, petalSize * bloomSize * 2); // Bottom petal
    ellipse(x - 20, y, petalSize * bloomSize, petalSize * bloomSize * 2); // Left petal
    ellipse(x + 20, y, petalSize * bloomSize, petalSize * bloomSize * 2); // Right petal

    // Draw flower center
    fill(255, 204, 0); // Yellow center
    ellipse(x, y, 40, 40);
}

// Functions to handle water and sunlight interactions
function waterFlower() {
    water++;
    lastInteraction = millis();
    bloomEffect = 20; // Trigger bloom animation on water
}

function sunlightFlower() {
    sunlight++;
    lastInteraction = millis();
    bloomEffect = 20; // Trigger bloom animation on sunlight
}

// Trigger interactions based on mouse clicks
function mousePressed() {
    if (mouseX > width / 2) {
        sunlightFlower(); // Trigger sunlight interaction on right side of the canvas
    } else {
        waterFlower(); // Trigger water interaction on left side of the canvas
    }
}

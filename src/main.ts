import "./style.css";

// Game state
let count = 0;
let growthRate = 0;

// UI elements
const button = document.createElement("button");
button.textContent = "Click me to increase";
document.body.appendChild(button);

const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Count: ${count}`;
document.body.appendChild(counterDisplay);

const purchaseButton = document.createElement("button");
purchaseButton.textContent = "Buy Upgrade (+1/sec) - Cost: 10";
document.body.appendChild(purchaseButton);

// Update display and button state
const updateDisplay = () => {
  counterDisplay.textContent = `Count: ${count}`;
  purchaseButton.disabled = count < 10;
};

// Initial update
updateDisplay();

// Handle manual click
button.onclick = () => {
  count++;
  updateDisplay();
};

// Purchase upgrade
purchaseButton.onclick = () => {
  if (count >= 10) {
    count -= 10;
    growthRate++;
    updateDisplay();
  }
};

// Single animation loop
let lastTime = performance.now();
const animate = (currentTime: number) => {
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= 1000) { // 1 second has passed
    count += growthRate;
    updateDisplay();
    lastTime = currentTime;
  }

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

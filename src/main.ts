import "./style.css";

// Game state
let count = 0;
let totalRate = 0; // combined production rate from all upgrades

// UI elements
const button = document.createElement("button");
button.textContent = "⚡ Zap";
button.classList.add("manual-click-btn");
document.body.appendChild(button);

const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Energy: ${count}`;
document.body.appendChild(counterDisplay);

// Upgrade definitions
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
}

const upgrades: Upgrade[] = [
  { name: "A", cost: 10, rate: 0.1 },
  { name: "B", cost: 100, rate: 2.0 },
  { name: "C", cost: 1000, rate: 50 },
];

// Track ownership
const ownedUpgrades: number[] = [0, 0, 0];

// Status displays
const rateDisplay = document.createElement("div");
rateDisplay.textContent = "Production rate: 0 units/sec";
document.body.appendChild(rateDisplay);

const ownedDisplays: HTMLDivElement[] = [];
upgrades.forEach((upgrade, _i) => {
  const div = document.createElement("div");
  div.textContent = `${upgrade.name}: 0 owned`;
  ownedDisplays.push(div);
  document.body.appendChild(div);
});

// Update display and button states
const updateDisplay = () => {
  counterDisplay.textContent = `Energy: ${count.toFixed(1)}`;

  // Only update buttons with class 'upgrade-btn'
  document.querySelectorAll(".upgrade-btn").forEach((btn, i) => {
    (btn as HTMLButtonElement).disabled = count < upgrades[i].cost;
  });

  updateUI();
};

// Initialize UI
updateDisplay();

// Handle manual click
button.onclick = () => {
  count++;
  updateDisplay();
};

// Create purchase buttons for each upgrade
upgrades.forEach((upgrade, _i) => {
  const btn = document.createElement("button");
  btn.textContent = `Buy ${upgrade.name} (+${
    upgrade.rate.toFixed(1)
  }/sec) - Cost: ${upgrade.cost}`;
  btn.classList.add("upgrade-btn");
  btn.disabled = count < upgrade.cost;
  btn.onclick = () => {
    if (count >= upgrade.cost) {
      count -= upgrade.cost;
      ownedUpgrades[_i]++;
      totalRate += upgrade.rate;
      updateDisplay();
    }
  };
  document.body.appendChild(btn);
});

// Animation loop (60fps safe)
let lastTime = performance.now();
const animate = (currentTime: number) => {
  const deltaTime = (currentTime - lastTime) / 1000; // seconds
  if (deltaTime >= 0.01) { // update every 10ms
    count += totalRate * deltaTime;
    updateDisplay();
    lastTime = currentTime;
  }
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);

// Update status displays
function updateUI() {
  rateDisplay.textContent = `Production rate: ${
    totalRate.toFixed(1)
  } units/sec`;
  ownedUpgrades.forEach((owned, i) => {
    ownedDisplays[i].textContent = `${upgrades[i].name}: ${owned} owned`;
  });
}

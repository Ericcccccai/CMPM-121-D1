// Imports
import "./style.css";

// Game state
let money = 0;
let totalRate = 0; // combined production rate from all upgrades

// UI elements
const button = document.createElement("button");
button.textContent = "Sell Flower";
button.classList.add("manual-click-btn");
document.body.appendChild(button);

const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Money: ${money}`;
document.body.appendChild(counterDisplay);

// Upgrade Interfaces
interface Upgrade {
  name: string;
  baseCost: number;
  cost: number;
  rate: number;
  owned: number;
  button: HTMLButtonElement;
  description: string;
}

const upgrades: Upgrade[] = [
  {
    name: "Buy Seeds",
    baseCost: 10,
    cost: 10,
    rate: 0.1,
    owned: 0,
    button: document.createElement("button"),
    description: "Gotta buy some seed to start right",
  },
  {
    name: "Buy Planter",
    baseCost: 100,
    cost: 100,
    rate: 2.0,
    owned: 0,
    button: document.createElement("button"),
    description: "Ok now we are on to something",
  },
  {
    name: "Buy Greenhouse",
    baseCost: 1000,
    cost: 1000,
    rate: 50,
    owned: 0,
    button: document.createElement("button"),
    description: "We are going BBIIIIIIGGGGGGGGGG",
  },
  {
    name: "Buy Drones",
    baseCost: 3000,
    cost: 3000,
    rate: 125,
    owned: 0,
    button: document.createElement("button"),
    description: "Drones help planting",
  },
  {
    name: "Buy Bioengineered Garden",
    baseCost: 6000,
    cost: 6000,
    rate: 300,
    owned: 0,
    button: document.createElement("button"),
    description: "Chem students doing their work",
  },
];

// Status displays
const rateDisplay = document.createElement("div");
rateDisplay.textContent = "Production rate: 0 flowers/sec";
document.body.appendChild(rateDisplay);

const ownedDisplays: HTMLDivElement[] = [];
upgrades.forEach((upgrade, _i) => {
  const div = document.createElement("div");
  div.textContent = `${upgrade.name}: 0 owned`;
  ownedDisplays.push(div);
  document.body.appendChild(div);
});

// Create purchase buttons for each upgrade
upgrades.forEach((upgrade) => {
  upgrade.button.classList.add("upgrade-btn");
  updateButtonDisplay(upgrade);
  upgrade.button.onclick = () => {
    if (money >= upgrade.cost) {
      money -= upgrade.cost;
      upgrade.owned++;
      totalRate += upgrade.rate;
      upgrade.cost *= 1.15; // increase price
      updateButtonDisplay(upgrade);
      updateUI();
    }
  };
  document.body.appendChild(upgrade.button);
});

// Update status displays
function updateUI() {
  counterDisplay.textContent = `💰 Money: ${money.toFixed(1)}`;

  rateDisplay.textContent = `💰 Earnings: ${totalRate.toFixed(1)} money/sec`;

  ownedDisplays.forEach((display, i) => {
    display.textContent = `${upgrades[i].name}: ${upgrades[i].owned} owned`;
  });

  // Also update all upgrade buttons (enables/disables based on affordability)
  upgrades.forEach((upgrade) => {
    updateButtonDisplay(upgrade);
  });
}

// Update display and button states
function updateButtonDisplay(upgrade: Upgrade) {
  upgrade.button.textContent =
    `Buy ${upgrade.name} (+${upgrade.rate}/sec) - Cost: ${
      upgrade.cost.toFixed(1)
    }`;
  upgrade.button.disabled = money < upgrade.cost;
}

// Initialize UI
updateUI();

// Handle manual click
button.onclick = () => {
  money++;
  updateUI();
};

// Animation loop (60fps safe)
let lastTime = performance.now();
const animate = (currentTime: number) => {
  const deltaTime = (currentTime - lastTime) / 1000; // seconds
  if (deltaTime >= 0.01) { // update every 10ms
    money += totalRate * deltaTime;
    updateUI();
    lastTime = currentTime;
  }
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);

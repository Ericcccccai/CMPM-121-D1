import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

//button
const button = document.createElement("button");
button.textContent = "Click me!";
button.onclick = () => alert("Hello from CMPM 121!");
document.body.appendChild(button);

//count
let count = 0;
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Count: ${count}`;
document.body.appendChild(counterDisplay);

// Update on click
button.onclick = () => {
  count++;
  counterDisplay.textContent = `Count: ${count}`;
};

setInterval(() => {
  count++;
  counterDisplay.textContent = `Count: ${count}`;
}, 1000);

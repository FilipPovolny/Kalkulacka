const inputDisplay = document.getElementById("calculator-input");
const outputDisplay = document.getElementById("calculator-output");
const historyDisplay = document.getElementById("history-display");

let input = "";

// Načti historii z localStorage
function loadHistory() {
  const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
  savedHistory.forEach(item => {
    const historyItem = document.createElement("p");
    historyItem.textContent = item;
    historyDisplay.appendChild(historyItem);
  });
}

// Ulož aktuální historii do localStorage
function saveHistory() {
  const historyItems = Array.from(historyDisplay.querySelectorAll("p")).map(p => p.textContent);
  localStorage.setItem("history", JSON.stringify(historyItems));
}

// Aktualizace vstupního displaye
function updateInputDisplay() {
  inputDisplay.textContent = input || "0";
}

// Aktualizace výstupního displaye
function updateOutput(value) {
  outputDisplay.textContent = value;
}

// Výpočet
function calculate() {
  try {
    const sanitizedInput = input.replace(/\^/g, "**");
    const result = eval(sanitizedInput);
    updateOutput(result);

    const historyItemText = `${input} = ${result}`;
    const historyItem = document.createElement("p");
    historyItem.textContent = historyItemText;
    historyDisplay.prepend(historyItem);

    saveHistory(); // Ulož novou historii
    input = result.toString();
  } catch (e) {
    updateOutput("Error");
  }
}

// Tlačítka
document.querySelectorAll(".calculator-buttons button").forEach((button) => {
  const value = button.getAttribute("value");

  if (!value) return;

  button.addEventListener("click", () => {
    if (value === "=") {
      calculate();
    } else if (value === "C") {
      input = input.slice(0, -1);
      updateInputDisplay();
    } else if (value === "CE") {
      input = "";
      updateInputDisplay();
      updateOutput("0");
    } else {
      input += value;
      updateInputDisplay();
    }
  });
});

// Vymazání historie
document.getElementById("clear-history-btn").addEventListener("click", () => {
  historyDisplay.innerHTML = "";
  localStorage.removeItem("history");
});

// Načti historii po načtení stránky
window.addEventListener("load", loadHistory);

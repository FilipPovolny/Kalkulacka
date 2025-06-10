const inputDisplay = document.getElementById("calculator-input");
const outputDisplay = document.getElementById("calculator-output");
const historyDisplay = document.getElementById("history-display");

let input = "";

// Zobrazení vstupu
function updateInputDisplay() {
  inputDisplay.textContent = input || "0";
}

// Zobrazení výsledku
function updateOutput(value) {
  outputDisplay.textContent = value;
}

// Uložení do localStorage
function saveHistoryItem(expression, result) {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(`${expression} = ${result}`);
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

// Načtení historie z localStorage
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyDisplay.innerHTML = "";
  history.forEach((item) => {
    const historyItem = document.createElement("p");
    historyItem.textContent = item;
    historyDisplay.appendChild(historyItem);
  });
}

// Výpočet
function calculate() {
  try {
    const sanitizedInput = input.replace(/\^/g, "**");
    const result = eval(sanitizedInput);
    updateOutput(result);

    saveHistoryItem(input, result);

    const historyItem = document.createElement("p");
    historyItem.textContent = `${input} = ${result}`;
    historyDisplay.prepend(historyItem);

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

// Klávesnice
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/().^".includes(key)) {
    input += key;
    updateInputDisplay();
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace" || key.toLowerCase() === "c") {
    input = input.slice(0, -1);
    updateInputDisplay();
  }
});

// Vymazání historie
document.getElementById("clear-history-btn").addEventListener("click", () => {
  historyDisplay.innerHTML = "";
  localStorage.removeItem("calcHistory");
});

// Při načtení stránky
loadHistory();
updateInputDisplay();

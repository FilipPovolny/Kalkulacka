const inputDisplay = document.getElementById("calculator-input");
const outputDisplay = document.getElementById("calculator-output");
const historyDisplay = document.getElementById("history-display");

let input = "";

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
      // Odstraň poslední znak
      input = input.slice(0, -1);
      updateInputDisplay();
    } else if (value === "CE") {
      // Vymaž vše
      input = "";
      updateInputDisplay();
      updateOutput("0");
    } else {
      // Přidej znak
      input += value;
      updateInputDisplay();
    }
  });
});

// Vymazání historie
document.getElementById("clear-history-btn").addEventListener("click", () => {
  historyDisplay.innerHTML = "";
});
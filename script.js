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

// Funkce pro zpracování vstupu
function handleInput(value) {
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
}

// Kliknutí na tlačítka
document.querySelectorAll(".calculator-buttons button").forEach((button) => {
  const value = button.getAttribute("value");
  if (!value) return;

  button.addEventListener("click", () => {
    handleInput(value);
  });
});

// Klávesnice (včetně Backspace jako "C")
document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (key === "Enter") key = "=";
  if (key === "Backspace") {
    handleInput("C");
    event.preventDefault(); // Zabrání prohlížeči smazat znak ve stránce
    return;
  }

  const allowedKeys = ["^", "(", ")", "/", "*", "-", "+", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "="];

  if (allowedKeys.includes(key)) {
    handleInput(key);
  }
});

// Vymazání historie
document.getElementById("clear-history-btn").addEventListener("click", () => {
  historyDisplay.innerHTML = "";
});

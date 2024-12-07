console.log("hello world!");

let num1 = "";
let num2 = "";
let operator = null;
let shouldResetDisplay = false;

const digits = document.querySelectorAll(".digit");

digits.forEach((button) => {
    button.addEventListener("click", () => {
        if (shouldResetDisplay) {
            clearDisplay();
            shouldResetDisplay = false;
        }

        console.log(button.textContent);

        digits.forEach((btn) => btn.classList.remove("clicked"));
        button.classList.add("clicked");

        if (operator === null) {
            // If the first number is being entered, replace "welcome!" with the number
            if (num1 === "") {
                num1 = button.textContent;
                updateDisplay(num1); // Update with the first number
            } else {
                num1 += button.textContent; // Append digits to the first number
                updateDisplay(num1); // Update the display with the new number
            }
        } else {
            num2 += button.textContent; // Append digits to the second number
            updateDisplay(num1 + " " + operator + " " + num2); // Update display with operator and second number
        }
    });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.textContent);

        operators.forEach((btn) => btn.classList.remove("clicked"));
        button.classList.add("clicked");

        if (num1 !== "" && num2 === "") {
            // Set the operator only if the first number is entered
            operator = button.textContent;
            updateDisplay(num1 + " " + operator); // Show the operator on the display
        }
    });
});

document.querySelector(".enter").addEventListener("click", () => {
    if (operator === null || num2 === "") return;

    const result = operate(Number(num1), operator, Number(num2));
    updateDisplay(num1 + " " + operator + " " + num2 + " = " + result);

    // Reset for next calculation
    num1 = result.toString();
    num2 = "";
    operator = null;
    shouldResetDisplay = true;
});

function addition(num1, num2) {
    return num1 + num2;
}

function subtraction(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    if (num2 === 0) {
        shouldResetDisplay = true;
        return "Error: Division by zero";
    }
    return num1 / num2;
}



function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return addition(num1, num2);
        case "-":
            return subtraction(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return division(num1, num2);

        default:
            return "Error: Invalid operator";
    }
}

function updateDisplay(value) {
    const display = document.querySelector("#display");
    
    if (shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }

    if (typeof value === "string" && value.startsWith("Error")) {
        display.textContent = value; // Show error message
    } else {
        display.textContent = value; // Show the current input or result
    }
}

function clearDisplay() {
    const display = document.querySelector("#display");
    display.textContent = "";
}

document.querySelector(".delete").addEventListener("click", () => {
    const display = document.querySelector("#display");
    display.textContent = display.textContent.slice(0, -1);

    if (operator === null) {
        num1 = num1.slice(0, -1);
    } else if (num2 !== "") {
        num2 = num2.slice(0, -1);
    } else {
        operator = null;
    }
});

document.querySelector(".clear").addEventListener("click", () => {
    clearDisplay();
    num1 = "";
    num2 = "";
    operator = null;
    shouldResetDisplay = false;
});

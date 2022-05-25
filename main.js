//variables

let currentDisplayValue = document.querySelector(".current-value");
let prevEquation = document.querySelector(".prev-equation");
let numBtns = document.querySelectorAll(".calc-num-btn");
let operatorBtns = document.querySelectorAll(".calc-operator-btn");
let equalsBtn = document.querySelector(".calc-equals-btn");
let clearBtn = document.querySelector(".clear-btn");
let deleteBtn = document.querySelector(".delete-btn");
let operator = "";
let prevValue = "";
let currentValue = "";
let currentTotal = "";

// functions

function add(num1, num2) {
  return Number(num1 + num2);
}

function subtract(num1, num2) {
  return Number(num1 - num2);
}

function multiply(num1, num2) {
  return Number(num1 * num2);
}

function divide(num1, num2) {
  return Number(num1 / num2);
}

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  }
}

function handleNumClick(e) {
  if (currentValue.length < 13) {
    currentValue += e.target.textContent;
    currentDisplayValue.textContent = currentValue;
  }
}

function handleOperator(e) {
  prevValue = Number(prevValue);
  currentValue = Number(currentValue);
  currentTotal = Number(currentTotal);

  if (!prevValue || !operator) {
    operator = e.target.textContent;
    prevValue = currentValue;
    currentValue = "";
    currentDisplayValue.textContent = "0";
    prevEquation.textContent = `${prevValue} ${operator}`;
  } else if (!currentTotal) {
    currentTotal = operate(operator, prevValue, currentValue);
    operator = e.target.textContent;
    prevValue = currentValue;
    currentValue = "";
    currentDisplayValue.textContent = currentTotal;
    prevEquation.textContent = `${currentTotal} ${operator}`;
  } else if (currentTotal) {
    currentTotal = operate(operator, currentTotal, currentValue);
    operator = e.target.textContent;
    prevValue = currentValue;
    currentValue = "";
    currentDisplayValue.textContent = currentTotal;
    prevEquation.textContent = `${currentTotal} ${operator}`;
  }
}

function handleEquals(e) {
  prevValue = Number(prevValue);
  currentValue = Number(currentValue);
  currentTotal = Number(currentTotal);

  if (!currentTotal) {
    currentTotal = operate(operator, prevValue, currentValue);
    currentDisplayValue.textContent = currentTotal;
    prevEquation.textContent = `${prevValue} ${operator} ${currentValue} =`;
  } else {
    prevEquation.textContent = `${currentTotal} ${operator} ${currentValue} =`;
    currentTotal = operate(operator, currentTotal, currentValue);

    prevValue = currentTotal;

    currentDisplayValue.textContent = currentTotal;

    operator = "";

    console.log("prev value:", prevValue);
    console.log("current operator:", operator);
    console.log("current value:", currentValue);
    console.log("current total:", currentTotal);
  }
}

function handleClear(e) {
  operator = "";
  prevValue = "";
  currentValue = "";
  currentTotal = "";

  currentDisplayValue.textContent = "0";
  prevEquation.textContent = "";
}

function handleDelete(e) {
  if ((currentValue.length = 1)) {
    currentValue = "0";
    currentDisplayValue.textContent = currentValue;
  } else {
    currentValue = currentValue.substring(0, currentValue.length - 1);
    currentDisplayValue.textContent = currentValue;
  }
}

//event listeners

numBtns.forEach((btn) => {
  btn.addEventListener("click", handleNumClick);
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", handleOperator);
});

equalsBtn.addEventListener("click", handleEquals);

clearBtn.addEventListener("click", handleClear);

deleteBtn.addEventListener("click", handleDelete);

// console.log("prev value:", prevValue);
// console.log("current operator:", operator);
// console.log("current value:", currentValue);
// console.log("current total:", currentTotal);

// when hitting two perators then equals the last opertor runs on the sum

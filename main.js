//variables

let currentDisplayNum = document.querySelector(".current-value");
let prevDisplayNum = document.querySelector(".prev-equation");
let numBtns = document.querySelectorAll(".calc-num-btn");
let operatorBtns = document.querySelectorAll(".calc-operator-btn");
let equalsBtn = document.querySelector(".calc-equals-btn");
let clearBtn = document.querySelector(".clear-btn");
let deleteBtn = document.querySelector(".delete-btn");
let currentOperator = "";
let prevNum = "";
let currentNum = "";

//event listeners

numBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNum(e.target.textContent);
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

equalsBtn.addEventListener("click", handleEquals);
clearBtn.addEventListener("click", handleClear);
deleteBtn.addEventListener("click", handleDelete);

// functions

function updateDisplay() {
  currentDisplayNum.textContent = currentNum;
  prevDisplayNum.textContent = `${prevNum} ${currentOperator}`;
}

function handleNum(num) {
  if (currentNum.length > 12) {
    return;
  }

  currentNum += num;
  updateDisplay();
}

function handleOperator(operator) {
  if (prevNum) {
    handleEquals();
  }

  currentOperator = operator;
  prevNum = currentNum;
  currentNum = "";

  updateDisplay();
}

function handleEquals() {
  let total;
  let num1 = Number(prevNum);
  let num2 = Number(currentNum);

  if (currentOperator === "/") {
    total = num1 / num2;
  } else if (currentOperator === "*") {
    total = num1 * num2;
  } else if (currentOperator === "-") {
    total = num1 - num2;
  } else if (currentOperator === "+") {
    total = num1 + num2;
  }

  currentNum = total;
  currentOperator = "";
  prevNum = "";
  updateDisplay();
}

function handleClear() {
  currentOperator = "";
  currentNum = "";
  prevNum = "";
  updateDisplay();
}

function handleDelete() {
  currentNum = currentNum.slice(0, -1);
  updateDisplay();
}

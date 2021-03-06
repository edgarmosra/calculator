//variables

let currentDisplayNum = document.querySelector(".current-value");
let prevDisplayNum = document.querySelector(".prev-equation");
let numBtns = document.querySelectorAll(".calc-num-btn");
let operatorBtns = document.querySelectorAll(".calc-operator-btn");
let equalsBtn = document.querySelector(".calc-equals-btn");
let clearBtn = document.querySelector(".clear-btn");
let deleteBtn = document.querySelector(".delete-btn");
let cursor = document.getElementById("cursor");
let currentOperator = "";
let prevNum = "";
let currentNum = "";

const colors = ["red", "green", "yellow", "orange", "teal", "lime"];

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

function handleColorChange() {
  cursor.style.setProperty(
    "--color",
    colors[Math.floor(Math.random() * colors.length)]
  );
}

function updateDisplay() {
  currentDisplayNum.textContent = currentNum;
  prevDisplayNum.textContent = `${prevNum} ${currentOperator}`;
}

function handleNum(num) {
  if (currentNum.length > 12) {
    return;
  }
  if (num === "." && currentNum.includes(".")) {
    return;
  }

  currentNum += num;
  handleColorChange();
  updateDisplay();

  console.log({ currentNum });
  console.log(currentDisplayNum.textContent);
}

function handleOperator(operator) {
  if (!currentNum) {
    return;
  }
  if (prevNum) {
    handleEquals();
  }

  currentOperator = operator;
  prevNum = currentNum;
  currentNum = "";

  handleColorChange();
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

  if (total % 1 != 0) {
    currentNum = total.toFixed(1);
  } else {
    currentNum = total;
  }

  currentOperator = "";
  prevNum = "";
  handleColorChange();
  updateDisplay();

  // console.log("current operator:", currentOperator);
  // console.log("current num:", currentNum);
  // console.log("prev num:", prevNum);
}

function handleClear() {
  currentOperator = "";
  currentNum = "";
  prevNum = "";
  handleColorChange();
  updateDisplay();
}

function handleDelete() {
  currentNum = currentNum.slice(0, -1);
  handleColorChange();
  updateDisplay();
}

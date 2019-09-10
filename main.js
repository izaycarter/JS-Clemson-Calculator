// starts calculator with 0 and empty sections fo 3 inputs
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function $pushNumber(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
// overrides if displayValue is "0" other wise add to it
  else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) return;

  // If the displayValue does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Add the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

 //
  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand = secondOperand
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// any time operation is preformed can go back to 0
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();
const buttons = document.querySelector('.calculator-buttons');


// targets the button and if click isn't button then exits early
 buttons.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }



// targets operator then returns it to screen
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
		updateDisplay();
    return;
  }



// targets decimal then returns it to screen
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
		updateDisplay();
    return;
  }

// clears entire screen
  if (target.classList.contains('all-clear')) {
    resetCalculator();
		updateDisplay();
    return;
  }

// shows result then alowed to be cleared
  $pushNumber(target.value);
  updateDisplay();
});

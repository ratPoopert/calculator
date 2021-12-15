import * as operations from './operations.js';

const MAX_DISPLAY_WIDTH = 11;

const updateDisplay = value => $display.textContent = value;
const setOperand = value => parseFloat(value);

let currentValue;
let operand1;
let operand2;
let operator;
let solution;
let overwriteDisplay = true;

const $display = document.getElementById('display-text');
const $numberButtons = Array.from(document.querySelectorAll('.number-button'));
const $dotButton = document.getElementById('dot-button');
const $operatorButtons = Array.from(document.querySelectorAll('.operator-button'));
const $equalsButton = document.getElementById('equals-button');
const $onButton = document.getElementById('on-button');
const $toggleNegButton = document.getElementById('toggle-neg-button');

const evaluateExpression = () => {
    operand2 = setOperand(currentValue);
    solution = parseFloat(operations.operate([operand1, operand2], operator));
    solution = solution.toFixed(2).replace(/[.,]0+$/, '');
    if (solution.toString().length > MAX_DISPLAY_WIDTH) { solution = parseFloat(solution).toExponential(2) }
    console.log(`Solution: ${solution}`);
    currentValue = solution;
    updateDisplay(currentValue);
    operand1 = setOperand(currentValue);
    operand2 = undefined;
    operator = undefined;
    overwriteDisplay = true;
    $dotButton.disabled = false;
};


$numberButtons.forEach( numberButton => 
    numberButton.addEventListener('click', e => {
    if (overwriteDisplay) {
        currentValue = e.target.value;
        updateDisplay(currentValue);
        overwriteDisplay = false;
    }
    else if (e.target.id === 'dot-button') {
        e.target.disabled = true;
        currentValue += e.target.value;
    }
    else if ($display.textContent.length < MAX_DISPLAY_WIDTH) {
        currentValue += e.target.value;;
    }
    updateDisplay(currentValue);
}));

$operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', e => {
    if (operator) {
        evaluateExpression()
    } else {
        operand1 = setOperand(currentValue);
    }
    switch (e.target.value) {
        case 'add': operator = operations.add; break;
        case 'subtract': operator = operations.subtract; break;
        case 'multiply': operator = operations.multiply; break;
        case 'divide': operator = operations.divide; break;
    }
    overwriteDisplay = true;
    $dotButton.disabled = false;
}));

$equalsButton.addEventListener('click', e => {
    evaluateExpression();
})

$onButton.addEventListener('click', e => {
    const clearMem = () => {
        operand1 = undefined;
        operand2 = undefined;
        operator = undefined;
    }

    if (overwriteDisplay) {clearMem()}
    currentValue = '0';
    overwriteDisplay = true;
    $dotButton.disabled = false;
    updateDisplay(currentValue);
});

$toggleNegButton.addEventListener('click', () => {
    const minusRegEx = /^[-]/;
    
    currentValue.match(minusRegEx)
    ? currentValue = currentValue.replace('-', '')
    : currentValue = `-${currentValue}`;
    
    updateDisplay(currentValue);
});
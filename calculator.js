class Calculator {
    
    constructor(displayTextElement) {
        this.displayTextElement = displayTextElement;
        this.clearMemory();
        this.clearDisplay();
    }
    
    MAX_DISPLAY_WIDTH = 11;

    appendNumber(number) {
        if (this.currentValue.length >= this.MAX_DISPLAY_WIDTH) return;
        if (number === '.' && this.currentValue.includes('.')) return;
        
        if (this.overwriteDisplay === true) {
            this.currentValue = number.toString();
            this.overwriteDisplay = false;
        } else {
            this.currentValue = this.currentValue.toString() + number.toString();
        }
    }

    clearDisplay() {
        this.displayTextElement.textContent = "0";
        if (this.overwriteDisplay) this.clearMemory();
        this.overwriteDisplay = true;
    }
    
    clearMemory() {
        this.operator = undefined;
        this.currentValue = '';
        this.previousValue = '';
    }
    
    evaluateExpression(){
        let result;
        const previousOperand = parseFloat(this.previousValue);
        const currentOperand = parseFloat(this.currentValue);
        if (isNaN(previousOperand) || isNaN(currentOperand)) return;
        switch (this.operator) {
            case 'add': result = previousOperand + currentOperand; break;
            case 'subtract': result = previousOperand - currentOperand; break;
            case 'multiply': result = previousOperand * currentOperand; break;
            case 'divide': {
                if (currentOperand === 0) {result = "!GOD"}
                else {result = previousOperand / currentOperand;} 
                break;
            }
            case 'mod': result = previousOperand % currentOperand; break;
            default: return;
        }
        if (result === "!GOD") {this.currentValue = result}
        else {
            result.toFixed(2).replace(/[.,]0+$/, '')
            this.currentValue = result;
        }
        this.updateDisplay();
        this.operator = undefined;
        this.previousValue = '';
        this.overwriteDisplay = true;
    }
    
    setOperator(operator) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.evaluateExpression();
        }
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '';
        this.overwriteDisplay = true;
    }

    getSquareRoot() {
        if (this.currentValue === "0") return;
        this.currentValue = Math.sqrt(parseFloat(this.currentValue));
        this.overwriteDisplay = true;
        this.updateDisplay();
    }

    toggleNegative() {
        if (this.overwriteDisplay === true) return;
        if (this.currentValue.includes('-')) {this.currentValue = this.currentValue.replace('-', '')}
        else {this.currentValue = `-${this.currentValue}`}

        this.updateDisplay();
    }

    updateDisplay() {
        if (this.currentValue.toString().length > this.MAX_DISPLAY_WIDTH) {
            this.currentValue = parseFloat(this.currentValue).toExponential(2)
        }
        this.displayTextElement.textContent = this.currentValue;
    }
}

const $clearMemButton = document.getElementById('clear-mem-button');
const $memAddButton = document.getElementById('mem-add-button');
const $memRemoveButton  = document.getElementById('mem-remove-button');
const $displayText = document.getElementById('display-text');
const $numberButtons = Array.from(document.querySelectorAll('.number-button'));
const $operatorButtons = Array.from(document.querySelectorAll('.operator-button'));
const $equalsButton = document.getElementById('equals-button');
const $modButton = document.getElementById('mod-button');
const $onButton = document.getElementById('on-button');
const $sqrtButton = document.getElementById('sqrt-button');
const $toggleNegButton = document.getElementById('toggle-neg-button');

const calculator = new Calculator($displayText)

$clearMemButton.addEventListener('click', () => {
    calculator.currentValue = "I REMEMBER";
    calculator.updateDisplay();
    calculator.overwriteDisplay = true;
})

$equalsButton.addEventListener('click', () => {
    if (calculator.currentValue === '') return;
    calculator.evaluateExpression();
    calculator.updateDisplay();
});

$memAddButton.addEventListener('click', () => {
    calculator.currentValue = "I LEARN";
    calculator.updateDisplay();
    calculator.overwriteDisplay = true;
});

$memRemoveButton.addEventListener('click', () => {
    calculator.currentValue = "I FORGET";
    calculator.updateDisplay();
    calculator.overwriteDisplay = true;
});

$modButton.addEventListener('click', () => {
    calculator.setOperator('mod');
});

$numberButtons.forEach( numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.value);
        calculator.updateDisplay();
    });
});

$onButton.addEventListener('click', () => {
    calculator.clearDisplay();
});

$operatorButtons.forEach( operatorButton => {
    operatorButton.addEventListener('click', () => {
        calculator.setOperator(operatorButton.value);
    });
});

$sqrtButton.addEventListener('click', () => {
    calculator.getSquareRoot();
});

$toggleNegButton.addEventListener('click', () => {
    calculator.toggleNegative();
});
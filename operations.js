
const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => y === 0
? "u != g0d"
: x / y;

const operands = (x, y) => 
[x, y].filter( operand => (typeof(operand) === "number"));

const operate = (operands, operator) => operands.reduce(operator);

export {add, subtract, multiply, divide, operands, operate};
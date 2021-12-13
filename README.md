# calculator

A simple calculator.

This calculator is written according to the Calculator project specifications outlined in The Odin Project's Foundations course. click [here](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator) to see the original specifications.

## Supported Mathematical Operations

* Addition
* Subtraction
* Multiplication
* Division

## Logic

The `operate(operator, x, y)` function captures the desired operation and passes the specified numbers to the operation's function.

## User Interface

### Inputs

* Buttons for number 0-9. 
  * Pressing these buttons before an operator has been selected appends their value to a string variable, `numberA`. 
  * Pressing these buttons after an operator has been selected appends their value to a string variable, `numberB`.
* Buttons for each of the mathematical operations.
  * Pressing these buttons assigns their value to a string value, `operator`.
  * The operator buttons are disabled until a value has been assigned to `numberA`.
  * After an operator has been selected, the operator buttons are disabled until a value has been assigned to `numberB`.
  * If an operator is selected after a value has been assigned to `numberB`, the `operate(operator, numberA, numberB)` function is called and its value assigned to the variable `result`.
  * Pressing additional numbers will add them to `numberB`.
  * This process continues until the **Equals** button is pressed, upon which the `operate(operator, result, numberB)` function is called and the result displayed.
* An **Equals** button which, calls the `operate(operator, numberA, numberB)` function and assigns its result to the variable `result` and displays the result.
  * Pressing a number after the **Equals** button is pressed clears the caclulator's memory and the process starts again.
  * Pressing an operator after the **Equals** button is pressed stores the operator selected. Numbers pressed after the operator is selected are added to `numberB`.

### Display

* As the number buttons are pressed, their value will be displayed in large text.
* When a number button is pressed after an operator is selected, the value of the selected numbers will replace the numbers selected prior to the operator's selection.

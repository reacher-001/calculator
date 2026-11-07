//functions to return results of operations
function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}
//function to call main operational functions
function operate(operator, num1, num2) {
    switch(operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default:  return "some error occured";
    }
}
//function to handle a digit click
function clickDigit(target) {
    const content = target.id;
    const display = document.querySelector("#display-text");
    //user pressed an operator or = -> clear the screen and start a new number on screen
    if(resetDisplay) {
        display.textContent = content;
    }
    //only a zero -> starting a new calculation/reset screeen
    else if(display.textContent === '0') {
        display.textContent = content;
    }
    //normally just append the typed digit to the current digit
    else {
        display.textContent += content;  
    }
}
//initializing core state variables
//operands
let firstOp = null;
let secondOp = null;
//operator
let operator = null;
//reset display flag
let resetDisplay = false;

//event listener on the entire keypad
let key = document.querySelector("#keypad");
key.addEventListener('click',(e) => {
    const target = e.target.closest('button');
    //checking if the click generated on the borders/padding
    if(!target) return;
    //else
    //1. Entering digit
    if(target.classList.contains('digit')) {
        clickDigit(target);
    }
});
//clicking digits

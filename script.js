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
    //user pressed an operator or equalto before this click -> clear the screen and start a new number on screen
    if(resetDisplay) {
        display.textContent = content;
        resetDisplay = false;
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

//function to handle operator click
function clickOperator(target) {
    const display = document.querySelector("#display-text");
    //handling +,-,*,/
    if(target.id != "equalto" && target.id != "clear-screen") {
        //1. User wants to change operator 
        // operator correction (prev operator press flipped resetDisplay to true) -> user changed mind
        if(operator != null && resetDisplay == true) {
            operator = selectOperator(target);
        }
        //2. User input is not the first operator
        //operator chaining -> 57 + 23 + 5 + ...
        else if(operator != null && resetDisplay == false) {
            //set second operand
            secondOp = Number(display.textContent);
            //call operate function 
            let result = operate(operator, firstOp, secondOp);
            //update display to show result of previous operation
            display.textContent = result.toString();
            //store result in firstOp for next operation
            firstOp = result;
            //store the chosen operator
            operator = selectOperator(target);
        }
        
        //3. User entered first operator(starting of calculation)
        else {//(operator == null)
            //set first operand
            firstOp = Number(display.textContent);
            //store the chosen operator
            operator = selectOperator(target);
        }
        //reset display for next operand input
        resetDisplay = true;
    }
    //handling =(equalto)
    else if(target.id === "equalto") {
        //check if operator present and second operand has been provided
        if(operator == null || resetDisplay == true) return;
        //else 
        const display = document.querySelector("#display-text");
        //set second operand
        secondOp = Number(display.textContent);
        //caluclate result
        let result = operate(operator, firstOp, secondOp);
        //display result on screen
        display.textContent = result.toString();
        //set clearDisplay to true for enterning the next operand
        resetDisplay = true;
        //clear the previous operator
        operator = null;
        //set firstOp to result for next calculation
        firstOp = result;
    }
}

//function to select operator based on ID
function selectOperator(target) {
    switch(target.id) {
        case 'add': return '+';
        break;
        case 'subtract': return '-';
        break;
        case 'multiply': return '*';
        break;
        case 'divide': return '/';
        break;
        default: return 'invalid operator';
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
    //2. Choosing an operator
    else if(target.classList.contains('operator')) {
        clickOperator(target);
    }
});

// need to update total value on screen as user chains together operations
// need to convert large numbers exceeding length 15 to 10e15 format
//above already happens but theres a grey area that would ideally be taken care of i think 10e15 to 10e20
//need to add commas to numbers > 999
//need to add support for negative numbers

//calculator "state" object
let calculator = {
    total: '',
    running_total: '',
    current_int: '',
    operation: ''
}

//main functions, added to global scope for easier callback
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

// returns boolean to run as a check against returned results
const divide_by_zero = () => {
    if(calculator.operation === 'divide' && calculator.current_int === '0') {
        return true
    }else {
        return false
    }
}

//clears state object and resets screen
const handle_clear = () => {
    calculator.total = '';
    calculator.running_total = '';
    calculator.current_int = '';
    calculator.operation = '';
    update_screen('');
}

//handles evaluation via callback
//handles returned result appropriately
const operate = (callback, x, y) => {
    let result = window[callback](x, y); //easier callback method mentioned above...at least i believe this is easier way
    if(result % 1 !== 0 ) { result.toFixed(4).toString();}
    calculator.running_total = result.toString();

    if(divide_by_zero()) { calculator.running_total = 'ask siri...'};

    return update_screen(calculator.running_total);
}

//handles number keypresses and displaying to user
const handle_number_event = () => {
    const numbers = document.querySelectorAll('.number');

    numbers.forEach(number => {
        number.addEventListener('click', () => {
            if(number.textContent === '.' && calculator.current_int.includes('.')) return //82.201.3.4 eh

            calculator.current_int += number.textContent;
            if(calculator.current_int.length > 15) { return }

            console.log(calculator);
            update_screen(calculator.current_int);
        })
    })
}
handle_number_event();

//handles operator keypresses and flow that should follow
const handle_operator_event = () => {
    const operators = document.querySelectorAll('.operator');

    operators.forEach(operator => {
        operator.addEventListener('click', () => {
            // calculator.operation = '';
            // if(operator.value === 'subtract' && calculator.current_int === '') { //allows for negative numbers
            //     return update_screen(calculator.current_int += '-')
            // }

            if(calculator.current_int !== '' && calculator.running_total !== '') { //allows chaining
                operate(calculator.operation, parseFloat(calculator.running_total), parseFloat(calculator.current_int))
            }

            calculator.operation = operator.value;
            // if(calculator.operation === 'subtract' && calculator.running_total === '') {  }
            if(calculator.running_total === '') {calculator.running_total = calculator.current_int;}
            calculator.current_int = '';


            if(calculator.current_int === '' && operator.value === 'subtract' && calculator.running_total === '') {
                console.log('neg');
                calculator.current_int += '-';
                // update_screen('-');
                update_screen(calculator.current_int);
                console.log(calculator);
            } else if (calculator.current_int.includes('-') && operator.value === 'subtract'){
                calculator.operation = 'subtract';
            }


            update_screen('');
        })
    })
}
handle_operator_event();

//handles clear button keypress
const clear = () => {
    const clear_btn = document.querySelector('.clear');
    clear_btn.addEventListener('click', () => {
        handle_clear();
    });
}
clear();

//updates screen given a certain value
const update_screen = (value) => {
    const screen = document.querySelector('.screen');
    const str = value;
    // if(str.length > 15) { str.substring(0, 15)};
    screen.innerHTML = str;
}

//handles enter key press and logic to follow
const handle_enter = () => {
    const enter = document.querySelector('.enter');
    enter.addEventListener('click', () => { //this seems too messy
        if(calculator.running_total === '' || calculator.current_int === '') return //can't evaluate a number and an empty string - "no number" - together
        const previous = calculator.running_total;
        const current = calculator.current_int;
        const operation = calculator.operation;

        operate(operation, parseFloat(previous), parseFloat(current));

        calculator.current_int = '';
        calculator.operation = '';
    })
}
handle_enter();

const undo = () => {
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Backspace') {
            let str = calculator.current_int.substring(0, calculator.current_int.length -1);
            calculator.current_int = str;
            update_screen(str);
        }
    })
}
undo();

//absolutely nothing right now
document.addEventListener('DOMContentLoaded', () => {
    console.log('start');
})
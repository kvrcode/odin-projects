// need to convert large numbers exceeding length 15 to 10e15 format
//above already happens but theres a grey area that would ideally be taken care of i think 10e15 to 10e20
//need to add commas to numbers > 999

//calculator "state" object
let calculator = {
    total: '',
    running_total: '',
    current_int: '0',
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

//resets state object values to default and resets screen
const handle_clear = (callback) => {
    calculator.total = '';
    calculator.running_total = '';
    calculator.current_int = '0';
    calculator.operation = '';
    callback(calculator.current_int);
}

// returns boolean to run as a check against returned results
const divide_by_zero = () => {
    if(calculator.operation === 'divide' && calculator.current_int === '0') {
        return true
    }else {
        return false
    }
}

//handles evaluation via callback
//handles returned result appropriately
const operate = (callback, x, y) => {
    let result = window[callback](x, y); //easier callback method mentioned above...at least i believe this is easier way
    if(result % 1 !== 0 ) { result = result.toFixed(4) }
    calculator.running_total = result.toString();

    if(divide_by_zero()) { calculator.running_total = 'ask siri...'};

    return update_screen(calculator.running_total);
}

const number_callback = (number) => {
    if(number.textContent === '.' && calculator.current_int.includes('.')) return //82.201.3.4 not trying to multiply ip addresses
    if(number.textContent === '0' && calculator.current_int === '0') return //doesnt allow '00...'
    
    if(calculator.current_int === '0' && number.textContent === '.' ) { //allows decimals to appear as 0.5, or et cetera
        calculator.current_int += number.textContent;
    } else if (calculator.current_int === '0') { //when entering integers, replaces '0' placeholder
        calculator.current_int = number.textContent;
    } else { //normal behavior, "copies" entered numbers as expected
        calculator.current_int += number.textContent;
    }
    if(calculator.current_int.length > 15) { return } //limits length of numbers

    update_screen(calculator.current_int);
}

const operator_callback = (operator) => {
    if(calculator.current_int !== '' && calculator.running_total !== '') { //allows chaining
        operate(calculator.operation, parseFloat(calculator.running_total), parseFloat(calculator.current_int))
    }

    calculator.operation = operator.value;

    if(calculator.running_total === '') {calculator.running_total = calculator.current_int;}
    calculator.current_int = '';

    update_screen(calculator.running_total); //useful when chaining to show your total as you continue
    // update_screen(''); //just show a blank screen until you press enter..?
}

const enter_callback = () => {
    if(calculator.running_total === '' || calculator.current_int === '') return //can't evaluate a number and an empty string - "no number" - together

    const previous = calculator.running_total;
    const current = calculator.current_int;
    const operation = calculator.operation;

    operate(operation, parseFloat(previous), parseFloat(current));

    calculator.current_int = ''; //resets current int to blank, if chaining, running total is stored in calculator.running_total
    calculator.operation = ''; //resets operation to default
}

const toggle_negative_callback = () => {
    if(calculator.current_int === '0') return //no -0

    if (!calculator.current_int.includes('-')) { //if not negative, add negative sign
        calculator.current_int = '-' + calculator.current_int;
        update_screen(calculator.current_int);
    } else if (calculator.current_int.split('')[0] === '-') { //if negative, remove negative sign
        calculator.current_int = calculator.current_int.substring(1);
        update_screen(calculator.current_int);
    }
}

//handles number keypresses and displaying to user
const handle_number_event = () => {
    const numbers = document.querySelectorAll('.number');

    numbers.forEach(number => {
        number.addEventListener('click', () => number_callback(number));
    })
}
handle_number_event();

//handles operator keypresses and flow that should follow
const handle_operator_event = () => {
    const operators = document.querySelectorAll('.operator');

    operators.forEach(operator => {
        operator.addEventListener('click', () => operator_callback(operator));
    })
}
handle_operator_event();

//handles enter key press and logic to follow
const handle_enter = () => {
    const enter = document.querySelector('.enter');
    enter.addEventListener('click', enter_callback);
}
handle_enter();


const toggle_negative_number = () => {
    const negative = document.querySelector('.negative');
    negative.addEventListener('click', toggle_negative_callback);
}
toggle_negative_number();

//handles clear button keypress
const clear = () => {
    const clear_btn = document.querySelector('.clear');
    clear_btn.addEventListener('click', () => {
        handle_clear(update_screen);
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

document.addEventListener('DOMContentLoaded', () => {
    update_screen(calculator.current_int);
})

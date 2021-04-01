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

//just saving the world...
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

//handles evaluation
const operate = (callback, x, y) => {
    let result = window[callback](x, y); //easier callback method mentioned above...at least i believe this is easier way
    if(divide_by_zero()) { result = 'ask siri...'};
    calculator.running_total = result.toFixed(4).toString();
    update_screen(calculator.running_total);
    // return result;
}

//handles number keypresses and displaying to user
const handle_number_event = () => {
    const numbers = document.querySelectorAll('.number');
    
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            if(number.textContent === '.' && calculator.current_int.includes('.')) return //82.201.3.4 probably not a number
            // if(calculator.running_total !== '') 
            calculator.current_int += number.textContent;
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
            calculator.operation = operator.value;
            if(calculator.current_int === '') return //cant operate on no number

            if(calculator.current_int !== '' && calculator.running_total !== '') {
                operate(calculator.operation, parseFloat(calculator.running_total), parseFloat(calculator.current_int))
            }
            if(calculator.running_total === '') {calculator.running_total = calculator.current_int;}
            calculator.current_int = '';
            console.log(calculator);
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
    screen.innerHTML = value;
}

//handles enter key press and logic to follow
const handle_enter = () => {
    const enter = document.querySelector('.enter');
    enter.addEventListener('click', () => {
        if(calculator.running_total === '' || calculator.current_int === '') return //can't evaluate a number and an empty string - "no number" - together
        const previous = calculator.running_total;
        const current = calculator.current_int;
        const operation = calculator.operation;
        // console.log(x, y);
        operate(operation, parseFloat(previous), parseFloat(current));
        calculator.current_int = '';
        calculator.operation = '';
        console.log(calculator);
    })
}
handle_enter();

//absolutely nothing right now
document.addEventListener('DOMContentLoaded', () => {
    console.log('start');
})
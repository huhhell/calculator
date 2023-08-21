let expField = document.querySelector('.app__show-exp');
let resultField = document.querySelector('.app__show-number')
let firstNumber;
let secondNumber;
let sign;

// write expression
let numberButtons = document.querySelectorAll('.button-number');
let operatorButtons = document.querySelectorAll('.button-operator');
numberButtons.forEach((item) => item.addEventListener('click', writeExpression));
operatorButtons.forEach((item) => item.addEventListener('click', writeExpression));

function writeExpression(e) {
    if (e.target.classList.contains('button-operator')) {
        expField.innerHTML += ` ${e.target.innerHTML} `
    }

    if (e.target.classList.contains('button-number')) {
        expField.innerHTML += e.target.innerHTML;
    }
}

// reset calculator
let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetCalculator);

function resetCalculator() {
    expField.innerHTML = '';
    resultField.innerHTML = '';
    firstNumber = undefined;
    secondNumber = undefined;
}

// delete last sign
let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', deleteSign);

function deleteSign() {
    let array = expField.innerHTML.split('');
    let popped = array.pop();
    if (popped === ' ')  {
        array.pop();
        array.pop();
    }

    expField.innerHTML = array.join('');
}

// count result
let errorField = document.querySelector('.app__error');
let doneButton = document.querySelector('#done');
doneButton.addEventListener('click', countResult)

function countResult() {
    let exp = expField.innerHTML.split(' ');
    firstNumber = exp[0];
    secondNumber = exp[2];
    sign = exp[1];
    if(!isCorrect()) return;

    let result;
    switch (sign) {
        case '+': result = +firstNumber + +secondNumber; break;
        case '-': result = +firstNumber - +secondNumber; break;
        case '*': result = +firstNumber * +secondNumber; break;
        case '/': result = +firstNumber / +secondNumber; break;
    }
    resultField.innerHTML = Math.round10(result, -3);
}


// check if all is exists
function isCorrect() {
    if (!firstNumber || !sign || !secondNumber) {
        errorField.innerHTML = 'wrong expression';
        return false;
    }
    errorField.innerHTML = '';
    return true
}

// rounding
function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === "undefined" || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    // Обратный сдвиг
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

if (!Math.round10) {
    Math.round10 = function (value, exp) {
        return decimalAdjust("round", value, exp);
    };
}
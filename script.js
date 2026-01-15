"use strict";

let a = null;
let b = null;
let operatorSymbol = 0;

function sum(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(a, b, operatorSymbol) {
    switch (operatorSymbol) {
        case 0:
            break;
        case 1:
            sum(a, b);
            break;
        case 2:
            subtract(a, b);
            break;
        case 3:
            multiply(a, b);
            break;
        case 4:
            divide(a, b);
            break;
    };
};

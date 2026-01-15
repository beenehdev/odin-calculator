"use strict";

let a = NaN;
let b = NaN;
let operatorSymbol = NaN;

function tryOperate {
    if (!Number.isNaN(a) && !Number.isNaN(b) && !Number.isNaN(operatorSymbol)) {
        operate(a, b, operatorSymbol);
    } else {
        b = NaN;
        operatorSymbol = NaN;
    };
};

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
            a = sum(a, b);
            break;
        case 2:
            a = subtract(a, b);
            break;
        case 3:
            a = multiply(a, b);
            break;
        case 4:
            a = divide(a, b);
            break;
    };
    res = a;
    b = NaN;
    operatorSymbol = NaN; 
    return res;
};
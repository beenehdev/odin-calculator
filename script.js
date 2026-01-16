"use strict";

let state = {
    a: null,
    b: null,
    operatorSymbol: null,
    res: null,
};

function tryOperate() {
    if (state.a !== null && state.b !== null && state.operatorSymbol !== null) {
        operate(state.a, state.b, state.operatorSymbol);
    } else {
        alert("Incomplete Expression!");
        state = {
            a: null,
            b: null,
            operatorSymbol: null,

        };
    };
};

const mathWrapper = {
    sum(a, b) {
        return state.a + state.b;
    },

    subtract(a, b) {
        return state.a - state.b;
    },

    multiply(a, b) {
        return state.a * state.b;
    },

    divide(a, b) {
        return state.a / state.b;
    },
};

function operate(a, b, operatorSymbol) {
    switch (operatorSymbol) {
        case "+":
            state.a = mathWrapper.sum(state.a, state.b);
            break;
        case "-":
            state.a = mathWrapper.subtract(state.a, state.b);
            break;
        case "*":
            state.a = mathWrapper.multiply(state.a, state.b);
            break;
        case "/":
            state.a = mathWrapper.divide(state.a, state.b);
            break;
        default:
            break;
    };
    state.res = state.a;
    state.b = null;
    state.operatorSymbol = null; 
    console.log(state.res);
    return state.res;
};

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
//   button.addEventListener("keyup", handleKeyup);
// //  FOR Keyboard extension
});

function handleClick() {
    let value = this.id;
    console.log(value);
    if (isWrapper.isNumber(value)) {
        stateHandler.numStateHandler(value);
    // } else if (isWrapper.isDecimal(value)) {
    // // Not implemented yet?
    } else if (isWrapper.isExpression(value)) {
        stateHandler.expressionStateHandler(value);
    } else if (isWrapper.isEquals(value)) {
        tryOperate();
    } else if (isWrapper.isBackspace(value)) {
        stateHandler.backspaceStateHandler;
    } else if (isWrapper.isClearEntry(value)) {
        stateHandler.clearEntryStateHandler;
    } else {
        console.warn("Unhandled input:", value);
        return;
    };
};

const stateHandler = {
    numStateHandler(value) {
        if (state.a === null) {
            state.a = "";
            state.a += value;
        } else if (state.operatorSymbol === null) {
            state.a += value;
        } else if (state.operatorSymbol !== null && state.b === null) {
            state.b = "";
            state.b += value;
        } else if (state.operatorSymbol !==null && state.b !== null) {
            state.b += value;
        } else {
            console.warn("Unexpected state in numStateHandler");
        };
    },

    expressionStateHandler(value) {
        if (state.operatorSymbol === null) {
            state.operatorSymbol = value;
        } else if (isExpression(state.operatorSymbol)) {
            state.operatorSymbol = value;
        } else {
            console.warn("Unexpected state in operatorStateHandler");
        };
    },

    backspaceStateHandler() {
        if (state.operatorSymbol !== null && state.b !== null) {
            state.b = state.b.slice(0, -1)
        } else if (state.operatorSymbol !== null && state.b === null) {
            state.operatorSymbol = null;
        } else if (state.operatorSymbol === null) {
            state.a = state.a.slice(0, -1);
        } else {
            console.warn("Unexpected state in backspaceStateHandler");
        }
    },

    clearEntryStateHandler() {
        state.a = null;
        state.b = null;
        state.operatorSymbol = null; 
    },
};

const isWrapper = {
    isNumber(value) {
        return !isNaN(value);
    },

    isDecimal(value) {
        return value === ".";
    },

    isExpression(value) {
        return ["+", "-", "*", "/"].includes(value);
    },

    isEquals(value) {
        return value === "=";
    },

    isBackspace(value) {
        return value === "backspace";
    },

    isClearEntry(value) {
        return value === "clearEntry";
    },
};

// function handleKeyup() {
// // In case I want to add keyboard support
//     return; 
// };
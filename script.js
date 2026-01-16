"use strict";

let state = {
    a: null,
    b: null,
    operatorSymbol: null,
    res: null,
};

let resultJustShown = false; 

let display = document.getElementById("display");
function updateDisplay() {
    display.textContent = `${state.a ?? ""}${state.operatorSymbol ?? ""}${state.b ?? ""}`.trim();
};

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function tryOperate() {
    if (state.a !== null && state.b !== null && state.operatorSymbol !== null) {
        state.a = Number(state.a);
        state.b = Number(state.b);
        operate(state.a, state.b, state.operatorSymbol);
    } else {
        console.log("Incomplete Expression!");
        state = {
            a: null,
            b: null,
            operatorSymbol: null,
        };
        updateDisplay();
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
        if (state.b === 0) {
            alert("One does not simply divide by zero");
            state.b = 1;
        }
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
    state.a = Math.round(state.a * 100) / 100
    state.b = null;
    state.operatorSymbol = null; 
    updateDisplay();
    resultJustShown = true;
    return state.a;
};

function handleClick() {
    let value = this.id;
    if (isWrapper.isNumber(value)) {
        stateHandler.numStateHandler(value);
    } else if (isWrapper.isDecimal(value)) {
        stateHandler.decimalStateHandler(value);
    } else if (isWrapper.isExpression(value)) {
        stateHandler.expressionStateHandler(value);
    } else if (isWrapper.isEquals(value)) {
        tryOperate();
    } else if (isWrapper.isBackspace(value)) {
        stateHandler.backspaceStateHandler();
    } else if (isWrapper.isClearEntry(value)) {
        stateHandler.clearEntryStateHandler();
    } else {
        console.warn("Unhandled input:", value);
        return;
    };
};

function checkRecentResult() {
    if (resultJustShown === true) {
        state.a = null;
        resultJustShown = false;
    };
};

const stateHandler = {
    numStateHandler(value) {
        checkRecentResult();
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
        updateDisplay();
    },

    decimalStateHandler(value) {
        if (state.a.indexOf(".") === -1) {
            stateHandler.numStateHandler(value);
        } else if (state.operatorSymbol !== null && state.b.indexOf(".") === -1) {
            stateHandler.numStateHandler(value);
        } else {
            console.log("Decimal already assigned!");
        };
    },

    expressionStateHandler(value) {
        if (state.operatorSymbol === null) {
            state.operatorSymbol = value;
        } else if (isWrapper.isExpression(state.operatorSymbol)) {
            let stateFreeze = state.a;
            tryOperate();
            if (state.a === null) {
                state.a = stateFreeze;
            };
            state.operatorSymbol = value;
        } else {
            console.warn("Unexpected state in operatorStateHandler");
        };
        updateDisplay();
    },

    backspaceStateHandler() {
        if (state.operatorSymbol !== null && state.b !== null) {
            state.b = state.b.slice(0, -1)
        } else if (state.operatorSymbol !== null && state.b === null) {
            state.operatorSymbol = null;
        } else if (state.operatorSymbol === null) {
            state.a = state.a.toString();
            state.a = state.a.slice(0, -1);
        } else {
            console.warn("Unexpected state in backspaceStateHandler");
        }
        updateDisplay();
    },

    clearEntryStateHandler() {
        state.a = null;
        state.b = null;
        state.operatorSymbol = null; 
        updateDisplay();
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
        return value == "backspace";
    },

    isClearEntry(value) {
        return value == "clearEntry";
    },
};
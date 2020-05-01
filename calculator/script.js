// add event listener to all buttons to get the last value and store it
const opButtons = document.querySelectorAll('.operator');
opButtons.forEach(button => button.addEventListener('click', storeValue));
const numButtons = document.querySelectorAll('.number');
numButtons.forEach(button => button.addEventListener('click',inputToScreen));


// assign constants
const screen = document.querySelector('#screen');
const youTyped = document.querySelector('#youTyped');
const clear = document.querySelector('#clear').addEventListener('click', clearInput);
const plusMinus = document.querySelector('#plusMinus').addEventListener('click', togglePositiveNegative);
const percentage = document.querySelector('#percentage').addEventListener('click', togglePercentage);
const divide = document.querySelector('#divide');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const mulitply = document.querySelector('#mulitply');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const minus = document.querySelector('#minus');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const plus = document.querySelector('#plus');
const zero = document.querySelector('#zero');
const period = document.querySelector('#period').addEventListener('click', inputToScreen);
const equals = document.querySelector('#equals').addEventListener('click', compute);

// operations
var operate =  {
   '+': function (x, y) { return x + y },
   '-': function (x, y) { return x - y },
   '÷': function (x, y) { return x / y },
   '*': function (x, y) { return x * y }
};
 
// clear input
function clearInput () {
  screen.value = '';
  valuesArray = [];
}

function togglePositiveNegative () {
    if (screen.value > 0) {
      screen.value = "-"+screen.value
      console.log(screen.value)
      return -Math.abs(screen.value)
    } else {
      return Math.abs(screen.value)
    }
}
function togglePercentage () {
    if (screen.value > 0) {
      screen.value = screen.value / 100
      console.log(screen.value) 
    } else { 
       screen.value = screen.value * 100
       console.log(screen.value) 
    }
}
// this will hold the input field values
function inputToScreen (period) { 
  screen.value += this.value; 
  if(this.value == '.') {
    document.querySelector('#period').removeEventListener('click', inputToScreen);
  }
  strLength = screen.value.length;
  console.log(typeof screen.value)
  console.log(screen.value.length)
  if (strLength > 9) {
    let number = screen.value
    number = Number(number)
    screen.value = number.toFixed(8) 
  }
  youTyped.innerHTML = screen.value  

}

function storeValue () {
  screen.value += this.value;
  document.querySelector('#period').addEventListener('click', inputToScreen);
}

let valuesArray = [];

function computeToArray () {
 let string = screen.value; 
  var copy = string;
  string = string.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
  var numbers = copy.split(/[^0-9\.]+/);
  var operators = string.split("#").filter(function(n){return n});
  // console.log("numbers " + numbers)
  // console.log("operators " + operators)
  for(i = 0; i < numbers.length; i++){
     valuesArray.push(numbers[i]);
     if (i < operators.length) valuesArray.push(operators[i]);
  }
}

// screen.value = "12+7-5*3" // 4
// screen.value = "3*3*3"
function compute () { 
 const screenValueHistory = screen.value 
  
  computeToArray();
  
  let xIndex = 0;
  let divIndex = 0;
  let addIndex = 0;
  let subtractIndex = 0;
  let mult1 = 0;
  let mult2 = 0;
  let beforeIndex = 0; 
  let afterIndex = 0;
  let operator = '';
  let result = 0;
  var i = 0;
  var arr = valuesArray

  var j = 0;
  while (valuesArray.indexOf("*") !== -1) {
    arr.map(function(val, idx, arr) {
      if (val == '*') {
        operator = val
        result = operate[operator](Number(arr[idx - 1]), Number(arr[idx + 1]));
        arr.splice((idx - 1), 3, result);
        console.log(arr)
      }
    })
  }
  while (valuesArray.indexOf("÷") !== -1) {
    arr.map(function(val, idx, arr) {
      if (val == '÷') {
        operator = val
        if (Number(arr[idx + 1]) === 0) {
          alert('Did you fail math class? Nothing is divisible by zero!');
          arr.splice((idx - 1), 3);
          result = '0 = No!No!'; 
          return;
        } else {
          result = operate[operator](Number(arr[idx - 1]), Number(arr[idx + 1]));
          arr.splice((idx - 1), 3, result);
          console.log(arr)
        }
      }
    })
  }
  if (arr.indexOf("*") === -1 || arr.indexOf("÷") === -1) { 
    while (valuesArray.indexOf("+") !== -1) {
      arr.map(function(val, idx, arr) {
        if (val == '+') {
          operator = val
          result = operate[operator](Number(arr[idx - 1]), Number(arr[idx + 1]));
          arr.splice((idx - 1), 3, result);
          console.log(arr);
        }
      })
    }
    while (arr.indexOf("-") !== -1) {
      arr.map(function(val, idx, arr) {
        if (val == '-') {
          operator = val
          result = operate[operator](Number(arr[idx - 1]), Number(arr[idx + 1]));
          arr.splice((idx - 1), 3, result);
          console.log(arr)
        }
      })
    }
  }
  screen.value = result
  youTyped.innerHTML = screenValueHistory + '=' + result
  valuesArray = [];
}
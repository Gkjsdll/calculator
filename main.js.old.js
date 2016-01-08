var savedVal = null;
var currentVal = 0;
var symbol = null;
var lastsymbol = null;
var ac = true;
var calcLoop = false;
var loopVal = null;
var num;

document.addEventListener('DOMContentLoaded', function(){
  var calcBtns = document.getElementsByClassName('calcBtn');
  var screenText = document.getElementById('screenText')
  var clearType = document.getElementById('clearType');
  for(var i = 0; i < calcBtns.length; i++){
    calcBtns[i].addEventListener('click', clickHandler);
  }
});

function clickHandler(){
  var button = this.id.substring(3);
  // console.log("screenText.innerHTML: "+screenText.innerHTML);
  console.log("button: "+button);
  // console.log("isNaN(button): " + isNaN(button));
  if(!isNaN(button)){
    button = parseInt(button);
    num = true;
  }
  // console.log(typeof button);
  switch (button) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    if(calcLoop){
      savedVal = currentVal;
      currentVal = 0;
    }
    loopVal = null;
    calcLoop = false;
    // console.log("symbol = "+symbol);
    break;
    case "Clear":
    ac = true;
    clearType.innerHTML = 'AC';
    clear();
    break;
    case "Add":
    savedVal = currentVal;
    if(loopVal === null) currentVal = 0;
    num = false;
    lastsymbol = symbol;
    symbol = "Add";
    break;
    case "Subtract":
    savedVal = currentVal;
    if(loopVal === null) currentVal = 0;
    num = false;
    lastsymbol = symbol;
    symbol = "Subtract";
    break;
    case "Equals":
    console.log("equals-symbol: "+symbol);
    calculate();
    break;
    default:
    alert("Not Yet Implemented.");
    break;
  }
  if(num && screenText.innerHTML.length < 8 && button !== "Equals"){

    processNum(button);
    if(ac){
      ac = !ac;
      clearType.innerHTML = 'C';
    }
  }
  // console.log(screenText.innerHTML.length);
  if(num) writeScreen(currentVal);
  console.log("currentVal: ",currentVal);
  console.log("savedVal: "+savedVal);
  console.log("loopVal: ",loopVal);
}

function calculate(){
  // alert("Expression calculated.");
  // console.log("loopval: "+loopVal);
  if(symbol != null){
    // console.log('symbol not null, symbol: '+symbol);
    if(symbol === "Add"){
      if(calcLoop === false){
        loopVal = currentVal;
        calcLoop = true;
        currentVal += savedVal;
      }
      else{
        currentVal += loopVal;
      }
      writeScreen(currentVal);
    }
    else if(symbol === "Subtract"){
        // console.log("subtract-loopval: "+loopVal);
      if(loopVal !== null){
        calcLoop = true;
        currentVal -= loopVal;
      }
      else{
          loopVal = currentVal;
          currentVal = savedVal - loopVal;
      }
      writeScreen(currentVal);
    }
    else if(symbol === "num"){

    }
  }
}

function processNum(num){
  if(num && screenText.innerHTML.length < 8){
    currentVal *= 10;
    currentVal += num;
  }
}

function writeScreen(input){
    screenText.innerHTML = input;
}

function clear(){
  currentVal = 0;
  loopVal = null;
  savedVal = null;
  calcLoop = false;
  num = false;
  writeScreen(currentVal);
}

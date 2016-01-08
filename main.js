var symbol = null;
var operation = null;
var currentVal = 0;
var savedVal = 0;
var decVal = 0;
var ac = true;
var writeDecimal = false;
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
  if(!isNaN(button)){
    button = parseInt(button);
    num = true;
  }
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
    symbol = "Num";
    if(writeDecimal){
      decVal = button;
    }
    if(symbol === null || symbol === "Num"){
      processNum(button);
      writeScreen(currentVal);
    }
    if(ac){
      ac = false;
      clearType.innerHTML = 'C';
    }
    break;

    case "Clear":
    ac = true;
    clearType.innerHTML = 'AC';
    clear();
    operation = null;
    writeDecimal = false;
    break;

    case "Add":
    if(operation !== null){
      calculate();
    }
    savedVal = currentVal;
    currentVal = 0;
    operation = "Add";
    symbol = "Add"
    writeDecimal = false;
    break;

    case "Subtract":
    if(operation !== null){
      calculate();
    }
    savedVal = currentVal;
    currentVal = 0;
    operation = "Subtract";
    symbol = "Subtract";
    writeDecimal = false;
    break;

    case "Multiply":
    if(operation !== null){
      calculate();
    }
    savedVal = currentVal;
    currentVal = 0;
    operation = "Multiply";
    symbol = "Multiply";
    writeDecimal = false;
    break;

    case "Divide":
    if(operation !== null){
      calculate();
    }
    savedVal = currentVal;
    currentVal = 0;
    operation = "Divide";
    symbol = "Divide";
    writeDecimal = false;
    break;

    case "Negate":
    currentVal *= -1;
    writeScreen(currentVal);
    break;

    case "Percent":
    currentVal = currentVal / 100;
    writeScreen(currentVal);
    break;

    case "Dot":
    writeDecimal = true;
    break;

    default:
    alert("Button not yet implemented");
    break;
  }
}

function processNum(num){
  if(screenText.innerHTML.length < 8 && !writeDecimal){
    currentVal *= 10;
    currentVal += num;
  }
  else if(screenText.innerHTML.length < 8){
    if(typeof currentVal === "number"){
      currentVal = currentVal+"."+decVal;
    }
    else{
      currentVal += decVal;
    }
  }
}

function writeScreen(input){
  var inStr = input.toString();
  var inLength = inStr.length;

  if(inLength > 8){
    if(inLength === 9 && inStr.includes('.')){
      screenText.innerHTML = input;
    }
    else{
      screenText.innerHTML = inStr.includes('.') ? inStr.substring(0,9) : inStr.subString(0,8);
    }
  }
  else{
    screenText.innerHTML = input;
  }
}

function clear(){
  currentVal = 0;
  savedVal = null;
  decVal = 0;
  writeDecimal = false;
  writeScreen(currentVal);
}

function calculate(){
  switch (operation) {

    case "Add":
    currentVal = currentVal + savedVal;
    writeScreen(currentVal);
    break;

    case "Subtract":
    currentVal = savedVal - currentVal;
    writeScreen(currentVal);
    break;

    case "Multiply":
    currentVal *= savedVal;
    writeScreen(currentVal);
    break;

    case "Divide":
    currentVal = savedVal / currentVal;
    writeScreen(currentVal);
    break;

    default:
    alert("Unassigned operation: "+operation);
    break;

  }
}

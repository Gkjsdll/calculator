var savedVal = null;
var currentVal = 0;
var symbol = null;
var ac = true;
var calcLoop = false;
var loopVal = null;

document.addEventListener('DOMContentLoaded', function(){
  var calcBtns = document.getElementsByClassName('calcBtn');
  var screenText = document.getElementById('screenText')
  var clearType = document.getElementById('clearType');
  for(var i = 0; i < calcBtns.length; i++){
    calcBtns[i].addEventListener('click', clickHandler);
  }
});

function clickHandler(){
  var num = false;
  var button = this.id.substring(3);
  // console.log("screenText.innerHTML: "+screenText.innerHTML);
  // console.log("button: "+button);
  // console.log("isNaN(button): " + isNaN(button));
  if(!isNaN(button)){
    button = parseInt(button);
    num = true;
  }
  console.log(typeof button);
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
      loopVal = null;
    }
    calcLoop = false;
    break;
    case "Clear":
    currentVal = 0;
    loopVal = null;
    savedVal = null;
    ac = true;
    calcLoop = false;
    clearType.innerHTML = 'AC';
    num = false;
    writeScreen();
    break;
    case "Equals":
    calculate();
    calcLoop = false;
    num = false;
    break;
    case "Add":
    console.log("switch symbol:", symbol );
    if(symbol !== null && symbol === "Add"){
      calculate();
    }
    else{
      savedVal = currentVal;
      currentVal = 0;
    }
    num = false;
    symbol = "Add";
    break;
    default:
    alert("You broke my calculator!");
    break;
  }
  if(num && screenText.innerHTML.length < 8){
    currentVal *= 10;
    currentVal += button;
    if(ac){
      ac = !ac;
      clearType.innerHTML = 'C';
    }
  }
  // console.log(screenText.innerHTML.length);
  if(num) writeScreen();
}

function calculate(){
  // alert("Expression calculated.");
  if(symbol != null){
    console.log('symbol not null');
    if(symbol === "Add"){
      if(calcLoop === false){
        loopVal = currentVal;
        calcLoop = true;
        currentVal += savedVal;
      }
      else{
        currentVal += loopVal;
      }
      writeScreen();
    }
  }
  symbol = null;
}

function proccessNum(){
  if(num && screenText.innerHTML.length < 8){
    currentVal *= 10;
    currentVal += button;
  }
}

function writeScreen(){
  if(calcLoop){
    screenText.innerHTML = currentVal;
    console.log("calcLoop: ",calcLoop);
  }
  else{
    screenText.innerHTML = currentVal;
    console.log("calcLoop: ",calcLoop);
  }
}

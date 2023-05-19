import React from 'react';
import './App.css';

class Calculator{
  constructor(prevDisplayText, currentDisplayText){
       this.prevDisplayText = prevDisplayText;
       this.currentDisplayText = currentDisplayText;
       this.clear();
  }

  clear(){
      this.currentDisplay = '';
      this.previousDiplay='';
      this.operation = undefined; 
       
  }
  delete( ){
      this.currentDisplay = this.currentDisplay.toString().slice(0,-1)

  }

  appendNum(number){
      if (number === '.' && this.currentDisplay.includes('.')) return;
      this.currentDisplay = this.currentDisplay.toString() + number.toString();
      console.log(this.currentDisplay)

  }

  chooseOperation(operation){
      if (this.currentDisplay === '') return;
      if(this.previousDiplay !== ''){
          this.calculate();
      }
      this.operation = operation;
      this.previousDiplay = this.currentDisplay;
      if (this.operation !== '%' && this.operation !== 'Log()' && this.operation !== 'π'){
          this.currentDisplay = ''; 
      }
  }

  calculate(){
       let computation;
       const prev = parseFloat(this.previousDiplay);
       const current = parseFloat(this.currentDisplay);

       if(isNaN(prev) || isNaN(current)) return 

       switch (this.operation) {
          case '+':
              computation = prev + current;
              break;
          case '-':
              computation = prev - current;
              break;
          case '+':
              computation = prev + current;
              break;
          case 'x':
              computation = prev * current;
              break;
          case '÷':
              computation = prev / current;
              break;
          case '%':
              computation = prev / 100;
              break;
          case 'Log()':
              computation = Math.log(prev)
              break;
       
          case 'π':
              computation = prev * (22/7)
              break;
       
          case '^':
              computation = prev ** current
              break;
       
          default:
              return;
       }
       this.currentDisplay = computation;
       this.operation = undefined;
       this.previousDiplay = '';
  }

  getDisplayNumber(number){
      const stringNum = number.toString();
      const integerNum = parseFloat(stringNum.split('.')[0]);
      const decimalNum = stringNum.split('.')[1];

      let integerDisplay;

      if(isNaN(integerNum)){
          integerDisplay = '';
      } else {
           integerDisplay = integerNum.toLocaleString('en', {maximumFractionDigits: 0 }); 

      }

      if(decimalNum != null){
          return `${integerDisplay}.${decimalNum}`
      } else {
           return integerDisplay
      }

      // const floatNum = parseFloat(number);
      // if (isNaN(floatNum)) return '';
      // return floatNum.toLocaleString('en')
  }

  displayUpdate(){
      this.currentDisplayText.innerText = this.getDisplayNumber(this.currentDisplay);

      if (this.operation != null){
          this.prevDisplayText.innerText = `${this.getDisplayNumber(this.previousDiplay)}  ${this.operation}`;
      }else{
          this.prevDisplayText.innerText = '';
      }
      
  }
}


const numberBtns =  document.querySelectorAll('[data-number]');
const operationBtns=  document.querySelectorAll('[data-operantion]');

const equalBtn = document.querySelector('[data-equal]');
const delBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');

const dropDownBtn = document.querySelector('[data-drop-down]')


const prevDisplayText = document.querySelector("[data-previous-display]");
const currentDisplayText = document.querySelector("[data-current-display]");


const calculator = new Calculator(prevDisplayText,currentDisplayText);

numberBtns.forEach(btn => {
  btn.addEventListener('click',()=>{
      calculator.appendNum(btn.innerText)
      calculator.displayUpdate(); 
  })
});
operationBtns.forEach(btn => {
  btn.addEventListener('click',()=>{
      calculator.chooseOperation(btn.innerText)
      calculator.displayUpdate(); 
  })
});

equalBtn.addEventListener('click', btn => {
  calculator.calculate(); 
  calculator.displayUpdate(); 
});

allClearBtn.addEventListener('click', btn => {
  calculator.clear(); 
  calculator.displayUpdate(); 
})
delBtn.addEventListener('click', btn => {
  calculator.delete(); 
  calculator.displayUpdate(); 
});


const element = document.querySelector('[data-extra1]');
const element2 = document.querySelector('[data-extra2]');
const element3 = document.querySelector('[data-extra3]');
const element4 = document.querySelector('[data-extra4]');



dropDownBtn.addEventListener('click', btn => {
  if (element.style.display === "none"){
      element.style.display = 'block';
      element2.style.display = 'block';
      element3.style.display = 'block';
      element4.style.display = 'block';

  }else {
      element.style.display = 'none';
      element2.style.display = 'none';
      element3.style.display = 'none';
      element4.style.display = 'none';
  }

})

class App extends React.Component{
  render(){
    return (
      <div className='body'>
        <div className="calculator-grid">
            <div className="display">
                <div data-previous-display className="previous-display"></div>
                <div data-current-display class="current-display" id="display"></div> 
            </div>
            <button data-all-clear className="span-two" id="clear">AC</button>
            <button data-delete>DEL</button>
            <button data-operantion id="divide">÷</button>
            <button data-number id="one">1</button>
            <button data-number id="two">2</button>
            <button data-number id="three">3 </button>
            <button data-operantion id="multiply">x</button>
            <button data-number id="four">4</button>
            <button data-number id="five">5</button>
            <button data-number id="six">6</button>
            <button data-operantion id="add">+</button>
            <button data-number id="seven">7</button>
            <button data-number id="eight">8</button>
            <button data-number id="nine">9</button>
            <button data-operantion id="subtract">-</button>
            <button data-number id="decimal">.</button>
            <button data-number id="zero">0</button>
            <button data-equal className="span-two" id="equals">=</button>
        </div>
      </div>
    );
  }
}

export default App;

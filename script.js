addEventListener('DOMContentLoaded', () => {

    const numberBtn = document.querySelectorAll('[data-number]');
    const operationBtn = document.querySelectorAll('[data-operation]');
    const allClear = document.querySelector('[data-all-clear]');
    const del = document.querySelector('[data-delete]');
    const equal = document.querySelector('[data-equal]');
    const prevNumText = document.querySelector('[data-previous-num');
    const currNumText = document.querySelector('[data-current-num');
    
    
    class Calculator{

        constructor(prevNum, currNum){
            this.prevNum = prevNum;
            this.currNum = currNum; 
            this.clear();
        }

        clear(){
            this.currNum = '';
            this.prevNum = '';
            this.operation = '';
        };

        delete(){
            this.currNum = this.currNum.toString().slice(0,-1);
        };

        addNum(number){
            if(number === '.' && this.currNum.includes('.')) return;
            this.currNum = this.currNum.toString() + number.toString();
        };

        compute(){
            let computation;
            const prev = parseFloat(this.prevNum);
            const curr = parseFloat(this.currNum);
            if(isNaN(prev) || isNaN(curr)) return; 
            switch(this.operation){
                case '+':
                    computation = prev + curr;
                    break;
                case '-':
                    computation = prev - curr;
                    break;
                case '*':
                    computation = prev * curr;
                    break;
                case '/':
                    computation = prev / curr;
                    break;
                default: 
                    return;
            }
            this.currNum = computation;
            this.operation = '';
            this.prevNum = '';
        };

        addOperation(operation){
            if(this.currNum === '') return;
            if(this.prevNum !== ''){
                this.compute();
            }
            this.operation = operation;
            this.prevNum = this.currNum;
            this.currNum = ''; 
        };

        updateDisplay(){
            currNumText.innerText = this.currNum;
            prevNumText.innerText = this.prevNum + this.operation;

        };

    };

    const calculator = new Calculator(prevNumText,currNumText);

    numberBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            calculator.addNum(btn.innerText);
            calculator.updateDisplay();
        });
    });
    
    operationBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            calculator.addOperation(btn.innerText);
            calculator.updateDisplay();
        });
    });

    equal.addEventListener('click', (btn) => {
        calculator.compute();
        calculator.updateDisplay();
    });
    
    allClear.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });

    del.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });

});
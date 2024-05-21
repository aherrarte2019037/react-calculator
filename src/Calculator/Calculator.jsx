import './Calculator.css'
import { useState } from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState('');
    const [operator, setOperator] = useState(null);
    const [operand1, setOperand1] = useState('');
    const [, setOperand2] = useState('');
  
    const handleClick = (value) => {
      if (display.length >= 9) return;
  
      if (['+', '-', '*', '/', '%'].includes(value)) {
        setOperator(value);
        setOperand1(display);
        setDisplay('');
      } else if (value === '=') {
        const result = calculateResult();
        setDisplay(result.toString().slice(0, 9));
        setOperator(null);
        setOperand1('');
        setOperand2('');
      } else if (value === 'C') {
        setDisplay('');
        setOperator(null);
        setOperand1('');
        setOperand2('');
      } else if (value === '.') {
        if (!display.includes('.')) {
          setDisplay(display + value);
        }
      } else {
        setDisplay(display + value);
      }
    };
  
    const calculateResult = () => {
      const num1 = parseFloat(operand1);
      const num2 = parseFloat(display);
  
      switch (operator) {
        case '+':
          return num1 + num2;
        case '-':
          return num1 - num2;
        case '*':
          return num1 * num2;
        case '/':
          return num2 !== 0 ? num1 / num2 : 'Error';
        case '%':
          return num1 % num2;
        default:
          return display;
      }
    };
  
    return (
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/', 'C', '%'].map((button) => (
            <button key={button} onClick={() => handleClick(button)}>{button}</button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Calculator;
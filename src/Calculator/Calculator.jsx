import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [operator, setOperator] = useState(null);
  const [operand1, setOperand1] = useState('');
  const [, setOperand2] = useState('');
  const [pressedKey, setPressedKey] = useState(null);

  const handleClick = (value) => {
    if (display.length >= 9 && value !== 'C' && value !== 'Backspace' && value !== '+/-') return;

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
    } else if (value === 'Backspace') {
      setDisplay(display.slice(0, -1));
    } else if (value === '+/-') {
      if (display[0] === '-') {
        setDisplay(display.slice(1));
      } else if (display.length < 9) {
        setDisplay('-' + display);
      }
    } else if (value === '.') {
      if (!display.includes('.')) {
        setDisplay(display + value);
      }
    } else {
      setDisplay(display + value);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyPress = (event) => {
    const { key } = event;
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '%', '=', '.', 'Enter', 'c', 'Backspace'].includes(key)) {
      setPressedKey(key);
      if (key === 'Enter') {
        handleClick('=');
      } else if (key === 'c') {
        handleClick('C');
      } else {
        handleClick(key);
      }
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (pressedKey) {
      const timer = setTimeout(() => {
        setPressedKey(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pressedKey]);

  return (
    <div className="calculator">
      <div className="display" data-testid="display">{display}</div>
      <div className="buttons">
        {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/', 'C', '%', '+/-'].map((button) => (
          <button
            key={button}
            onClick={() => handleClick(button)}
            className={pressedKey === button || (button === 'C' && pressedKey === 'c') || (button === '=' && pressedKey === 'Enter') ? 'pressed' : ''}
          >
            {button}
          </button>
        ))}
        <button
          onClick={() => handleClick('Backspace')}
          className={pressedKey === 'Backspace' ? 'pressed' : ''}
        >
          ←
        </button>
      </div>
    </div>
  );
};

export default Calculator;

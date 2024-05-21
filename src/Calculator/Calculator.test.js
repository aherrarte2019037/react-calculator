import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './Calculator';

describe('Calculator', () => {
  test('adds two numbers correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    
    expect(getByTestId('display')).toHaveTextContent('5');
  });

  test('subtracts two numbers correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('-'));
    fireEvent.click(getByText('4'));
    fireEvent.click(getByText('='));
    
    expect(getByTestId('display')).toHaveTextContent('5');
  });

  test('handles decimal numbers', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('.'));
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    
    expect(getByTestId('display')).toHaveTextContent('7.5');
  });

  test('handles division by zero', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    
    fireEvent.click(getByText('8'));
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('='));
    
    expect(getByTestId('display')).toHaveTextContent('Error');
  });

  test('limits input to 9 characters', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('4'));
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('6'));
    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('8'));
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('0'));
    
    expect(getByTestId('display')).toHaveTextContent('123456789');
  });
});

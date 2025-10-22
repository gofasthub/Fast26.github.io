import { useState } from 'react';
import { Delete } from 'lucide-react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const Button = ({ children, onClick, className = '', span = false }: any) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 ${
        className || 'bg-gray-200 hover:bg-gray-300'
      } ${span ? 'col-span-2' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full bg-gray-100 p-4 flex flex-col">
      {/* Display */}
      <div className="bg-gray-900 text-white p-6 rounded-lg mb-4 text-right">
        <div className="text-sm text-gray-400 h-6">
          {previousValue !== null && operation && `${previousValue} ${operation}`}
        </div>
        <div className="text-4xl font-mono truncate">{display}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <Button onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white">C</Button>
        <Button onClick={handleBackspace} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Delete className="w-5 h-5 mx-auto" />
        </Button>
        <Button onClick={() => handleOperator('/')} className="bg-blue-500 hover:bg-blue-600 text-white">÷</Button>
        <Button onClick={() => handleOperator('*')} className="bg-blue-500 hover:bg-blue-600 text-white">×</Button>

        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button onClick={() => handleOperator('-')} className="bg-blue-500 hover:bg-blue-600 text-white">−</Button>

        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button onClick={() => handleOperator('+')} className="bg-blue-500 hover:bg-blue-600 text-white">+</Button>

        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button onClick={handleEquals} className="bg-green-500 hover:bg-green-600 text-white row-span-2">=</Button>

        <Button onClick={() => handleNumber('0')} span>0</Button>
        <Button onClick={handleDecimal}>.</Button>
      </div>
    </div>
  );
}
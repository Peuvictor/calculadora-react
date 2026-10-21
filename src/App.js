import { useReducer, useEffect } from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';
import { calculatorReducer, ACTIONS } from './reducers/calculatorReducer';

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    calculatorReducer,
    {}
  );

  const addDigit = (digit) =>
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });

  const chooseOp = (op) =>
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: op } });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      if (key >= '0' && key <= '9') {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } });
      } else if (key === '.' || key === ',') {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } });
      } else if (key === '+' || key === '-' || key === '*') {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: key } });
      } else if (key === '/') {
        e.preventDefault();
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '÷' } });
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        dispatch({ type: ACTIONS.EVALUATE });
      } else if (key === 'Backspace') {
        dispatch({ type: ACTIONS.DELETE_DIGIT });
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        dispatch({ type: ACTIONS.CLEAR });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="calculator-grid">
      <Display
        previousOperand={previousOperand}
        operation={operation}
        currentOperand={currentOperand}
      />

      <Button
        label="AC"
        spanTwo
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      />
      <Button
        label="DEL"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      />
      <Button label="÷" onClick={() => chooseOp('÷')} />

      <Button label="1" onClick={() => addDigit('1')} />
      <Button label="2" onClick={() => addDigit('2')} />
      <Button label="3" onClick={() => addDigit('3')} />
      <Button label="*" onClick={() => chooseOp('*')} />

      <Button label="4" onClick={() => addDigit('4')} />
      <Button label="5" onClick={() => addDigit('5')} />
      <Button label="6" onClick={() => addDigit('6')} />
      <Button label="+" onClick={() => chooseOp('+')} />

      <Button label="7" onClick={() => addDigit('7')} />
      <Button label="8" onClick={() => addDigit('8')} />
      <Button label="9" onClick={() => addDigit('9')} />
      <Button label="-" onClick={() => chooseOp('-')} />

      <Button label="." onClick={() => addDigit('.')} />
      <Button label="0" onClick={() => addDigit('0')} />
      <Button
        label="="
        spanTwo
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      />
    </div>
  );
}

export default App;

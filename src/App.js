import { useReducer } from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // Se não digitou nada ainda, ignora o clique no operador
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      // Move o número atual para cima (previous) e guarda a operação
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      // Se clicou em outro operador antes de digitar o 2º número, só troca o sinal
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return state;

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  const addDigit = (digit) =>
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });

  const chooseOp = (op) =>
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: op } });

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
      <Button label="=" spanTwo />
    </div>
  );
}

export default App;

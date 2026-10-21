import { useReducer } from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return '';

  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) return 'Erro';
      computation = prev / current;
      break;
    default:
      return '';
  }

  // Remove imprecisões de ponto flutuante do JS (ex: 0.1 + 0.2 = 0.30000000000000004)
  return Number(computation.toFixed(10)).toString();
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // 1. Se acabou de calcular (=), o próximo dígito limpa o resultado anterior
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit === '.' ? '0.' : payload.digit,
          overwrite: false,
        };
      }

      // 2. Impede múltiplos zeros à esquerda
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }

      // 3. Se começar digitando ponto, vira "0."
      if (payload.digit === '.' && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: '0.',
        };
      }

      // 4. Impede mais de um ponto decimal no mesmo número
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      // 5. Substitui o "0" inicial se digitar outro número (evita "05")
      if (state.currentOperand === '0' && payload.digit !== '.') {
        return {
          ...state,
          currentOperand: payload.digit,
        };
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // Bloqueia operação se o visor estiver vazio ou com "Erro"
      if (
        (state.currentOperand == null && state.previousOperand == null) ||
        state.currentOperand === 'Erro'
      ) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      // Operação em cadeia: calcula o par atual e joga o resultado para cima
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      // Só calcula se tiver os 3 elementos preenchidos
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
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
      <Button
        label="="
        spanTwo
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      />
    </div>
  );
}

export default App;

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

export function evaluate({ currentOperand, previousOperand, operation }) {
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

  return Number(computation.toFixed(10)).toString();
}

export function calculatorReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit === '.' ? '0.' : payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }

      if (payload.digit === '.' && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: '0.',
        };
      }

      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

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

      const result = evaluate(state);
      if (result === 'Erro') {
        return {
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: 'Erro',
        };
      }

      return {
        ...state,
        previousOperand: result,
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

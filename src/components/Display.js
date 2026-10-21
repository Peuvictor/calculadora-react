const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  if (operand === 'Erro') return 'Erro';

  const [integer, decimal] = operand.split('.');

  // Se não tiver ponto decimal ainda, formata só o inteiro
  if (decimal == null) return INTEGER_FORMATTER.format(integer);

  // Se tiver ponto, formata o inteiro e preserva os decimais intactos
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

export default function Display({ previousOperand, operation, currentOperand }) {
  return (
    <div className="output">
      <div className="previous-operand">
        {formatOperand(previousOperand)} {operation}
      </div>
      <div className="current-operand">{formatOperand(currentOperand)}</div>
    </div>
  );
}

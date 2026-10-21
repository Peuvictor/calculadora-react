import './App.css';
import Display from './components/Display';
import Button from './components/Button';

function App() {
  return (
    <div className="calculator-grid">
      <Display previousOperand="123" operation="+" currentOperand="456" />

      <Button label="AC" spanTwo />
      <Button label="DEL" />
      <Button label="÷" />

      <Button label="1" />
      <Button label="2" />
      <Button label="3" />
      <Button label="*" />

      <Button label="4" />
      <Button label="5" />
      <Button label="6" />
      <Button label="+" />

      <Button label="7" />
      <Button label="8" />
      <Button label="9" />
      <Button label="-" />

      <Button label="." />
      <Button label="0" />
      <Button label="=" spanTwo />
    </div>
  );
}

export default App;

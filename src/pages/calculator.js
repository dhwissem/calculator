import React from 'react';

import Button from '../components/button.js';

import './calculator.css';

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      displayValue: '0',
      waitingForOperand: false,
      operator: null
    }
  }


  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    //new number after operator input
    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    }
    else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  };


  inputDot = () => {
    const { displayValue, waitingForOperand } = this.state;

    //new number after operator input
    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    }
    //if displayValue has no dot, concatenate the inputted dot
    else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + ".",
        waitingForOperand: false
      })
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0'
    })
  };

  performOperation = (nextOperator) => {
    const { displayValue, operator, value } = this.state;
    const nextValue = parseFloat(displayValue);

    //define operations in an array, using the operator as the key
    const operations = {
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue
    };

    //no previous value, hit operator key
    if (value == null) {
      this.setState({
        value: nextValue
      })
    }
    //previous value, hit operator key
    else {

      const currentValue = value || 0;

      //perform operation using the stored value and the newly input value
      const computedValue = operations[operator](currentValue, nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }


    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  }

  render() {

    const { displayValue } = this.state;

    return (
      <div className="calculator-wrapper">
        <div className="calculator-display">{displayValue}</div>
        <div className="key operator-keys key-0">
          <Button onClick={() => this.inputDigit(0)}>0</Button>
        </div>
        <div className="key operator-keys key-1">
          <Button onClick={() => this.inputDigit(1)}>1</Button>
        </div>
        <div className="key operator-keys key-2">
          <Button onClick={() => this.inputDigit(2)}>2</Button>
        </div>
        <div className="key operator-keys key-3">
          <Button onClick={() => this.inputDigit(3)}>3</Button>
        </div>
        <div className="key operator-keys key-4">
          <Button onClick={() => this.inputDigit(4)}>4</Button>
        </div>
        <div className="key operator-keys key-5">
          <Button onClick={() => this.inputDigit(5)}>5</Button>
        </div>
        <div className="key operator-keys key-6">
          <Button onClick={() => this.inputDigit(6)}>6</Button>
        </div>
        <div className="key operator-keys key-7">
          <Button onClick={() => this.inputDigit(7)}>7</Button>
        </div>
        <div className="key operator-keys key-8">
          <Button onClick={() => this.inputDigit(8)}>8</Button>
        </div>
        <div className="key operator-keys key-9">
          <Button onClick={() => this.inputDigit(9)}>9</Button>
        </div>
        <div className="key function-keys key-subtract">
          <Button onClick={() => this.performOperation('-')}>−</Button>
        </div>
        <div className="key function-keys key-add">
          <Button onClick={() => this.performOperation('+')}>+</Button>
        </div>
        <div className="key function-keys key-equals">
          <Button onClick={() => this.performOperation('=')}>=</Button>
        </div>
        <div className="key function-keys key-dot">
          <Button onClick={() => this.inputDot()}>●</Button>
        </div>
        <div className="key function-keys key-clear">
          <Button onClick={() => this.clearDisplay()}>AC</Button>
        </div>
      </div>
    )
  }
}

export default Calculator;

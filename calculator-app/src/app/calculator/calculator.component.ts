import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  displayValue: string = '0';
  previousValue: number | null = null;
  currentOperator: string | null = null;
  newNumber: boolean = true;

  appendToDisplay(value: string): void {
    if (this.newNumber) {
      this.displayValue = value;
      this.newNumber = false;
    } else {
      this.displayValue = this.displayValue === '0' ? value : this.displayValue + value;
    }
  }

  clear(): void {
    this.displayValue = '0';
    this.previousValue = null;
    this.currentOperator = null;
    this.newNumber = true;
  }

  setOperator(operator: string): void {
    if (this.currentOperator !== null && !this.newNumber) {
      this.calculate();
    }
    this.previousValue = parseFloat(this.displayValue);
    this.currentOperator = operator;
    this.newNumber = true;
  }

  calculate(): void {
    if (this.previousValue === null || this.currentOperator === null) {
      return;
    }

    const currentValue = parseFloat(this.displayValue);
    let result: number;

    switch (this.currentOperator) {
      case '+':
        result = this.previousValue + currentValue;
        break;
      case '-':
        result = this.previousValue - currentValue;
        break;
      case '×':
        result = this.previousValue * currentValue;
        break;
      case '÷':
        if (currentValue === 0) {
          this.displayValue = 'Error';
          this.newNumber = true;
          return;
        }
        result = this.previousValue / currentValue;
        break;
      default:
        return;
    }

    this.displayValue = result.toString();
    this.previousValue = null;
    this.currentOperator = null;
    this.newNumber = true;
  }
}
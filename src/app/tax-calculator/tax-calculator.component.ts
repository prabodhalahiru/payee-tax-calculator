import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css']
})
export class TaxCalculatorComponent {
  monthlyIncome: number = 0;
  oldTax: number = 0;
  newTax: number = 0;
  taxSavings: number = 0;

  calculateTax() {
    this.oldTax = this.calculateOldTax(this.monthlyIncome);
    this.newTax = this.calculateNewTax(this.monthlyIncome);
    this.taxSavings = this.oldTax - this.newTax;
  }

  private calculateOldTax(income: number): number {
    const annualIncome = income * 12;
    const taxFreeThreshold = 1_200_000;
    const taxableIncome = Math.max(0, annualIncome - taxFreeThreshold);
    return this.computeTax(taxableIncome, [500_000, 500_000, 500_000, 500_000, 500_000], [6, 12, 18, 24, 30, 36]);
  }

  private calculateNewTax(income: number): number {
    const annualIncome = income * 12;
    const taxFreeThreshold = 1_800_000;
    const taxableIncome = Math.max(0, annualIncome - taxFreeThreshold);
    return this.computeTax(taxableIncome, [1_000_000, 500_000, 500_000, 500_000], [6, 18, 24, 30, 36]);
  }

  private computeTax(income: number, brackets: number[], rates: number[]): number {
    let tax = 0;
    for (let i = 0; i < brackets.length; i++) {
      const amount = Math.min(income, brackets[i]);
      tax += amount * (rates[i] / 100);
      income -= amount;
      if (income <= 0) break;
    }
    if (income > 0) {
      tax += (income * (rates[rates.length - 1] / 100));
    }
    return tax / 12;
  }
}

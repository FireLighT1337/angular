import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-results/investment.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  initialInvestment = signal(0);
  annualInvestment = signal(0);
  expectedReturn = signal(0);
  duration = signal(0);

  calculate = output<InvestmentInput>();

  onSubmit() {
    this.calculate.emit({
      initialInvestment: this.initialInvestment(),
      // when converting a sting to a number you can do it like this in angular:
      // initialInvestment: +this.initialInvestment(),
      annualInvestment: this.annualInvestment(),
      expectedReturn: this.expectedReturn(),
      duration: this.duration(),
    });
  }
}

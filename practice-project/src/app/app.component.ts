import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { InvestmentService } from './investment-results/investment.service';
import {
  InvestmentInput,
  InvestmentResult,
} from './investment-results/investment.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private investmentService = inject(InvestmentService);
  results = signal<InvestmentResult[]>([]);
  hasSubmitted = signal(false);

  onCalculate(input: InvestmentInput) {
    const annualData = this.investmentService.calculateInvestmentResults(input);
    this.results.set(annualData);
    this.hasSubmitted.set(true);
  }
}

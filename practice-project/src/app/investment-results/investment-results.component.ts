import { Component, input } from '@angular/core';
import { InvestmentResult } from './investment.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  results = input.required<InvestmentResult[]>();
  hasSubmitted = input.required<boolean>();
}

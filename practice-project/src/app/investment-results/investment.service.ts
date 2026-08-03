import { Injectable } from '@angular/core';
import { InvestmentInput, InvestmentResult } from './investment.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  calculateInvestmentResults(input: InvestmentInput): InvestmentResult[] {
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
      input;
    const annualData: InvestmentResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment,
        totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    return annualData;
  }
}

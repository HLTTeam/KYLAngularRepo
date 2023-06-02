import {  Component } from '@angular/core';
import { LoanDetailsResponse } from 'src/app/model/loan-details-response.model';
import { LoanDetailsService } from 'src/app/service/loan-details.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent {

  radioTitle: string;
  radioItems: Array<string>;
  model   = {option: 'New Loan'};

  divisionValues: string[] = Object.values(Division);

  loanValues: string[] = Object.values(TypeOfLoan);

  loanAmount: number = 200000;
  tenure: number = 10;
  interest: number = 5;
  emi: number = 0;

  income: number = 0;
  expenses: number = 0;
  credit: number = 0;

  gridsize: number = 30;
  loanDetailsResponse: LoanDetailsResponse[] = [];

  updateSetting(event:any) {
    this.gridsize = event.value;
  }
  constructor(public loanDetailsService: LoanDetailsService) { 
    this.radioTitle = 'Loans';
    this.radioItems = ['New Loan', 'Top Up','Refinance'];

  }
  ngOnInit(): void {
  
    this.loanDetailsService.getLoans()
    .subscribe(data => {
      this.loanDetailsResponse=data;
      
    }, (error) => {
      console.log("error message",+error)
    });
     
  }

  cal() {
    var outstandingAmount =
      Number(this.loanAmount) +
      Number(this.loanAmount * (this.interest / 100) * this.tenure);
    this.emi = outstandingAmount / this.tenure;
  }
 
}

export enum Division {
  HDFC = 'HDFC',
  ICICI = 'ICICI',
  SBI = 'SBI',

}

export enum TypeOfLoan {
  Vehicle = 'Vehicle',
  Personal = 'Personal',
 
}





import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplyLoanRequest } from 'src/app/model/apply-loan-request.model';
import { LoanDetailsResponse } from 'src/app/model/loan-details-response.model';
import { LoanDetailsService } from 'src/app/service/loan-details.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit{
  loanDetailsForm!:FormGroup;

  radioTitle: string;
  radioItems: Array<string>;
  model   = {option: 'New Loan'};
  myProperty="New";
  newLoan:boolean=true;
  bankList: Array<string> = [];
  bankListUnique: Array<string> = [];
  loanList:string[]=[];
  loanValues: string[] = Object.values(TypeOfLoan);

  loanAmount: number = 200000;
  tenure: number = 12;
  interest: number = 5;
  emi: number = 0;
  emiValue: string='';

  income: number = 0;
  expenses: number = 0;
  credit: number = 0;

  gridsize: number = 30;
  loanDetailsResponse: LoanDetailsResponse[] = [];
  loanDetailsResponseROI: LoanDetailsResponse = new LoanDetailsResponse;

  applyLoanRequest: ApplyLoanRequest = new ApplyLoanRequest;

  showErr:boolean=false;
  selectedValue: any;
  searchTxt: any;
  errorMessage: string="";


  tenureInMonths = [{
    value : 12,
    viewValue : 12
  },{
    value : 24,
    viewValue : 24
  },{
    value : 36,
    viewValue : 36
  },{
    value : 48,
    viewValue : 48
  },{
    value : 60,
    viewValue : 60
  },{
    value : 72,
    viewValue : 72
  },{
    value : 84,
    viewValue : 84
  },{
    value : 96,
    viewValue : 96
  },{
    value : 108,
    viewValue : 108
  },{
    value : 120,
    viewValue : 120
  },{
    value : 132,
    viewValue : 132
  },{
    value : 144,
    viewValue : 144
  },{
    value : 156,
    viewValue : 156
  },{
    value : 168,
    viewValue : 168
  },{
    value : 180,
    viewValue : 180
  },{
    value : 192,
    viewValue : 192
  },{
    value : 204,
    viewValue : 204
  },{
    value : 216,
    viewValue : 216
  },{
    value : 228,
    viewValue : 228
  },{
    value : 240,
    viewValue : 240
  }];


  updateSetting(event:any) {
    this.gridsize = event.value;
  }
  constructor(public loanDetailsService: LoanDetailsService,private fb:FormBuilder) { 
    this.radioTitle = 'Loans';
    
    this.radioItems = ['New Loan', 'Top Up','Refinance'];
    this.newLoan=true;
    this.loanDetailsForm = this.fb.group({
      bankName : new FormControl(),
      loanName : new FormControl(),
      income : new FormControl(),
      expenses : new FormControl(),
      credit : new FormControl(),
      loanAmount : new FormControl(),
      tenure : new FormControl(),
      options: new FormControl(),
      interest: new FormControl({value: '', disabled: true}),


     
    });

  }
  ngOnInit(): void {
    this.selectedValue = this.tenureInMonths[0].value;

    /*this.loanDetailsService.getLoans()
    .subscribe(data => {
      this.loanDetailsResponse=data;

      
      
    }, (error) => {
      console.log("error message",+error)
    });*/
    this.loanDetailsResponse=[
      {
        "id": "6475e7fda3dd6724357188e9",
        "bank": "ICIC BANK",
        "type": "home",
        "roi": 13.5,
        "tenure": 20
    },
    {
        "id": "6475e83ea3dd6724357188eb",
        "bank": "HDFC BANK",
        "type": "Personal",
        "roi": 11.5,
        "tenure": 20
    },
    {
      "id": "6475e83ea3dd6724357188eb",
      "bank": "HDFC BANK",
      "type": "Vechile",
      "roi": 11.5,
      "tenure": 20
  },
    {
        "id": "6475e850a3dd6724357188ec",
        "bank": "ICIC BANK",
        "type": "Personal",
        "roi": 10.6,
        "tenure": 20
    },
    {
      "id": "6475e83ea3dd6724357188eb",
      "bank": "AXIS",
      "type": "Personal",
      "roi": 11.5,
      "tenure": 20
  },
    ]

    this.loanDetailsResponse.forEach(element => {
      this.bankList.push(element.bank ? element.bank:"");
    });
    this.loanDetailsResponse.forEach(element => {
      this.loanList.push(element.type ? element.type:"");
    });
let cc=[];
     cc=this.loanDetailsResponse.filter(it => {
      return it.bank?.includes("ICIC BANK") && it.type?.includes("Personal")
    });

    const checkIfExists = (element: string) => {
      let exist = false;
      for (let i = 0; i < this.bankListUnique.length; i++) {
        if (this.bankListUnique[i] === element) {
          exist = true;
          break;
        }
      }
      return exist;
    };

    for (let i = 0; i < this.bankList.length; i++) {
      if (!checkIfExists(this.bankList[i])) {
        this.bankListUnique.push(this.bankList[i]);
      }
    }
    console.log("bank roi =>"+JSON.stringify(cc[0].roi));



  }

  cal() {
    console.log("this.tenure =>",this.tenure);
    var outstandingAmount =
      Number(this.loanAmount) +
      Number(this.loanAmount * (this.interest / 100) * this.tenure);
    this.emi = outstandingAmount / this.tenure;
    this.emiValue=this.emi.toFixed(2);
  }
checkEligibility(){
  var actualIncome =Number(this.income)-((Number(this.expenses)+Number(this.credit)));
  console.log("actual income",actualIncome);
  console.log("EMI ",this.emi);

  if(actualIncome>this.emi){
    this.showErr=false;
  }else{
    this.errorMessage="Not eligible due to low cibil score";
    this.showErr=true;
  }
      

}
selectedLoanValue(val: any){
    console.log("bb",this.loanDetailsForm.get('bankName')?.value);
    console.log("ll",this.loanDetailsForm.get('loanName')?.value);
    let cc=[];
     cc=this.loanDetailsResponse.filter(it => {
      return it.bank?.includes(this.loanDetailsForm.get('bankName')?.value) && 
      it.type?.includes(this.loanDetailsForm.get('loanName')?.value)
    });
    let loanListCC=[];
    loanListCC=this.loanDetailsResponse.filter(it => {
      return it.bank?.includes(this.loanDetailsForm.get('bankName')?.value);
    });

    console.log("loanListCC==>>"+JSON.stringify(loanListCC));


    this.interest=cc[0].roi ? cc[0].roi :0;
    console.log("rodi==>>"+this.interest)
  }

  selectedBankValue(val: any){
    console.log("bb",this.loanDetailsForm.get('bankName')?.value);
    console.log("ll",this.loanDetailsForm.get('loanName')?.value);
    
    let loanListCC=[];
    loanListCC=this.loanDetailsResponse.filter(it => {
      return it.bank?.includes(this.loanDetailsForm.get('bankName')?.value);
    });

    console.log("loanListCC==>>"+JSON.stringify(loanListCC));
    this.loanList=[];
    loanListCC.forEach(element => {
      this.loanList.push(element.type ? element.type:"");
    });

    
  }

  selectedTenureInMonths(val: any){
    console.log("any==>>",val.target.value)

this.tenure=Number(val.target.value);
console.log("vvv==>>",this.tenure)
    
  }


  applyLoan(){

    this.applyLoanRequest.bank=this.loanDetailsForm.get('bankName')?.value;
    this.applyLoanRequest.typeOfLoan=this.loanDetailsForm.get('loanName')?.value;
    this.applyLoanRequest.type=this.loanDetailsForm.get('options')?.value;
    this.applyLoanRequest.emi=this.emi;
    this.applyLoanRequest.roi=this.loanDetailsForm.get('interest')?.value
    this.applyLoanRequest.totalAmount=this.loanDetailsForm.get('loanAmount')?.value;

    console.log("apply loan request==>"+JSON.stringify(this.applyLoanRequest));

    this.loanDetailsService.applyLoan(this.applyLoanRequest).subscribe(data => {
    }, resErr => {
      console.log("err mess" +resErr);
    });
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





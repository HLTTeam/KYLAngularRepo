import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { LoanDetailsComponent } from '../loan-details/loan-details/loan-details.component';
import { FormsModule } from '@angular/forms';
import { LoanDetailsService } from '../service/loan-details.service';

const routes: Routes = [
  { path: '',  component: LoanDetailsComponent },
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [LoanDetailsService]

})
export class LoanDetailsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { LoanDetailsRoutingModule } from '../loan-details-routing/loan-details-routing.module';
import { LoanDetailsService } from '../service/loan-details.service';
import { LoanDetailsComponent } from '../loan-details/loan-details/loan-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
];

@NgModule({
  declarations: [LoanDetailsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LoanDetailsRoutingModule
  ],
  providers: [LoanDetailsService]

})
export class LogindetailsModule { }

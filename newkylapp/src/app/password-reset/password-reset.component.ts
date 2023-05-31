import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordResetModel } from '../model/password-reset-model';
import { PasswordResetService } from '../service/password-reset.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  resetForm!:FormGroup;
  submitted = false;
  password:string | undefined;
  confirmPassword:string | undefined;
  resetModel: PasswordResetModel = new PasswordResetModel;
  constructor(private fb:FormBuilder,private router:Router,public passwordResetService:PasswordResetService){}
  ngOnInit(): void 
  {
    this.resetForm = this.fb.group({
      password:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]],
      confirmPassword:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]],
    });
  }
  get resetData(){
    return this.resetForm.controls;
  }
  onSubmit()
  {
       this.submitted = true;
       if(this.resetForm.valid)
       {
          localStorage.setItem("password",this.resetForm.get('password')?.value);
          localStorage.setItem("confirmPassword",this.resetForm.get('confirmPassword')?.value); 
          this.password=this.resetForm.get('password')?.value;
          this.confirmPassword=this.resetForm.get('confirmPassword')?.value;
          this.resetModel.password=this.password;
          this.resetModel.confirmPassword=this.confirmPassword; 
          this.clear();
          this.resetForm.disable();
          this.passwordResetService.reset(this.resetModel);


          this.router.navigate(['registration']);
       }
  }
  clear()
  {
    this.resetForm.patchValue({
      password:'',
      confirmPassword:''
    });
  }
}

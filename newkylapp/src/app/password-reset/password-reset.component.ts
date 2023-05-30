import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  resetForm!:FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder,private router:Router){}
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
          this.clear();
          this.resetForm.disable();
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

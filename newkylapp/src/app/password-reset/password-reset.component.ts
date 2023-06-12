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
  passwordsMatching = false;
  isConfirmPassword = false;
  confirmPasswordClass = 'form-control';
  email:string | undefined;
  password:string | undefined;
  confirmPassword:string | undefined;
  errorMessage:string | undefined;
  resetModel: PasswordResetModel = new PasswordResetModel;
  showMsg : boolean = false;
  constructor(private fb:FormBuilder,private router:Router,public passwordResetService:PasswordResetService){}
  ngOnInit(): void 
  {
    this.resetForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
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
          localStorage.setItem("email",this.resetForm.get('email')?.value);
          localStorage.setItem("password",this.resetForm.get('password')?.value);
          localStorage.setItem("confirmPassword",this.resetForm.get('confirmPassword')?.value); 
          this.email=this.resetForm.get('email')?.value;
          this.password=this.resetForm.get('password')?.value;
          this.confirmPassword=this.resetForm.get('confirmPassword')?.value;
          this.resetModel.email=this.email;
          this.resetModel.userName = this.email;
          this.resetModel.password=this.password;
          this.resetModel.confirmPassword=this.confirmPassword; 
          this.clear();
          this.resetForm.disable();
          console.log("Before call the reset passowrd servcie");
          //this.passwordResetService.reset(this.resetModel);
          this.passwordResetService.reset(this.resetModel).subscribe(data => {
          }, (error) => {
            console.log('error staus' + error.status);
            if (error.status == 400) {
              this.errorMessage = "XML mapping config already exist in adapter system.";
            } else if (error.status == 401) {
              this.errorMessage = "Unauthorized Request. API key is missing or invalid.";
            } else if (error.status == 404) {
              this.errorMessage = "Resource not found.";
            }else if (error.status == 417) {
              this.errorMessage = "User Email is not existed in system.";
            } else {
              this.errorMessage = "User Email is not existed in system.";
            }
            this.showMsg = true;
          console.log("err mess" +this.errorMessage);
          
        });
        console.log(typeof this.errorMessage != 'undefined');
        console.log(this.errorMessage);
        if(typeof this.errorMessage != 'undefined' && this.errorMessage){
          this.router.navigate(['login']);
        }
        this.router.navigate(['passwordReset']);
       }else{
          this.errorMessage = "Invalid data please provide valid data.";
          this.showMsg = true;
       }

  }

checkPasswords(pw: string, cpw: string) {
  this.isConfirmPassword = true;
  if (pw == cpw) {
    this.passwordsMatching = true;
    this.confirmPasswordClass = 'form-control is-valid';
  } else {
    this.passwordsMatching = false;
    this.confirmPasswordClass = 'form-control is-invalid';
  }
}

  clear()
  {
    this.resetForm.patchValue({
      email:'',
      password:'',
      confirmPassword:''
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder,private router:Router){}
  ngOnInit(): void 
  {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]]
    });
  }
  get loginData(){
    return this.loginForm.controls;
  }
  onSubmit()
  {
       this.submitted = true;
       if(this.loginForm.valid)
       {
          localStorage.setItem("email",this.loginForm.get('email')?.value);
          localStorage.setItem("password",this.loginForm.get('password')?.value);  
          this.clear();
          this.loginForm.disable();
          this.router.navigate(['registration']);
       }
  }
  clear()
  {
    this.loginForm.patchValue({
      email:'',
      password:''
    });
  }
}


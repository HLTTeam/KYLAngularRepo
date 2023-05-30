import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder,private router:Router){}
  ngOnInit(): void 
  {
    this.registerForm = this.fb.group({
      name:['',[Validators.required]],
      phone:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]]
    });
  }
  get registerData(){
    return this.registerForm.controls;
  }
  onSubmit()
  {
       this.submitted = true;
       if(this.registerForm.valid)
       {
          localStorage.setItem("email",this.registerForm.get('email')?.value);
          localStorage.setItem("password",this.registerForm.get('password')?.value);  
          this.clear();
          this.registerForm.disable();
          this.router.navigate(['registration']);
       }
  }
  clear()
  {
    this.registerForm.patchValue({
      email:'',
      password:''
    });
  }
}

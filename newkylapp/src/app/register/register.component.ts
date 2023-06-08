import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../model/register-model';
import { RegisterService } from '../service/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  submitted = false;
  passwordsMatching = false;
  isConfirmPassword = false;
  confirmPasswordClass = 'form-control';
  name:string | undefined;
  email:string | undefined;
  phone:number | undefined;
  address:string | undefined;
  password:string | undefined;
  confirmPassword:string | undefined;
  registerModel: RegisterModel = new RegisterModel;
  constructor(private fb:FormBuilder,private router:Router, public registerService:RegisterService){}
  ngOnInit(): void 
  {
    this.registerForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern('[- +()0-9]+')]],
      address:['',[Validators.required]],
      password:['',[Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]],
      confirmPassword:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]],
    });
    
  }
  get registerData(){
    return this.registerForm.controls;
  }
  onSubmit()
  {
       this.submitted = true;
       console.log(this.registerForm.valid);
       if(this.registerForm.valid)
       {
          localStorage.setItem("name",this.registerForm.get('name')?.value);
          localStorage.setItem("email",this.registerForm.get('email')?.value);
          localStorage.setItem("phone",this.registerForm.get('phone')?.value);
          localStorage.setItem("address",this.registerForm.get('address')?.value);
          localStorage.setItem("password",this.registerForm.get('password')?.value); 
          localStorage.setItem("confirmPassword",this.registerForm.get('confirmPassword')?.value); 
          this.name=this.registerForm.get('name')?.value; 
          this.email=this.registerForm.get('email')?.value;
          this.phone=this.registerForm.get('phone')?.value;
          this.address=this.registerForm.get('address')?.value;
          this.password=this.registerForm.get('password')?.value;
          this.confirmPassword=this.registerForm.get('confirmPassword')?.value;
          this.registerModel.name=this.name;
          this.registerModel.email=this.email;
          this.registerModel.phone= this.phone;     
          this.registerModel.address = this.address; 
          this.registerModel.password=this.password;
          this.registerModel.confirmPassword=this.confirmPassword;
          this.clear();
          this.registerForm.disable();
          this.registerService.registration(this.registerModel);

          this.router.navigate(['login']);
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
    this.registerForm.patchValue({
      name:'',
      email:'',
      phone:'',
      address:'',
      password:'',
      confirmPassword:''
    });
  }
}

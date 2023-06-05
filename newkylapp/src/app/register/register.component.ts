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
  name:string | undefined;
  email:string | undefined;
  phone:String = '1234';
  phone1:number = 1234;
  address1:String ="test";
  password:string = "passworD@09";
  confirmPassword:String | undefined;
  registerModel: RegisterModel = new RegisterModel;
  constructor(private fb:FormBuilder,private router:Router, public registerService:RegisterService){}
  ngOnInit(): void 
  {
    this.registerForm = this.fb.group({
      name:['',[Validators.required]],
      phone:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]],
      confirmPassword:['',[Validators.required,Validators.pattern(
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
          this.name=this.registerForm.get('name')?.value; 
          this.email=this.registerForm.get('email')?.value;
          this.address1=this.registerForm.get('address')?.value;
          this.password=this.registerForm.get('password')?.value;
          this.confirmPassword=this.registerForm.get('confirmPassword')?.value;
          this.registerModel.name=this.name;
          this.registerModel.email=this.email;
          this.registerModel.phone= this.phone1;     
          this.registerModel.address = "Bangalore";    
          this.registerModel.password=this.password;
          this.clear();
          this.registerForm.disable();
          this.registerService.registration(this.registerModel).subscribe(data => {
          }, resErr => {
            console.log("err mess" +resErr);
          });
          this.router.navigate(['login']);
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

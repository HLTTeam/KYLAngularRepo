import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../model/login-model';
import { LoginService } from '../service/login.service';
import { LoginRespModel } from '../model/login-resp-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  submitted = false;
  email:string | undefined;
  password:string | undefined;
  userName:string | undefined;
  loginModel: LoginModel = new LoginModel;
  loginRespModel: LoginRespModel = new LoginRespModel;
  bearerToken : String = "Bearer asdfas342";
  userProfileID :string | undefined;
  errorMessage : string | undefined;
  showMsg : boolean = false;

  constructor(private fb:FormBuilder,private router:Router,public loginservice:LoginService){}
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
       if(true)
       {
          localStorage.setItem("email",this.loginForm.get('email')?.value);
          localStorage.setItem("password",this.loginForm.get('password')?.value);  
          this.email=this.loginForm.get('email')?.value;
          this.userName=this.loginForm.get('email')?.value;
          this.password=this.loginForm.get('password')?.value;
          this.loginModel.email=this.email;
          this.loginModel.password=this.password;
          this.loginModel.userName=this.userName;
          this.clear();
          this.loginForm.disable();
          this.loginservice.login(this.loginModel).subscribe(data => {
            this.loginRespModel = data;
            this.userProfileID = this.loginRespModel['id'];
            console.log(this.userProfileID);
            localStorage.setItem("userProfileID",this.userProfileID as string);  
          }, (error) => {
              console.log('error staus' + error.status);
              if (error.status == 400) {
                this.errorMessage = "XML mapping config already exist in adapter system.";
              } else if (error.status == 401) {
                this.errorMessage = "Unauthorized Request. API key is missing or invalid.";
              } else if (error.status == 404) {
                this.errorMessage = "Resource not found.";
              } else if (error.status == 417) {
                this.errorMessage = "Invalid data please provide correct data.";
              } else {
                this.errorMessage = "Invalid data please provide correct data.";
              } 
              this.showMsg = true;
            console.log("err mess" +this.errorMessage);
          });
          console.log(this.loginRespModel);
          console.log(JSON.stringify(this.loginRespModel));
          console.log((localStorage.getItem("userProfileID") ));
          console.log((this.userProfileID != null));
          if (localStorage.getItem("userProfileID") != null){
            console.log("UserProfileID is not null");
            this.router.navigate(['loandetails']);
          }else{
          console.log("UserProfileID is  null");
          //this.router.navigate(['login']);
          this.router.navigate(['login']);
          //error message on the that invalid credentilals
          }
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


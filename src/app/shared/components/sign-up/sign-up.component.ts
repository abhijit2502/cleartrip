import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit,OnDestroy{

  @Output()
  emitSignInAction:EventEmitter<String> = new EventEmitter();

  signUpForm!:FormGroup;
  displayOtpField:boolean=false;
  displayVerifyOtp:boolean=false;
  otpGenerated!:number;
  otpEntered!:number;
  otpCounter!:number;
  obs:Subscription = new Subscription();

  constructor(private fb:FormBuilder,private http:HttpService){

  }
  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

  ngOnInit(): void {
      this.initializeForm();

     
  }

  initializeForm(){
  this.signUpForm=this.fb.group({
    'userName':['',[Validators.required]],
    'email':[''],
    'mobile':['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
    'otpVerified':[false],
    'password':['',[Validators.required]]
  })
  }

  getOtp(){
    this.displayOtpField=true;
    this.displayVerifyOtp=true;

    this.otpGenerated= Math.floor(1000+Math.random()*9000);

    this.obs=interval(1000).subscribe((el:any)=>{
      this.otpCounter=30 - el;
      if(this.otpCounter == 0){
        this.obs.unsubscribe();
      }
    })
    console.log("Otp",this.otpGenerated);
    alert("Your otp is"+ this.otpGenerated)
  }

  verifyOtp(){
   if(this.otpEntered && this.otpGenerated == this.otpEntered){
    this.displayVerifyOtp=false;
    this.displayOtpField=false;
    this.signUpForm.get('otpVerified')?.setValue(true);
    this.obs.unsubscribe();
   }
   else{
    alert("Please Enter Valid Otp")
   }
  }

  changeOtp(event:any){
    if(event){
      this.otpEntered=event.target.value;
      console.log("Otp entered ",this.otpEntered)
    }
  }

  navigateToSignIn(){
    this.emitSignInAction.emit("Login");
  }

  signUp(){
    const data=this.signUpForm.value;
    this.http.postDataFromServer('users',data).subscribe((resp:any)=>{
    console.log("Data saved successfully");
    alert("Users Registered Successfully")
    },
    error=>{

    })

  }


}

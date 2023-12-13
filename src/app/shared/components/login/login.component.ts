import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output()
  emitAction: EventEmitter<String> = new EventEmitter();

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private auth: AuthService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  navigateToSignUp() {
    this.emitAction.emit("Sign-Up");
  }

  login() {
    if (this.loginForm.valid) {
      const httpParams = new HttpParams()
        .set('email', this.loginForm.get('email')?.value)
        .set('password', this.loginForm.get('password')?.value)

      this.http.getDataFromServer('users', httpParams).subscribe((resp: any) => {
        if (resp && resp.length > 0) {
          this.auth.addUserDetails(resp[0]);
          alert("Login Successfull");
        }
        else {
          console.log(resp);
          alert("Enter Valid Credentials")
        }
      })
    }
    else{
      alert("Enter Login Credentials")
    }

  }

}

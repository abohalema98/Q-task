import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm!: FormGroup;


  constructor(private authService: AuthService, private router: Router) { }

  onGoogleLogin() {
    return this.authService.GoogleAuth()
  }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      "Email": new FormControl('', Validators.required),
      "Password": new FormControl('', Validators.required)
    })
  } // ng Init
  onLogin() {

    this.authService.onloginUser(this.LoginForm.value.Email, this.LoginForm.value.Password)
      .subscribe(isUserAuth => {
        this.router.navigate(['dataView']);
      }, error => {
        console.error(error)
      })
  }
}

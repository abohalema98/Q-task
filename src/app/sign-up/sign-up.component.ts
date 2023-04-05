
import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {

  privacyPolicyUrl!: string;
  user!: SocialUser;
  loggedIn!: boolean;
  signUpForm!: FormGroup;

  onSignUp() {
    if (this.signUpForm.invalid) {
      return
    }
    this.authService.registerUser(this.signUpForm.value).subscribe(d => {
      console.log(d)
      this.router.navigate(['dataView']);

    }, err => {
      alert(err.error)
    }
    )
  }

  constructor(
    private authService: AuthService,
    private SocialAuthService: SocialAuthService,
    private location: Location,
    private router: Router) {
    ;

  }

  GoogleAuthSignUp() {
    return this.authService.GoogleAuth()
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        'firstName': new FormControl('', [Validators.required, Validators.minLength(4)]),
        'lastName': new FormControl('', [Validators.required, Validators.minLength(4)]),
        'Email': new FormControl('', [Validators.required, Validators.email]),
        'phoneNumber': new FormControl('', [Validators.required]),
        'Password': new FormControl('', [Validators.required]),
        'confirm_password': new FormControl('', [Validators.required]),

      }
    ),
      this.SocialAuthService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
  }

  // fb 
  async signInWithFB() {
    this.SocialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigate(['/dashboard'])
    })
      .catch(err => { console.log(err) })

  }

  signOut(): void {
    this.SocialAuthService.signOut();
  }
}

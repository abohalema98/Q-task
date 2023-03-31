
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialUser } from "@abacritt/angularx-social-login";
import { UsersAuthService } from '../services/users-auth.service';
import { Users } from '../models/users';
import { from, switchMap } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  
  user!: SocialUser;
  loggedIn!: boolean;

  signInWithGoogle() {
    return from(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID));


  }

  login() {
    this.signInWithGoogle().pipe(
      switchMap(() => this.authService.authState)
    ).subscribe(user => {
      console.log(user);

    })
  }
  constructor(private authService: SocialAuthService, private UserService: UsersAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);

    });
  }
}

import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {
  baseUrl: string = "http://localhost:3000/api/login";
  Rgister(newUser: any) {
    // return this.http.post<Users>("http://localhost:3000/api/register", newUser)
    console.log({ newUser })
  }

  getAllUser(){
    return this.http.get<Users[]>("http://localhost:3000/api/users")

  }
  constructor(private http: HttpClient, private Router: Router) { }
}

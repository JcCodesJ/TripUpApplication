import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly _usersList : User[] = [
    {
      id:1,
      username: "user",
      email: "pass"
    }
  ]

  private readonly _usernameKey = "connectedUser";
  private readonly _jwtKey = "api-jwt";
  private readonly _apiUrl = "http://localhost:8080"

  constructor(private _client : HttpClient) { }

  // login( credentials: Credentials ) {
  //
  //   const obs = this._client.post(this._apiUrl+'/login', credentials) as Observable<LoginSuccess>;
  //   obs.subscribe({
  //     next: response => {
  //       sessionStorage.setItem(this._jwtKey, response.jwt);
  //       sessionStorage.setItem(this._usernameKey, response.username);
  //     }
  //   })
  //   return obs;
  // }


}

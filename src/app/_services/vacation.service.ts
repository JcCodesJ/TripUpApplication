import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vacation} from "../models/vacation.model";
import {Observable} from "rxjs";
import {VacationForm} from "../models/vacationForm.model";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private _apiUrl = "http://localhost:8080/vacation";

  constructor(private _client: HttpClient, private tokenStorageService: TokenStorageService) { }

  getAll() : Observable<Vacation[]>{
    return this._client.get( this._apiUrl+"/getvacas" ) as Observable<Vacation[]>;
  }

  postVacation(toPost: VacationForm) : Observable<Vacation>{
    return this._client.post( this._apiUrl, toPost ) as Observable<Vacation>;
  }

  public hideVacation(toHide: String): Observable<Vacation>{
    console.log(this._apiUrl+"/hide/"+toHide)
    const headers = new HttpHeaders(
      {
        'Authorization': this.tokenStorageService.getToken() as string
      });
    console.log(this.tokenStorageService.getToken() )
    return this._client.put( this._apiUrl+"/hide/"+toHide, {
      headers: headers,
      withCredentials: true
    }) as Observable<Vacation>;
  }
}

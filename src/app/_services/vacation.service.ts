import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vacation} from "../models/vacation.model";
import {Observable} from "rxjs";
import {VacationForm} from "../models/vacationForm.model";

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private _apiUrl = "http://localhost:8080/vacation";

  constructor(private _client: HttpClient) { }

  getAll() : Observable<Vacation[]>{
    return this._client.get( this._apiUrl+"/getvacas" ) as Observable<Vacation[]>;
  }

  postVacation(toPost: VacationForm) : Observable<Vacation>{
    return this._client.post( this._apiUrl, toPost ) as Observable<Vacation>;
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResRequest} from "../models/res-request.model";
import {Observable} from "rxjs";
import {Reservation} from "../models/reservation.model";
import {SessionService} from "./session.service";
import {TokenStorageService} from "./token-storage.service";
import {Vacation} from "../models/vacation.model";

@Injectable({
  providedIn: 'root'
})
export class ResService {

  private readonly _apiUrl = "http://localhost:8080/reservation"
  constructor(private _client: HttpClient, private _sServ: SessionService, private tokenStorageService: TokenStorageService) { }

  public sendResRequest(request : ResRequest) : Observable<Reservation>{
    const headers = new HttpHeaders(
      {
        'Authorization': this.tokenStorageService.getToken() as string
      });
    console.log(request)
    return this._client.post(
      this._apiUrl+"",
      request,
      {
        headers: headers,
        withCredentials: true
      }
    ) as Observable<Reservation>;
  }

  public getReservation(id: number): Observable<Reservation>{
    return this._client.get(this._apiUrl+'/'+id) as Observable<Reservation>;
  }

  public getMyReservations() {
    const headers = new HttpHeaders(
      {
        'Authorization': this.tokenStorageService.getToken() as string
      });
    return this._client.get(
      this._apiUrl+"/getMyReservations",
      {
        headers: headers,
        withCredentials: true
      }
    ) as Observable<Reservation[]>;
  }

  public getAllReservations() {
    const headers = new HttpHeaders(
      {
        'Authorization': this.tokenStorageService.getToken() as string
      });
    return this._client.get(
      this._apiUrl+"/getAllReservations",
      {
        headers: headers,
        withCredentials: true
      }
    ) as Observable<Reservation[]>;
  }
}

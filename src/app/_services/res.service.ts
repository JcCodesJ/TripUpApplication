import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResRequest} from "../models/res-request.model";
import {Observable} from "rxjs";
import {Reservation} from "../models/reservation.model";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class ResService {

  private readonly _apiUrl = "http://localhost:8080/reservation"

  constructor(private _client: HttpClient, private _sServ: SessionService) { }

  public sendResRequest(request : ResRequest) : Observable<Reservation>{
    return this._client.post(
      this._apiUrl+"/request",
      request,
      {
        headers: {
          'Authorization': this._sServ.getApiKey()
        },
        withCredentials: true
      }
    ) as Observable<Reservation>;
  }

  public getReservation(id: number): Observable<Reservation>{
    return this._client.get(this._apiUrl+'/'+id) as Observable<Reservation>;
  }

}

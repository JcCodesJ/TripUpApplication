import { Component, OnInit } from '@angular/core';
import {ResService} from "../_services/res.service";
import {Vacation} from "../models/vacation.model";
import {Reservation} from "../models/reservation.model";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  reserveList: Reservation [] = [];

  constructor(private resService: ResService) { }

  ngOnInit(): void {
    // this.resService.getReservation(this.id).subscribe({
    //   next: response => this.reserve = response
    //     ,
    //   error: err =>
    //     this.content = JSON.parse(err.error).message
    // )}
    }
}


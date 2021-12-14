import { Component, OnInit } from '@angular/core';
import {ResService} from "../_services/res.service";
import {Reservation} from "../models/reservation.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  reserveList: Reservation [] = [];

   id: number;
   reserve: Reservation | null = null;

  constructor(private resService: ResService, route: ActivatedRoute) {
    this.id = route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.resService.getReservation(this.id).subscribe({
      next: response => this.reserve = response,
      error: err => JSON.parse(err.error).message
    })
    }
}

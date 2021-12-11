import { Component, OnInit } from '@angular/core';
import {ResService} from "../_services/res.service";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {



  constructor(private resService: ResService) { }

  ngOnInit(): void {
    this.resService.getReservation(this.id).subscribe({
      next: response => this.reserve = response
        ,
      error: err =>
        this.content = JSON.parse(err.error).message
    )}
    }
}


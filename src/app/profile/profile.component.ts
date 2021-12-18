import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {ResService} from "../_services/res.service";
import {Reservation} from "../models/reservation.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  myReservations: Reservation [] = [];

  headElements = ['ID', 'Depart', 'Return', 'nmbrTravelers', 'Vacation', 'Price'];

  constructor(private resService: ResService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.getAll()
    this.currentUser = this.token.getUser();

  }

  getAll() {
    this.resService.getMyReservations()
      .subscribe({
        next: data => {
          this.myReservations = data;
          console.log(this.myReservations)
        }
        ,
        error: err => {
          JSON.parse(err.error).message;
        }
      })
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {Reservation} from "../models/reservation.model";
import {ResService} from "../_services/res.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  content?: string;
  currentUser: any;
  myReservations: Reservation [] = [];

  headElements = ['ID', 'Client name', 'Client Email', 'Depart', 'Return', '# Travelers', 'Vacation', 'Price of Vacation', 'Total price'];


  constructor(private userService: UserService, private resService: ResService, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.userService.getAgentBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.getAll()
    this.currentUser = this.token.getUser()

  }

  getAll() {
    this.resService.getAllReservations()
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

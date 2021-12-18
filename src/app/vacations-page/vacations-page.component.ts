import { Component, OnInit } from '@angular/core';
import {VacationService} from "../_services/vacation.service";
import {Vacation} from "../models/vacation.model";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TokenStorageService} from "../_services/token-storage.service";


@Component({
  selector: 'app-vacations-page',
  templateUrl: './vacations-page.component.html',
  styleUrls: ['./vacations-page.component.css']
})
export class VacationsPageComponent implements OnInit {

  vacationList: Vacation [] = [];

  isLoggedIn = false;


  tripsList = [
    {
      package: {
        packageName: "Tropicality",
        type: "PREMADE",
        price: 4000,
        img: 'assets/images/maldives.jpg'
      },
      numWanted: 1
    },
    {
      package: {
        packageName: "BelgianVenture",
        type: "PREMADE",
        price: 3000,
        img: 'assets/images/brussels-belgium-resto.jpg'
      },
      numWanted: 1
    },
    {
      package: {
        packageName: "SnowTopia",
        type: "PREMADE",
        price: 5000,
        img: 'assets/images/swiss-alphs.jpg'
      },
      numWanted: 1
    }
  ]

  constructor(private vacService: VacationService,private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  getAll() {
    this.vacService.getAll()
      .subscribe({
        next: data => {
          this.vacationList = data;
          console.log(this.vacationList)
         // alert("alert"+JSON.stringify(data));
        }
        ,
        error: err => {
          JSON.parse(err.error).message;
        }
        })
  }

  isConnected() {
    return sessionStorage.getItem("connectedUser") != undefined;
  }

  makeReservation(packageName: string) {
    this.router.navigate(['/makeReservation', { packageName: packageName }]);

  }
}

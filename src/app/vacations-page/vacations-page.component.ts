import { Component, OnInit } from '@angular/core';
import {VacationService} from "../_services/vacation.service";
import {Vacation} from "../models/vacation.model";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-vacations-page',
  templateUrl: './vacations-page.component.html',
  styleUrls: ['./vacations-page.component.css']
})
export class VacationsPageComponent implements OnInit {

  vacationList: Vacation [] = [];


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

  constructor(private vacService: VacationService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.vacService.getAll()
      .subscribe({
        next: data => {
          this.vacationList = data;
          alert("alert"+JSON.stringify(data));
        }
        ,
        error: err => {
          console.log("error");
        }
        }
      )

  }

  isConnected() {
    return sessionStorage.getItem("connectedUser") != undefined;
  }

  makeReservation(packageName: string) {
    this.router.navigate(['/makeReservation', { packageName: packageName }]);

  }
}

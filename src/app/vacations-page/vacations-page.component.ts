import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacations-page',
  templateUrl: './vacations-page.component.html',
  styleUrls: ['./vacations-page.component.css']
})
export class VacationsPageComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  isConnected() {
    return sessionStorage.getItem("connectedUser") != undefined;
  }

}

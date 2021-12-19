import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {VacationService} from "../_services/vacation.service";
import {Vacation} from "../models/vacation.model";
import {VacationForm} from "../models/vacationForm.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  content?: string;
  vacationList: Vacation [] = [];
  selectedVacation: String

  form: VacationForm = {
    packageName: "",
    description: "",
    price: 0,
    picture_address: "",
    type: "PREMADE"
  };

  constructor(private userService: UserService, private vacService: VacationService, private _router: Router) {
    this.selectedVacation = "";
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.getAllVacations();

  }

  getAllVacations() {
    this.vacService.getAll()
      .subscribe({
        next: data => {
          this.vacationList = data;
          this.selectedVacation = this.vacationList[0].packageName
        },
        error: err => {
          JSON.parse(err.error).message;
        }
      })
  }

  hideVacation() {
    console.log(this.selectedVacation)
    this.vacService.hideVacation(this.selectedVacation)
      .subscribe({
        next: data => {
          alert("vacation removed")
          this.getAllVacations()
        },
        error: err => {
          JSON.parse(err.error).message;
        }
      })
  }

  // @ts-ignore
  selectedVacationChange(event) {
    this.selectedVacation = event.target.value
  }

  onSubmit(): void {
    console.log(this.form)
    this.vacService.postVacation(this.form).subscribe({
      next: data =>
      {
        console.log(data);
        alert('Vacation added')
        this._router.navigate(['vacations'])
      }
      ,
      error: err => {
      }
    });
  }
}

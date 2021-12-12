import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ResService} from "../_services/res.service";
import {ResRequest} from "../models/res-request.model";

@Component({
  selector: 'app-secured-request-form',
  templateUrl: './secured-request-form.component.html',
  styleUrls: ['./secured-request-form.component.css']
})
export class SecuredRequestFormComponent implements OnInit {

  datesInvalid: boolean = false;
  packageNameReservation: string ="empty";
  selectedVacation: string ="";

  resForm = new FormGroup({
    'vacation': new FormControl('BASIC', [Validators.required]),
    'depart': new FormControl(null, [Validators.required]),
    'return': new FormControl(null, [Validators.required]),
    'nmbrTravelers': new FormControl(1, [Validators.required, Validators.min(1)]),
  })
  packageNameReservationFilled: boolean = false;

  constructor(private _rServ: ResService, private _router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( (params)=> {
      if(params['packageName']){
        this.packageNameReservationFilled = true
        this.packageNameReservation = params['packageName']
        this.selectedVacation = this.packageNameReservation

      }else{
        this.packageNameReservationFilled = false
        this.packageNameReservation = "empty";
      }
      console.log(this.packageNameReservation)
      console.log(this.packageNameReservationFilled)
    }

  );
  }

  // @ts-ignore
  onSubmit(logs){
    if (this.resForm.valid) {
      console.log(logs.vacation)
      console.log(logs.depart)
      console.log(logs.return)
      console.log(logs.nmbrTravelers)
      let
      reservationToSend = {
        packageName: logs.vacation,
        departs: logs.depart,
        returns: logs.return,
        nmbrTravelers: logs.nmbrTravelers
      }
      this._rServ.sendResRequest(reservationToSend).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.datesInvalid = false;
            this._router.navigate(['reservation-detail', response.id])
          },
          error: (err) => {
            console.error(err);
            if (err.status == 400) {
              this.datesInvalid = true;
            }
          }
        }
      );
    }
  }
}

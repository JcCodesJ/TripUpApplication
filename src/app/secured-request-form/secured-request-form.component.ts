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
  packageNameReservation: string = "empty";
  selectedVacation: string = "";
  packageNameReservationFilled: boolean = false;

  resForm = new FormGroup({
    'packageName': new FormControl(null, [Validators.required]),
    'departs': new FormControl(null, [Validators.required]),
    'returns': new FormControl(null, [Validators.required]),
    'nmbrTravelers': new FormControl(1, [Validators.required, Validators.min(1)]),
  })

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
      // console.log(this.packageNameReservation)
      // console.log(this.packageNameReservationFilled)
    }

  );
  }


  onSubmit(){
    if (this.resForm.valid) {

      console.log(this.resForm.value)
      console.log(this._rServ)
      this._rServ.sendResRequest(this.resForm.value).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.datesInvalid = false;
            this._router.navigate(['reservation', response.id])
          },
          error: (err) => {
            console.error(err);
            if (err.status == 400) {
              this.datesInvalid = true;
            }
            this._router.navigate(['reservation'])
          }
        }
      );
    }
  }
}

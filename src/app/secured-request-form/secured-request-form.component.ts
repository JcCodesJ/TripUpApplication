import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ResService} from "../_services/res.service";

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
  today: Date;
  resForm = new FormGroup({
    'packageName': new FormControl(null, [Validators.required]),
    'departs': new FormControl(null, [Validators.required], ),
    'returns': new FormControl(null, [Validators.required]),
    'nmbrTravelers': new FormControl(1, [Validators.required, Validators.min(1)]),
  })

  constructor(private _rServ: ResService, private _router: Router, private activatedRouter: ActivatedRoute) {
    this.today = new Date();
    console.log(this.today)
  }

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


  onSubmit() {
    if (this.resForm.valid) {

      // @ts-ignore
      if (this.resForm.get('returns').value <= this.resForm.get('departs').value) {
        alert("Returns needs to be after departs")
      } else {
        // @ts-ignore
        if (new Date(this.resForm.get('departs').value) < new Date(this.today.valueOf()) || new Date(this.resForm.get('returns').value) < new Date(this.today.valueOf()) ) {
          alert("Returns and departs need to be after today")
        } else {
          this._rServ.sendResRequest(this.resForm.value).subscribe(
            {
              next: (response) => {
                console.log(response);
                this.datesInvalid = false;
                this._router.navigate(['profile'])
              },
              error: (err) => {
                console.error(err);
                if (err.status == 400) {
                  this.datesInvalid = true;
                }
                this._router.navigate(['profile'])
              }
            }
          );
        }
      }
    }
  }
}

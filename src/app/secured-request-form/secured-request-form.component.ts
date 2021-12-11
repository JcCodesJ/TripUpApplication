import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ResService} from "../_services/res.service";

@Component({
  selector: 'app-secured-request-form',
  templateUrl: './secured-request-form.component.html',
  styleUrls: ['./secured-request-form.component.css']
})
export class SecuredRequestFormComponent implements OnInit {

  datesInvalid: boolean = false;

  resForm = new FormGroup({
    'vacation': new FormControl('BASIC', [Validators.required]),
    'depart': new FormControl(null, [Validators.required]),
    'return': new FormControl(null, [Validators.required]),
    'nmbrTravelers': new FormControl(1, [Validators.required, Validators.min(1)]),
  })

  constructor(private _rServ: ResService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if( this.resForm.valid ){
      this._rServ.sendResRequest( this.resForm.value ).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.datesInvalid = false;
            this._router.navigate(['reservation-detail', response.id])
          },
          error: (err) => {
            console.error(err);
            if(err.status == 400){
              this.datesInvalid = true;
            }
          }
        }
      );
    }
  }
}

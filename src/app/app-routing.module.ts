import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {AgentComponent} from "./agent/agent.component";
import {SecuredRequestFormComponent} from "./secured-request-form/secured-request-form.component";
import {ReservationDetailsComponent} from "./reservation-details/reservation-details.component";
import {VacationsPageComponent} from "./vacations-page/vacations-page.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: UserComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'vacations', component: VacationsPageComponent },
  { path: 'reservation', component: ReservationDetailsComponent },
  {path: 'makeReservation', component: SecuredRequestFormComponent, children: [
      {path: ':packageName', component: SecuredRequestFormComponent}
    ]},
  { path: 'reservation/:id', component: ReservationDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

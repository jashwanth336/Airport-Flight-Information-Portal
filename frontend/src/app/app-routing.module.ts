import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { AirportServicesComponent } from './components/airport-services/airport-services.component';
import { FlightBookingComponent } from './components/flight-booking/flight-booking.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { BaggageRecordsComponent } from './components/baggage-records/baggage-records.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'flights/:id', component: FlightDetailsComponent },
  { path: 'services', component: AirportServicesComponent },
  { path: 'booking', component: FlightBookingComponent, canActivate: [AuthGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard] },
  { path: 'baggage-records', component: BaggageRecordsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: PassengerProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

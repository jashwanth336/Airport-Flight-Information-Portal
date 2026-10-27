import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
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

import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    FlightsComponent,
    FlightDetailsComponent,
    AirportServicesComponent,
    FlightBookingComponent,
    MyBookingsComponent,
    BaggageRecordsComponent,
    PassengerProfileComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

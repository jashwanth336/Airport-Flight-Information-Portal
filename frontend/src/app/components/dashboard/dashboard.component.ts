import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlightService } from '../../services/flight.service';
import { BookingService } from '../../services/booking.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = '';
  activeBookingsCount = 0;
  miles = 24500;
  upcomingFlights: Flight[] = [];

  constructor(
    private authService: AuthService,
    private flightService: FlightService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      if (u) {
        this.userName = u.name;
        this.miles = u.milesBalance || 500;
      }
    });

    this.bookingService.getUserBookings().subscribe({
      next: (res) => {
        this.activeBookingsCount = res.count;
      }
    });

    this.flightService.getFlights().subscribe({
      next: (res) => {
        this.upcomingFlights = res.flights.slice(0, 3);
      }
    });
  }
}

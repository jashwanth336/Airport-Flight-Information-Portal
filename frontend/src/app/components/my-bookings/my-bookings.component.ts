import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;
  message = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getUserBookings().subscribe({
      next: (res) => {
        this.bookings = res.bookings;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  cancel(id: number): void {
    if (confirm('Are you sure you want to cancel this flight reservation?')) {
      this.bookingService.cancelBooking(id).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadBookings();
        }
      });
    }
  }

  checkIn(id: number): void {
    this.bookingService.webCheckIn(id).subscribe({
      next: (res) => {
        this.message = res.message;
        this.loadBookings();
      }
    });
  }
}

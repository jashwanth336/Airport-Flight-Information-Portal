import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { BookingService } from '../../services/booking.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  flights: Flight[] = [];
  selectedFlight: Flight | null = null;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFlights();
  }

  initForm(): void {
    this.bookingForm = this.fb.group({
      flightId: ['', Validators.required],
      passengerName: ['', [Validators.required, Validators.minLength(3)]],
      passportNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{6,12}$/i)]],
      cabinClass: ['Economy', Validators.required],
      seatNumber: ['14B', Validators.required],
      mealPreference: ['Standard', Validators.required],
      luggageCount: [1, [Validators.required, Validators.min(0), Validators.max(4)]]
    });
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe({
      next: (res) => {
        this.flights = res.flights;
        const flightIdParam = this.route.snapshot.queryParamMap.get('flightId');
        if (flightIdParam) {
          this.bookingForm.patchValue({ flightId: parseInt(flightIdParam, 10) });
          this.onFlightChange();
        }
      }
    });
  }

  onFlightChange(): void {
    const id = parseInt(this.bookingForm.get('flightId')?.value, 10);
    this.selectedFlight = this.flights.find(f => f.id === id) || null;
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookingService.createBooking(this.bookingForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.successMessage = `Reservation confirmed! Booking Reference (PNR): ${res.booking.pnrNumber}`;
        setTimeout(() => {
          this.router.navigate(['/my-bookings']);
        }, 2500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Flight booking failed. Please try again.';
      }
    });
  }
}

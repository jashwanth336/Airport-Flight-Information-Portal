import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flight: Flight | null = null;
  isLoading = true;
  errorMsg = '';

  constructor(private route: ActivatedRoute, private flightService: FlightService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.flightService.getFlightById(id).subscribe({
        next: (res) => {
          this.flight = res.flight;
          this.isLoading = false;
        },
        error: () => {
          this.errorMsg = 'Unable to load flight specifications.';
          this.isLoading = false;
        }
      });
    }
  }
}

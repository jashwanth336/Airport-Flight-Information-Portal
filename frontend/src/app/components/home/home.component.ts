import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  featuredFlights: Flight[] = [];
  isLoading = true;

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.flightService.getFlights().subscribe({
      next: (res) => {
        this.featuredFlights = res.flights.slice(0, 4);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/flights'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/flights']);
    }
  }
}

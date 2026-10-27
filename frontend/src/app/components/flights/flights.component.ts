import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  isLoading = true;

  // Filter state
  activeTab: 'All' | 'Departure' | 'Arrival' = 'All';
  searchQuery = '';
  selectedAirline = '';
  selectedStatus = '';

  airlines: string[] = ['Emirates', 'Delta Air Lines', 'Singapore Airlines', 'Lufthansa', 'Qatar Airways'];

  constructor(private flightService: FlightService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      this.loadFlights();
    });
  }

  loadFlights(): void {
    this.isLoading = true;
    this.flightService.getFlights().subscribe({
      next: (res) => {
        this.flights = res.flights;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  setTab(tab: 'All' | 'Departure' | 'Arrival'): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.flights];

    if (this.activeTab !== 'All') {
      result = result.filter(f => f.flightType === this.activeTab);
    }
    if (this.selectedAirline) {
      result = result.filter(f => f.airline === this.selectedAirline);
    }
    if (this.selectedStatus) {
      result = result.filter(f => f.status === this.selectedStatus);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(f =>
        f.flightNumber.toLowerCase().includes(q) ||
        f.originCity.toLowerCase().includes(q) ||
        f.destinationCity.toLowerCase().includes(q) ||
        f.airline.toLowerCase().includes(q)
      );
    }

    this.filteredFlights = result;
  }
}

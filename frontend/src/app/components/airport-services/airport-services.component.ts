import { Component, OnInit } from '@angular/core';
import { AirportServiceService } from '../../services/airport-service.service';
import { AirportServiceItem } from '../../models/airport-service.model';

@Component({
  selector: 'app-airport-services',
  templateUrl: './airport-services.component.html',
  styleUrls: ['./airport-services.component.css']
})
export class AirportServicesComponent implements OnInit {
  services: AirportServiceItem[] = [];
  isLoading = true;

  constructor(private serviceApi: AirportServiceService) {}

  ngOnInit(): void {
    this.serviceApi.getServices().subscribe({
      next: (res) => {
        this.services = res.services;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}

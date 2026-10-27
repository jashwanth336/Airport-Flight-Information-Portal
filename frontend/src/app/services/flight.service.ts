import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient) {}

  getFlights(filterParams?: { type?: string; airline?: string; status?: string; search?: string }): Observable<{ success: boolean; count: number; flights: Flight[] }> {
    let params = new HttpParams();
    if (filterParams) {
      if (filterParams.type) params = params.set('type', filterParams.type);
      if (filterParams.airline) params = params.set('airline', filterParams.airline);
      if (filterParams.status) params = params.set('status', filterParams.status);
      if (filterParams.search) params = params.set('search', filterParams.search);
    }
    return this.http.get<{ success: boolean; count: number; flights: Flight[] }>(this.apiUrl, { params });
  }

  getFlightById(id: string | number): Observable<{ success: boolean; flight: Flight }> {
    return this.http.get<{ success: boolean; flight: Flight }>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirportServiceItem } from '../models/airport-service.model';

@Injectable({
  providedIn: 'root'
})
export class AirportServiceService {
  private apiUrl = 'http://localhost:3000/api/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<{ success: boolean; count: number; services: AirportServiceItem[] }> {
    return this.http.get<{ success: boolean; count: number; services: AirportServiceItem[] }>(this.apiUrl);
  }

  getServiceById(id: number): Observable<{ success: boolean; service: AirportServiceItem }> {
    return this.http.get<{ success: boolean; service: AirportServiceItem }>(`${this.apiUrl}/${id}`);
  }
}

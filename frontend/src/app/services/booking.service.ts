import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) {}

  getUserBookings(): Observable<{ success: boolean; count: number; bookings: Booking[] }> {
    return this.http.get<{ success: boolean; count: number; bookings: Booking[] }>(this.apiUrl);
  }

  createBooking(bookingData: any): Observable<{ success: boolean; message: string; booking: Booking }> {
    return this.http.post<{ success: boolean; message: string; booking: Booking }>(this.apiUrl, bookingData);
  }

  cancelBooking(id: number): Observable<{ success: boolean; message: string; booking: Booking }> {
    return this.http.delete<{ success: boolean; message: string; booking: Booking }>(`${this.apiUrl}/${id}`);
  }

  webCheckIn(id: number): Observable<{ success: boolean; message: string; booking: Booking }> {
    return this.http.put<{ success: boolean; message: string; booking: Booking }>(`${this.apiUrl}/${id}/checkin`, {});
  }
}

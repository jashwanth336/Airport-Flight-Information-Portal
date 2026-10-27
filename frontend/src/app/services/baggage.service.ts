import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaggageRecord } from '../models/baggage.model';

@Injectable({
  providedIn: 'root'
})
export class BaggageService {
  private apiUrl = 'http://localhost:3000/api/baggage-records';

  constructor(private http: HttpClient) {}

  getBaggageRecords(): Observable<{ success: boolean; count: number; records: BaggageRecord[] }> {
    return this.http.get<{ success: boolean; count: number; records: BaggageRecord[] }>(this.apiUrl);
  }

  trackByTag(tagId: string): Observable<{ success: boolean; record: BaggageRecord }> {
    return this.http.get<{ success: boolean; record: BaggageRecord }>(`${this.apiUrl}/${tagId}`);
  }
}

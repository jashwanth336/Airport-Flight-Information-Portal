import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<{ success: boolean; profile: UserProfile }> {
    return this.http.get<{ success: boolean; profile: UserProfile }>(this.apiUrl);
  }

  updateProfile(data: Partial<UserProfile>): Observable<{ success: boolean; message: string; profile: UserProfile }> {
    return this.http.put<{ success: boolean; message: string; profile: UserProfile }>(this.apiUrl, data);
  }
}

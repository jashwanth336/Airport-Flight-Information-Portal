import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../../services/passenger.service';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
})
export class PassengerProfileComponent implements OnInit {
  profile: UserProfile = {
    id: 1,
    name: 'Captain John Miller',
    email: 'john.miller@example.com',
    phone: '+1-555-019-2834',
    passportNumber: 'P89234120',
    nationality: 'United States',
    frequentFlyerNumber: 'AG-882914',
    milesBalance: 24500
  };
  isEditing = false;
  message = '';

  constructor(private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.passengerService.getProfile().subscribe({
      next: (res) => {
        if (res && res.profile) {
          this.profile = res.profile;
        }
      }
    });
  }

  saveProfile(): void {
    this.passengerService.updateProfile(this.profile).subscribe({
      next: (res) => {
        if (res && res.profile) {
          this.profile = res.profile;
        }
        this.isEditing = false;
        this.message = 'Profile updated successfully!';
        setTimeout(() => this.message = '', 3000);
      }
    });
  }
}

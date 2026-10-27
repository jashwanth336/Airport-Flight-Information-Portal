import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    subject: '',
    category: 'Flight Inquiry',
    message: ''
  };
  successMessage = '';
  isSubmitting = false;

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) return;
    this.isSubmitting = true;
    this.contactService.sendMessage(this.contactData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.successMessage = res.message;
        this.contactData = { name: '', email: '', subject: '', category: 'Flight Inquiry', message: '' };
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}

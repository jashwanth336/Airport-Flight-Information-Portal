import { Component, OnInit } from '@angular/core';
import { BaggageService } from '../../services/baggage.service';
import { BaggageRecord } from '../../models/baggage.model';

@Component({
  selector: 'app-baggage-records',
  templateUrl: './baggage-records.component.html',
  styleUrls: ['./baggage-records.component.css']
})
export class BaggageRecordsComponent implements OnInit {
  records: BaggageRecord[] = [];
  isLoading = true;
  searchTag = '';
  searchedRecord: BaggageRecord | null = null;
  searchError = '';

  constructor(private baggageService: BaggageService) {}

  ngOnInit(): void {
    this.baggageService.getBaggageRecords().subscribe({
      next: (res) => {
        this.records = res.records;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onTrack(): void {
    if (!this.searchTag.trim()) return;
    this.searchError = '';
    this.searchedRecord = null;
    this.baggageService.trackByTag(this.searchTag.trim()).subscribe({
      next: (res) => {
        this.searchedRecord = res.record;
      },
      error: () => {
        this.searchError = 'No baggage record found for tag ' + this.searchTag;
      }
    });
  }
}

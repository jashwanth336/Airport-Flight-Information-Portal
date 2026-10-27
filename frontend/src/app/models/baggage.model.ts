export interface BaggageRecord {
  id: number;
  bookingId: number;
  userId: number;
  tagNumber: string;
  pnrNumber: string;
  flightNumber: string;
  bagCount: number;
  weightKg: number;
  status: string;
  carouselNumber: string;
  lastUpdated: string;
  trackingHistory?: { checkpoint: string; time: string; completed: boolean }[];
}

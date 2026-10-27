export interface Booking {
  id: number;
  userId: number;
  flightId: number;
  pnrNumber: string;
  passengerName: string;
  passportNumber: string;
  flightNumber: string;
  airline: string;
  route: string;
  travelDate: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
  seatNumber: string;
  mealPreference: string;
  luggageCount: number;
  totalFare: number;
  status: 'Confirmed' | 'Checked-In' | 'Cancelled';
  bookingDate: string;
}

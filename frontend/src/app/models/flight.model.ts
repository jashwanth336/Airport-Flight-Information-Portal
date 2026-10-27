export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  originCity: string;
  originCode: string;
  destinationCity: string;
  destinationCode: string;
  flightType: 'Departure' | 'Arrival';
  scheduledDeparture: string;
  scheduledArrival: string;
  terminal: string;
  gate: string;
  status: 'On Time' | 'Boarding' | 'Delayed' | 'Departed' | 'Landed';
  aircraftModel: string;
  economyFare: number;
  businessFare: number;
  availableSeats: number;
  baggageCarousel: string;
  logoUrl?: string;
  amenities?: string[];
}

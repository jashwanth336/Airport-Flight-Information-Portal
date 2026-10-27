// In-Memory Database Store for AeroGate
const mockData = {
  users: [
    {
      id: 1,
      name: "Captain John Miller",
      email: "john.miller@example.com",
      phone: "+1-555-019-2834",
      passwordHash: "$2a$10$wN1rB0uL6DkZ1J5U7cEw.uB3i0YcWvYnF/Qd6R8P3L7Y1N1O0X8Q6", // password123
      passportNumber: "P89234120",
      nationality: "United States",
      frequentFlyerNumber: "AG-882914",
      milesBalance: 24500
    }
  ],

  flights: [
    {
      id: 1,
      flightNumber: "AG-402",
      airline: "Emirates",
      originCity: "Dubai",
      originCode: "DXB",
      destinationCity: "New York",
      destinationCode: "JFK",
      flightType: "Departure",
      scheduledDeparture: "2026-10-28T08:30:00Z",
      scheduledArrival: "2026-10-28T14:15:00Z",
      terminal: "Terminal 3",
      gate: "B14",
      status: "On Time",
      aircraftModel: "Airbus A380-800",
      economyFare: 620.00,
      businessFare: 2150.00,
      availableSeats: 42,
      baggageCarousel: "Carousel 04",
      logoUrl: "assets/images/emirates.png",
      amenities: ["Wi-Fi", "In-Seat Power", "Hot Meals", "Live TV", "Flatbed Seating in Business"]
    },
    {
      id: 2,
      flightNumber: "AG-184",
      airline: "Delta Air Lines",
      originCity: "Atlanta",
      originCode: "ATL",
      destinationCity: "London",
      destinationCode: "LHR",
      flightType: "Departure",
      scheduledDeparture: "2026-10-28T10:15:00Z",
      scheduledArrival: "2026-10-28T22:45:00Z",
      terminal: "Terminal 2",
      gate: "A08",
      status: "Boarding",
      aircraftModel: "Boeing 787-9 Dreamliner",
      economyFare: 480.00,
      businessFare: 1850.00,
      availableSeats: 12,
      baggageCarousel: "Carousel 02",
      logoUrl: "assets/images/delta.png",
      amenities: ["Wi-Fi", "USB Ports", "Complimentary Drinks", "Movies"]
    },
    {
      id: 3,
      flightNumber: "AG-520",
      airline: "Singapore Airlines",
      originCity: "Singapore",
      originCode: "SIN",
      destinationCity: "Tokyo",
      destinationCode: "HND",
      flightType: "Arrival",
      scheduledDeparture: "2026-10-28T02:00:00Z",
      scheduledArrival: "2026-10-28T09:40:00Z",
      terminal: "Terminal 1",
      gate: "C22",
      status: "Landed",
      aircraftModel: "Airbus A350-900",
      economyFare: 550.00,
      businessFare: 1950.00,
      availableSeats: 0,
      baggageCarousel: "Carousel 07",
      logoUrl: "assets/images/singapore.png",
      amenities: ["Wi-Fi", "World Class Cuisine", "HD In-Flight Entertainment"]
    },
    {
      id: 4,
      flightNumber: "AG-711",
      airline: "Lufthansa",
      originCity: "Frankfurt",
      originCode: "FRA",
      destinationCity: "Chicago",
      destinationCode: "ORD",
      flightType: "Departure",
      scheduledDeparture: "2026-10-28T12:00:00Z",
      scheduledArrival: "2026-10-28T15:30:00Z",
      terminal: "Terminal 1",
      gate: "B04",
      status: "Delayed",
      aircraftModel: "Boeing 747-8 Intercontinental",
      economyFare: 510.00,
      businessFare: 1780.00,
      availableSeats: 29,
      baggageCarousel: "Carousel 05",
      logoUrl: "assets/images/lufthansa.png",
      amenities: ["Wi-Fi", "Bavarian Dining", "Spacious Legroom"]
    },
    {
      id: 5,
      flightNumber: "AG-903",
      airline: "Qatar Airways",
      originCity: "Doha",
      originCode: "DOH",
      destinationCity: "Paris",
      destinationCode: "CDG",
      flightType: "Arrival",
      scheduledDeparture: "2026-10-28T05:20:00Z",
      scheduledArrival: "2026-10-28T11:55:00Z",
      terminal: "Terminal 3",
      gate: "D12",
      status: "On Time",
      aircraftModel: "Airbus A350-1000",
      economyFare: 630.00,
      businessFare: 2300.00,
      availableSeats: 19,
      baggageCarousel: "Carousel 01",
      logoUrl: "assets/images/qatar.png",
      amenities: ["Qsuite Private Cabins", "Super Wi-Fi", "Oryx One Entertainment"]
    }
  ],

  services: [
    {
      id: 1,
      title: "Al Maha VIP Business Lounge",
      category: "Lounges & Relaxation",
      terminalLocation: "Terminal 3, Concourse B (Above Gate B15)",
      openingHours: "24 Hours / 7 Days",
      description: "Quiet relaxation suites, private shower rooms, international hot buffet, high-speed Wi-Fi, and barista coffee bar.",
      imageUrl: "assets/images/lounge.jpg",
      priceInfo: "Free for Business Class / $45 for Day Pass"
    },
    {
      id: 2,
      title: "World Duty Free Superstore",
      category: "Shopping & Retail",
      terminalLocation: "Terminal 1 & 3 Departure Concourses",
      openingHours: "05:00 AM - 01:00 AM Daily",
      description: "Tax-free shopping featuring luxury perfumes, confectionery, Swiss watches, designer sunglasses, and premium electronics.",
      imageUrl: "assets/images/dutyfree.jpg",
      priceInfo: "Tax-Free Retail Pricing"
    },
    {
      id: 3,
      title: "SecureWrap Luggage Protection",
      category: "Baggage Services",
      terminalLocation: "Terminal 1 & 2 Check-in Hall B",
      openingHours: "04:00 AM - 11:00 PM Daily",
      description: "Ultra-durable recyclable film wrapping to protect baggage against tears, scratches, tampering, and harsh transit handling.",
      imageUrl: "assets/images/wrap.jpg",
      priceInfo: "$12 per standard piece"
    },
    {
      id: 4,
      title: "Global Currency Exchange & Banking",
      category: "Financial Services",
      terminalLocation: "All Terminals (Arrivals & Departures)",
      openingHours: "24 Hours Daily",
      description: "Competitive exchange rates for over 65 foreign currencies, multi-currency debit card activation, and international wire support.",
      imageUrl: "assets/images/exchange.jpg",
      priceInfo: "Live Bank Exchange Rates"
    },
    {
      id: 5,
      title: "Express Fast-Track Security Lane",
      category: "Security & Expedited Transit",
      terminalLocation: "Security Checkpoints 1, 2 & 3",
      openingHours: "04:30 AM - Midnight",
      description: "Bypass standard queues with biometric facial scanning and expedited x-ray inspection lanes.",
      imageUrl: "assets/images/fasttrack.jpg",
      priceInfo: "Free for First/Business / $25 Add-On"
    },
    {
      id: 6,
      title: "24/7 Airport Medical Center & Pharmacy",
      category: "Healthcare & First Aid",
      terminalLocation: "Terminal 2, Ground Floor (Near Transit Gate 4)",
      openingHours: "24 Hours / 365 Days",
      description: "Emergency medical response, certified physicians, travel immunizations, oxygen support, and full-service pharmacy.",
      imageUrl: "assets/images/medical.jpg",
      priceInfo: "Consultation / Standard Medical Fees"
    }
  ],

  bookings: [
    {
      id: 1,
      userId: 1,
      flightId: 1,
      pnrNumber: "PNR-AG8921",
      passengerName: "Captain John Miller",
      passportNumber: "P89234120",
      flightNumber: "AG-402",
      airline: "Emirates",
      route: "Dubai (DXB) → New York (JFK)",
      travelDate: "2026-10-28",
      cabinClass: "Business",
      seatNumber: "12A",
      mealPreference: "Standard",
      luggageCount: 2,
      totalFare: 2150.00,
      status: "Confirmed",
      bookingDate: "2026-10-25T14:20:00Z"
    }
  ],

  baggageRecords: [
    {
      id: 1,
      bookingId: 1,
      userId: 1,
      tagNumber: "BAG-902148",
      pnrNumber: "PNR-AG8921",
      flightNumber: "AG-402",
      bagCount: 2,
      weightKg: 38.5,
      status: "Loaded onto Aircraft",
      carouselNumber: "Carousel 04",
      lastUpdated: "2026-10-28T07:45:00Z",
      trackingHistory: [
        { checkpoint: "Check-in Desk Counter B12", time: "06:15 AM", completed: true },
        { checkpoint: "Security Baggage Screening", time: "06:40 AM", completed: true },
        { checkpoint: "Automated Sorting Terminal 3", time: "07:10 AM", completed: true },
        { checkpoint: "Loaded onto Flight AG-402 Hold", time: "07:45 AM", completed: true },
        { checkpoint: "Unloaded at JFK International", time: "Pending", completed: false },
        { checkpoint: "Available on Carousel 04", time: "Pending", completed: false }
      ]
    }
  ],

  contacts: []
};

module.exports = mockData;

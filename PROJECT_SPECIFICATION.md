# AeroGate – Airport Flight Information Portal (AFIP)

### Complete Full-Stack College Project Specification & Implementation Guide

## PROJECT NAME & OVERVIEW

**AeroGate – Airport Flight Information Portal**

Build a modern, responsive, real-time Airport Flight Information Portal (AFIP) suitable for a final-year or semester college project. The portal enables passengers to search and track real-time flight departures and arrivals, view terminal and gate details, explore airport amenities and services, book flights and select seats, manage bookings, track checked baggage status, and access personalized passenger dashboards.

The application is architected as **two separate decoupled projects**:

1. **Frontend**: Angular (v16+) with TypeScript, Angular Router, Reactive Forms, Services, RxJS, and HTTP Interceptors running on `http://localhost:4200`.

2. **Backend**: Node.js + Express.js REST API with JWT Authentication, CORS, and MySQL/JSON in-memory persistence running on `http://localhost:3000`.

Communication between frontend and backend is conducted strictly via asynchronous JSON REST APIs.

## 1. PROJECT STRUCTURE

```
AeroGate/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   ├── footer/
│   │   │   │   ├── home/
│   │   │   │   ├── about/
│   │   │   │   ├── flights/
│   │   │   │   ├── flight-details/
│   │   │   │   ├── airport-services/
│   │   │   │   ├── flight-booking/
│   │   │   │   ├── my-bookings/
│   │   │   │   ├── baggage-records/
│   │   │   │   ├── passenger-profile/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── contact/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── flight.model.ts
│   │   │   │   ├── booking.model.ts
│   │   │   │   ├── airport-service.model.ts
│   │   │   │   ├── baggage.model.ts
│   │   │   │   └── user.model.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── flight.service.ts
│   │   │   │   ├── booking.service.ts
│   │   │   │   ├── airport-service.service.ts
│   │   │   │   ├── baggage.service.ts
│   │   │   │   ├── passenger.service.ts
│   │   │   │   └── contact.service.ts
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── environments/
│   │   │   └── environment.ts
│   │   ├── styles.css
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── angular.json
│
└── backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── flightController.js
    │   ├── bookingController.js
    │   ├── serviceController.js
    │   ├── baggageController.js
    │   ├── passengerController.js
    │   └── contactController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Flight.js
    │   ├── Booking.js
    │   ├── AirportService.js
    │   ├── BaggageRecord.js
    │   └── mockData.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── flightRoutes.js
    │   ├── bookingRoutes.js
    │   ├── serviceRoutes.js
    │   ├── baggageRoutes.js
    │   ├── passengerRoutes.js
    │   └── contactRoutes.js
    ├── .env
    ├── package.json
    ├── schema.sql
    └── server.js

```

* **Frontend Port**: `http://localhost:4200`

* **Backend Port**: `http://localhost:3000`

## 2. ANGULAR FRONTEND

The frontend utilizes modern Angular components for every view. It is not a single static page, but a rich multi-page Single Page Application (SPA) driven by Angular Router.

### Required Angular Pages / Components:

 1. `HomeComponent` (`/home`): Airport landing page with hero banner, live flight search widget, live departures ticker, and services highlight.

 2. `AboutComponent` (`/about`): Airport infrastructure, passenger capacity, terminal maps, history, and executive team.

 3. `FlightsComponent` (`/flights`): Real-time Flight Information Display System (FIDS) for departures and arrivals with dynamic search and multi-criteria filters.

 4. `FlightDetailsComponent` (`/flights/:id`): Deep flight view featuring terminal, gate, aircraft type, baggage carousel, real-time status tracker, and booking button.

 5. `AirportServicesComponent` (`/services`): Directory of lounges, duty-free shopping, luggage wrap, dining, fast-track, and special assistance.

 6. `FlightBookingComponent` (`/booking`): Reactive form to reserve flights, choose travel class, select seats, and provide passport info.

 7. `MyBookingsComponent` (`/my-bookings`): Authenticated user view of active and past flight reservations with cancellation and check-in options.

 8. `BaggageRecordsComponent` (`/baggage-records`): Live checked-luggage tracking system by Baggage Tag ID and PNR.

 9. `PassengerProfileComponent` (`/profile`): View and update passenger personal data, passport numbers, frequent flyer points, and emergency contacts.

10. `DashboardComponent` (`/dashboard`): Passenger portal dashboard displaying upcoming flights, weather at destination, recent bookings, and quick action tiles.

11. `LoginComponent` (`/login`): Reactive form for email/password authentication with JWT handling.

12. `RegisterComponent` (`/register`): Passenger sign-up with field validations and password confirmation.

13. `ContactComponent` (`/contact`): Terminal assistance, lost-and-found inquiry, and customer support form.

## 3. ANGULAR ROUTING

All client-side navigation must use Angular Router constructs (`routerLink`, `router-outlet`, `ActivatedRoute`, and `Routes`).

### Route Configuration (`app-routing.module.ts`):

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { AirportServicesComponent } from './components/airport-services/airport-services.component';
import { FlightBookingComponent } from './components/flight-booking/flight-booking.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { BaggageRecordsComponent } from './components/baggage-records/baggage-records.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'flights/:id', component: FlightDetailsComponent },
  { path: 'services', component: AirportServicesComponent },
  { path: 'booking', component: FlightBookingComponent, canActivate: [AuthGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard] },
  { path: 'baggage-records', component: BaggageRecordsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: PassengerProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

```

## 4. NAVIGATION BAR & FOOTER

Reusable `NavbarComponent` and `FooterComponent` display consistently on every page.

### Navbar Features:

* AeroGate logo with aviation radar icon.

* Dynamic links matching authentication state (e.g., switches Login/Register to Dashboard/Logout when logged in).

* Mobile burger menu toggle using Angular property binding `[class.active]="isMenuOpen"`.

* Uses `<a routerLink="/flights" routerLinkActive="active-nav">Flights</a>`.

### Footer Features:

* Airport emergency helplines and flight inquiry numbers.

* Terminal operating hours, lost & found location (Terminal 2, Level 1).

* Quick links to services, baggage tracking, and security regulations.

* Copyright and project accreditation notice.

## 5. HOME PAGE (`/home`)

A high-impact, modern airport landing page containing:

* **Hero Section**: High-resolution airport runway/terminal background with title: *"Connecting You to the Skies – Real-Time Flight Tracking & Seamless Airport Services"*.

* **Live Flight Search Bar**: Quick search widget with fields for `Flight Number`, `Departure City`, `Arrival City`, and `Date`.

* **Live FIDS Ticker**: Scrolling badge showing real-time departures/arrivals with on-time radar status.

* **Featured Airlines**: Partner airline logos (Emirates, Delta, Singapore Airlines, Lufthansa, Qatar Airways, British Airways).

* **Popular Airport Services**: 4 highlighted tiles (Premium Lounges, Fast Track Security, Duty-Free Collection, Long-Term Parking).

* **Why AeroGate**: Statistics grid (45M+ Annual Passengers, 120+ Global Destinations, 98.4% On-Time Tracking Accuracy, 24/7 AI Terminal Assistance).

* **Emergency & Terminal Alert Banner**: Live weather notices, gate changes, and baggage claim advisories.

* **Call-to-Action**: Buttons linking to `Search Flights` (`/flights`), `Book Flight` (`/booking`), `Airport Services` (`/services`), and `Contact Support` (`/contact`).

## 6. ABOUT PAGE (`/about`)

Comprehensive details regarding the airport hub:

* **Overview & Legacy**: Information about AeroGate International Airport's terminals, runways, and smart airport digital transformation.

* **Mission & Vision**: Delivering world-class safety, zero-friction passenger transfers, and eco-friendly aviation standards.

* **Airport Operational Goals**: Automated biometric boarding, 10-minute maximum baggage wait time, and net-zero carbon operations by 2030.

* **Key Infrastructure Statistics**: 3 International Terminals, 4 Parallel Runways, 185 Boarding Gates, 42 Baggage Carousels.

* **Aviation Leadership Team**: Profiles of Airport Director, Chief of Aviation Safety, Operations Head, and Passenger Experience Lead.

## 7. FLIGHTS PAGE (`/flights`)

Real-time Flight Information Display System (FIDS).

### Dynamic Data Rendering:

All flight records are retrieved via HTTP from `GET /api/flights`.

### Each Flight Item Displays:

* **Flight ID & Number**: e.g., `AG-402`, `EK-512`, `DL-184`

* **Airline Name & Logo/Badge**

* **Route**: Origin `[DXB]` to Destination `[JFK]`

* **Schedule**: Scheduled Departure and Arrival Time

* **Terminal & Gate**: e.g., `Terminal 3, Gate B14`

* **Status Badge**: Dynamic color tags:

  * `On Time` (Emerald Green)

  * `Boarding` (Amber Gold)

  * `Delayed` (Crimson Red)

  * `Departed` (Sky Blue)

  * `Landed` (Slate Gray)

* **Baggage Carousel**: e.g., `Carousel 04`

* **Starting Fare**: e.g., `$420.00`

* **Seats Available**: e.g., `18 seats left`

* **Action Buttons**: `View Details` (links to `/flights/:id`) and `Book Flight` (links to `/booking?flightId=...`).

## 8. FLIGHT DETAILS PAGE (`/flights/:id`)

Utilizes Angular `ActivatedRoute` to extract the `:id` parameter from the URL, fetching detailed flight data via `GET /api/flights/:id`.

### Displayed Information:

* Flight code, airline, and aircraft model (e.g., *Airbus A350-900* or *Boeing 787-9 Dreamliner*).

* Full departure and arrival timelines with timezone conversions.

* Terminal information, gate location with interactive mini-map indicator.

* Baggage claim carousel number and baggage allowance (e.g., *2x 23kg Checked, 1x 7kg Cabin*).

* In-flight amenities: Wi-Fi availability, seat pitch, power outlets, complimentary meals, in-flight entertainment.

* Real-time flight progress bar (Scheduled → Check-in Open → Security → Boarding → Gate Closed → Departed → In Flight → Landed).

* Navigation buttons: `Book This Flight` and `Back to Flights`.

## 9. AIRPORT SERVICES PAGE (`/services`)

Displays airport facilities retrieved dynamically from `GET /api/services`.

### Featured Services:

1. **VIP & Business Lounges**: Quiet workstations, gourmet buffet, shower suites, and nap pods.

2. **Duty-Free Shopping**: Luxury perfumes, electronics, fashion, and pre-order pick-up counters.

3. **Baggage Wrapping & Storage**: Secure plastic wrapping, short/long-term locker storage.

4. **Currency Exchange & Banking**: Multi-currency ATMs, international exchange kiosks.

5. **Fast Track Security Clearance**: Priority biometric lanes for express TSA/customs clearance.

6. **Airport Transit Dining**: 24/7 cafes, fine dining, quick grab-and-go bakeries.

7. **Car Rental & Chauffeur Services**: On-site car rental desks, ride-share pickup zones.

8. **Medical Center & Pharmacy**: 24/7 airport emergency clinic, first aid, and prescription pharmacy.

9. **Special Assistance & Mobility**: Wheelchair assistance, sensory calm rooms, pet relief stations.

Each card displays service title, category, terminal location, opening hours, pricing/eligibility, and an inquiry button.

## 10. FLIGHT BOOKING PAGE (`/booking`)

Protected page featuring an Angular Reactive Form (`FormGroup`, `FormControl`, `Validators`).

### Reactive Form Fields:

* `passengerName`: Required, minimum 3 characters.

* `email`: Required, valid email pattern.

* `phone`: Required, 10-15 digit phone pattern.

* `passportNumber`: Required, alphanumeric format.

* `flightNumber`: Required (can be pre-populated via route query parameter).

* `travelClass`: Economy, Premium Economy, Business, First Class.

* `departureDate`: Required date selector.

* `seatPreference`: Window, Aisle, Extra Legroom.

* `mealPreference`: Standard, Vegetarian, Vegan, Halal, Kosher, Diabetic.

* `luggageCount`: Number of checked bags (0 to 4).

### Submission Flow:

* Angular client validates all controls before triggering HTTP request.

* Submits `POST /api/bookings` with bearer token in authorization header.

* On success: Displays interactive confirmation alert with generated `Booking Reference (PNR)` and e-ticket summary.

## 11. MY BOOKINGS PAGE (`/my-bookings`)

Displays all flight bookings created by the authenticated passenger retrieved from `GET /api/bookings`.

### Details Displayed per Booking:

* **Booking ID (PNR)**: e.g., `PNR-AG8921`

* **Passenger Name & Passport Number**

* **Flight Number & Airline**

* **Route & Travel Date**

* **Cabin Class & Assigned Seat**: e.g., `Business (12A)`

* **Booking Status**: `Confirmed`, `Checked-In`, `Cancelled`

* **Action Buttons**:

  * `Download E-Ticket / View Details`

  * `Cancel Booking` (Sends `DELETE /api/bookings/:id` with confirmation modal)

  * `Web Check-in` (Sends `PUT /api/bookings/:id/checkin`)

## 12. PASSENGER PROFILE (`/profile`)

Personal passenger portal retrieved from `GET /api/profile`.

### Displayed & Editable Fields:

* Full Name

* Email Address

* Mobile Phone Number

* Passport Number & Expiry Date

* Nationality

* Date of Birth

* Frequent Flyer Number & Tier Status (Silver / Gold / Platinum)

* Emergency Contact Person & Phone

Provides `Edit Profile` toggle and `Save Changes` which sends `PUT /api/profile` to update user information.

## 13. BAGGAGE RECORDS & TRAVEL HISTORY (`/baggage-records`)

Live luggage tracking and past travel ledger retrieved from `GET /api/baggage-records`.

### Record Attributes:

* **Baggage Tag ID**: e.g., `BAG-902148`

* **Associated Flight & PNR**: e.g., `AG-402 (PNR-AG8921)`

* **Checked Bag Count & Total Weight**: e.g., `2 Pieces / 38 kg`

* **Current Baggage Status**:

  * `Checked In at Counter`

  * `Security Scanned`

  * `Loaded onto Aircraft`

  * `In Flight`

  * `Unloaded & Transferring`

  * `Arrived on Carousel #04`

* **Claim Location**: Terminal 2, Belt 4

* **Last Scan Timestamp & Location**

## 14. AIRPORT & PASSENGER DASHBOARD (`/dashboard`)

Centralized real-time hub combining flight operations and passenger itinerary.

### Dashboard Modules:

* **Welcome Banner**: *"Welcome back, Captain \[Passenger Name\]! Your next flight departs in 3 hours."*

* **Quick Statistics Cards**:

  * Active Bookings count

  * Frequent Flyer Miles balance

  * Baggage in Transit count

  * Airport On-Time Departure rate (98.2%)

* **Next Upcoming Flight Widget**: Countdown timer to boarding, gate number, and weather at destination.

* **Live Flight Information Display (FIDS) Mini-Table**: Top 5 immediate departures and arrivals.

* **Quick Action Buttons**:

  * Book New Flight (`/booking`)

  * Live Flight Tracker (`/flights`)

  * Track My Baggage (`/baggage-records`)

  * Update Profile (`/profile`)

## 15. AUTHENTICATION: LOGIN (`/login`)

* Reactive Form with `email` and `password` fields with validation.

* Sends `POST /api/auth/login`.

* Server returns a signed JWT token along with user profile metadata.

* Angular `AuthService` stores the token in `localStorage` and publishes authentication state via RxJS `BehaviorSubject`.

* Automatically redirects to `/dashboard` upon successful login.

## 16. REGISTRATION (`/register`)

* Reactive Form with fields: `Full Name`, `Email`, `Phone`, `Passport Number`, `Nationality`, `Password`, `Confirm Password`.

* Custom password validator ensuring passwords match.

* Sends `POST /api/auth/register`.

* On success: Displays success alert and navigates to `/login`.

## 17. AUTHENTICATION GUARD (`auth.guard.ts`)

Angular Route Guard implementing `CanActivate`.

* Protects private routes: `/dashboard`, `/booking`, `/my-bookings`, `/profile`, `/baggage-records`.

* Checks `authService.isLoggedIn()`.

* If unauthenticated: Saves redirect URL, displays alert, and navigates to `/login`.

* On logout: Clears session and redirects to `/home`.

## 18. ANGULAR HTTP SERVICES

All backend API operations are organized into dedicated, injectable Angular services using `HttpClient` and RxJS Observables:

1. `AuthService`: `register()`, `login()`, `logout()`, `getToken()`, `isLoggedIn()`, `getCurrentUser()`.

2. `FlightService`: `getFlights()`, `getFlightById(id)`, `searchFlights(query)`.

3. `BookingService`: `getBookings()`, `getBookingById(id)`, `createBooking(data)`, `cancelBooking(id)`, `webCheckIn(id)`.

4. `AirportServiceService`: `getServices()`, `getServiceById(id)`.

5. `BaggageService`: `getBaggageRecords()`, `trackBaggageByTag(tagId)`.

6. `PassengerService`: `getProfile()`, `updateProfile(data)`.

7. `ContactService`: `sendMessage(contactData)`.

## 19. ANGULAR DATA BINDING DEMONSTRATIONS

The project satisfies all essential Angular data-binding criteria:

* **Interpolation**: `<h2>Flight {{ flight.flightNumber }} - {{ flight.airline }}</h2>`

* **Property Binding**: `<span [class]="'badge-' + flight.status.toLowerCase()">{{ flight.status }}</span>`

* **Event Binding**: `<button (click)="cancelBooking(booking.id)">Cancel</button>`

* **Two-Way Binding**: `<input [(ngModel)]="searchKeyword" placeholder="Search by city or flight #">`

* **Conditional Directives**: `*ngIf="isLoading"` / modern `@if (isLoading)`

* **List Directives**: `*ngFor="let flight of filteredFlights"` / modern `@for (flight of filteredFlights; track flight.id)`

## 20. NODE.JS + EXPRESS BACKEND ARCHITECTURE

Structured with clear separation of concerns (MVC / Layered Architecture):

* `server.js`: Application entry point, Express configuration, CORS, route mounting, and global error handlers.

* `routes/`: Express router definitions for every resource.

* `controllers/`: Business logic, request validation, and JSON response dispatching.

* `middleware/`: JWT verification middleware and centralized error handler.

* `models/`: Database schemas (or mock in-memory stores) for users, flights, bookings, baggage, services, and contacts.

## 21. EXPRESS SERVER SETUP

### Required Dependencies:

```
npm init -y
npm install express cors dotenv jsonwebtoken bcryptjs
npm install nodemon --save-dev

```

### Server Configuration (`server.js`):

Runs on `http://localhost:3000` with CORS configured for `http://localhost:4200`.

## 22. EXPRESS REST API SPECIFICATION

### Authentication

* `POST /api/auth/register` – Create new passenger account.

* `POST /api/auth/login` – Validate credentials and return JWT token.

### Flights (FIDS)

* `GET /api/flights` – Retrieve all flights (with optional query filters: `type=departure|arrival`, `airline`, `status`, `search`).

* `GET /api/flights/:id` – Retrieve complete flight details by ID.

### Airport Services

* `GET /api/services` – List all terminal amenities and services.

* `GET /api/services/:id` – Retrieve specific service details.

### Bookings (Protected by JWT)

* `GET /api/bookings` – Retrieve bookings for the authenticated user.

* `GET /api/bookings/:id` – Get single booking record.

* `POST /api/bookings` – Create a new flight reservation.

* `PUT /api/bookings/:id/checkin` – Complete web check-in and assign boarding pass.

* `DELETE /api/bookings/:id` – Cancel flight reservation.

### Passenger Profile (Protected by JWT)

* `GET /api/profile` – Retrieve authenticated passenger details.

* `PUT /api/profile` – Update profile details.

### Baggage Records (Protected by JWT)

* `GET /api/baggage-records` – Get baggage tracking records.

* `GET /api/baggage-records/:tagId` – Track luggage by tag identifier.

### Contact & Terminal Inquiries

* `POST /api/contact` – Submit terminal inquiry or lost-and-found report.

## 23. DATABASE SCHEMA (MySQL)

The database structure is normalized with foreign key constraints:

```
CREATE DATABASE IF NOT EXISTS aerogate_db;
USE aerogate_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  passport_number VARCHAR(50),
  nationality VARCHAR(50),
  frequent_flyer_number VARCHAR(50) DEFAULT 'AG-000000',
  miles_balance INT DEFAULT 500,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Flights Table
CREATE TABLE IF NOT EXISTS flights (
  id INT AUTO_INCREMENT PRIMARY KEY,
  flight_number VARCHAR(20) NOT NULL UNIQUE,
  airline VARCHAR(50) NOT NULL,
  origin_city VARCHAR(50) NOT NULL,
  origin_code VARCHAR(10) NOT NULL,
  destination_city VARCHAR(50) NOT NULL,
  destination_code VARCHAR(10) NOT NULL,
  flight_type ENUM('Departure', 'Arrival') NOT NULL,
  scheduled_departure DATETIME NOT NULL,
  scheduled_arrival DATETIME NOT NULL,
  terminal VARCHAR(10) NOT NULL,
  gate VARCHAR(10) NOT NULL,
  status ENUM('On Time', 'Boarding', 'Delayed', 'Departed', 'Landed') DEFAULT 'On Time',
  aircraft_model VARCHAR(50) NOT NULL,
  economy_fare DECIMAL(10,2) NOT NULL,
  business_fare DECIMAL(10,2) NOT NULL,
  available_seats INT NOT NULL DEFAULT 150,
  baggage_carousel VARCHAR(10) DEFAULT 'Carousel 01'
);

-- 3. Airport Services Table
CREATE TABLE IF NOT EXISTS airport_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  terminal_location VARCHAR(50) NOT NULL,
  opening_hours VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  price_info VARCHAR(50) DEFAULT 'Complimentary / Ticketed'
);

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  flight_id INT NOT NULL,
  pnr_number VARCHAR(20) NOT NULL UNIQUE,
  passenger_name VARCHAR(100) NOT NULL,
  passport_number VARCHAR(50) NOT NULL,
  cabin_class ENUM('Economy', 'Premium Economy', 'Business', 'First Class') DEFAULT 'Economy',
  seat_number VARCHAR(10) NOT NULL,
  meal_preference VARCHAR(50) DEFAULT 'Standard',
  luggage_count INT DEFAULT 1,
  total_fare DECIMAL(10,2) NOT NULL,
  status ENUM('Confirmed', 'Checked-In', 'Cancelled') DEFAULT 'Confirmed',
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE
);

-- 5. Baggage Records Table
CREATE TABLE IF NOT EXISTS baggage_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  user_id INT NOT NULL,
  tag_number VARCHAR(30) NOT NULL UNIQUE,
  bag_count INT DEFAULT 1,
  weight_kg DECIMAL(5,2) NOT NULL,
  status ENUM('Checked In', 'Security Scanned', 'Loaded', 'In Flight', 'Unloaded', 'At Carousel') DEFAULT 'Checked In',
  carousel_number VARCHAR(20) DEFAULT 'Carousel 04',
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(150) NOT NULL,
  category ENUM('Flight Inquiry', 'Lost & Found', 'Terminal Assistance', 'Feedback') DEFAULT 'Flight Inquiry',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

*Note: The project includes a complete mock in-memory data store fallback so that the application runs out-of-the-box even without a local MySQL server.*

## 24. CORS CONFIGURATION

Express enables CORS explicitly for the Angular dev server origin:

```
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

```

## 25. HTTP INTERCEPTOR (`auth.interceptor.ts`)

An Angular `HttpInterceptor` intercepts all outgoing HTTP requests and automatically injects the stored JWT token into the `Authorization` header:

```
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}

```

## 26. ERROR HANDLING

* **Frontend**: User-friendly flash banners and alert toasts handle connection errors, missing fields, or unauthorized redirects (*"Unable to load real-time flight schedules"*, *"Flight reservation failed. Please check seat availability"*).

* **Backend**: Centralized `errorMiddleware.js` catches all exceptions and sends structured JSON responses:

```
{
  "success": false,
  "message": "Resource not found or unauthorized",
  "error": "Detailed validation error description"
}

```

HTTP status codes used: `200`, `201`, `400`, `401`, `403`, `404`, `500`.

## 27. LOADING STATES

Whenever Angular executes an asynchronous HTTP request, loading spinners or skeleton placeholder cards are presented.

* *"Loading real-time departures..."*

* *"Retrieving baggage status..."*

* If no records match query: *"No flights found matching your search criteria."*

## 28. SEARCH AND FILTER FUNCTIONALITY

The Flights page (`/flights`) implements real-time client & server filtering:

1. **Search Input**: Match by Flight Number (`AG-402`), Airline (`Emirates`), or City (`London`, `Dubai`, `Singapore`).

2. **Type Filter**: Toggle between `All Flights`, `Departures`, and `Arrivals`.

3. **Status Filter**: Filter by `On Time`, `Boarding`, `Delayed`, `Landed`.

4. **Terminal Filter**: Filter by `Terminal 1`, `Terminal 2`, or `Terminal 3`.

Filtered lists update dynamically with zero page reloads.

## 29. RESPONSIVE DESIGN

Engineered with mobile-first CSS Flexbox, CSS Grid, and media queries:

* **Desktop (1200px+)**: Multi-column FIDS board, split-screen booking views, 4-column service grids.

* **Tablet (768px - 1199px)**: 2-column service cards, horizontal scrolling tables with sticky flight status headers.

* **Mobile (<768px)**: Collapsible hamburger menu, single-column stacked flight cards, touch-optimized seat selection widgets.

## 30. VISUAL DESIGN & THEME PALETTE

Modern aviation aesthetic inspired by international airport flight display boards and airport terminal signage:

* **Aero Navy (Primary Background / Headers)**: `#0A192F`

* **Flight Sky Blue (Brand Accent)**: `#0284C7`

* **Runway Gold (Boarding / Attention)**: `#F59E0B`

* **Radar Emerald (On-Time Indicator)**: `#10B981`

* **Alert Crimson (Delayed / Cancelled)**: `#EF4444`

* **Cloud Slate (Card Backgrounds & Neutral Panels)**: `#F8FAFC`

* **High-Contrast Text**: Dark Navy `#0F172A` on light, Pure White `#FFFFFF` on dark navy headers.

## 31. IMPORTANT ANGULAR REQUIREMENTS CHECKLIST

* \[x\] Components (13 standalone/routed components + Navbar + Footer)

* \[x\] Templates & HTML5 Semantic Layout

* \[x\] TypeScript Strict Typing & Interfaces

* \[x\] Interpolation (`{{ flight.flightNumber }}`)

* \[x\] Property Binding (`[class]`, `[disabled]`, `[src]`)

* \[x\] Event Binding (`(click)`, `(submit)`, `(change)`)

* \[x\] Two-Way Data Binding (`[(ngModel)]`)

* \[x\] Directives (`*ngIf`, `*ngFor`, `ngClass`)

* \[x\] Angular Router (`Routes`, `routerLink`, `router-outlet`)

* \[x\] Route Parameters (`ActivatedRoute.snapshot.paramMap.get('id')`)

* \[x\] Angular Services & Dependency Injection (`@Injectable({ providedIn: 'root' })`)

* \[x\] Reactive Forms (`FormGroup`, `FormControl`, `Validators`)

* \[x\] Form Validation & Dynamic Error Messages

* \[x\] HttpClient & RxJS Observables (`Observable<T>`, `map`, `catchError`)

* \[x\] JWT Authentication & Token Management

* \[x\] Route Guards (`CanActivate`)

* \[x\] HTTP Interceptor (`HttpInterceptor`)

## 32. IMPORTANT BACKEND REQUIREMENTS CHECKLIST

* \[x\] Node.js Runtime & Express.js Framework

* \[x\] Asynchronous REST APIs returning JSON

* \[x\] Modular Routers (`routes/`)

* \[x\] Controller Business Logic (`controllers/`)

* \[x\] JWT Token Verification & Auth Middleware

* \[x\] Password Hashing with `bcryptjs`

* \[x\] Cross-Origin Resource Sharing (`cors`) configured for `http://localhost:4200`

* \[x\] Relational Database Schema (`MySQL`) + In-Memory Mock Store Fallback

* \[x\] Robust Status Codes & Error Handling
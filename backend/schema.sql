-- AeroGate Airport Flight Information Portal - Database Schema
-- Compatible with MySQL 5.7+ / 8.0+

CREATE DATABASE IF NOT EXISTS aerogate_db;
USE aerogate_db;

-- 1. Users & Passengers Table
DROP TABLE IF EXISTS baggage_records;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS airport_services;
DROP TABLE IF EXISTS contact_inquiries;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  passport_number VARCHAR(50) NOT NULL,
  nationality VARCHAR(50) DEFAULT 'International',
  frequent_flyer_number VARCHAR(50) DEFAULT 'AG-000000',
  miles_balance INT DEFAULT 500,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Flights Table
CREATE TABLE flights (
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
  baggage_carousel VARCHAR(20) DEFAULT 'Carousel 01'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Airport Services Table
CREATE TABLE airport_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  terminal_location VARCHAR(100) NOT NULL,
  opening_hours VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  price_info VARCHAR(50) DEFAULT 'Complimentary / Ticketed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Bookings Table
CREATE TABLE bookings (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Baggage Records Table
CREATE TABLE baggage_records (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Contact Inquiries Table
CREATE TABLE contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(150) NOT NULL,
  category ENUM('Flight Inquiry', 'Lost & Found', 'Terminal Assistance', 'Feedback') DEFAULT 'Flight Inquiry',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data: Sample Flights
INSERT INTO flights (flight_number, airline, origin_city, origin_code, destination_city, destination_code, flight_type, scheduled_departure, scheduled_arrival, terminal, gate, status, aircraft_model, economy_fare, business_fare, available_seats, baggage_carousel)
VALUES
('AG-402', 'Emirates', 'Dubai', 'DXB', 'New York', 'JFK', 'Departure', '2026-10-28 08:30:00', '2026-10-28 14:15:00', 'Terminal 3', 'B14', 'On Time', 'Airbus A380-800', 620.00, 2150.00, 42, 'Carousel 04'),
('AG-184', 'Delta Air Lines', 'Atlanta', 'ATL', 'London', 'LHR', 'Departure', '2026-10-28 10:15:00', '2026-10-28 22:45:00', 'Terminal 2', 'A08', 'Boarding', 'Boeing 787-9 Dreamliner', 480.00, 1850.00, 12, 'Carousel 02'),
('AG-520', 'Singapore Airlines', 'Singapore', 'SIN', 'Tokyo', 'HND', 'Arrival', '2026-10-28 02:00:00', '2026-10-28 09:40:00', 'Terminal 1', 'C22', 'Landed', 'Airbus A350-900', 550.00, 1950.00, 0, 'Carousel 07'),
('AG-711', 'Lufthansa', 'Frankfurt', 'FRA', 'Chicago', 'ORD', 'Departure', '2026-10-28 12:00:00', '2026-10-28 15:30:00', 'Terminal 1', 'B04', 'Delayed', 'Boeing 747-8', 510.00, 1780.00, 29, 'Carousel 05'),
('AG-903', 'Qatar Airways', 'Doha', 'DOH', 'Paris', 'CDG', 'Arrival', '2026-10-28 05:20:00', '2026-10-28 11:55:00', 'Terminal 3', 'D12', 'On Time', 'Airbus A350-1000', 630.00, 2300.00, 19, 'Carousel 01');

-- Seed Data: Airport Services
INSERT INTO airport_services (title, category, terminal_location, opening_hours, description, image_url, price_info)
VALUES
('Al Maha VIP Business Lounge', 'Lounges & Relaxation', 'Terminal 3, Concourse B', '24 Hours / 7 Days', 'Quiet relaxation suites, private shower rooms, hot buffet, and barista coffee.', 'assets/images/lounge.jpg', 'Free for Business / $45 Pass'),
('World Duty Free Superstore', 'Shopping & Retail', 'Terminal 1 & 3 Departure Concourses', '05:00 AM - 01:00 AM Daily', 'Tax-free shopping featuring luxury perfumes, confectionery, and electronics.', 'assets/images/dutyfree.jpg', 'Tax-Free Retail Pricing'),
('SecureWrap Luggage Protection', 'Baggage Services', 'Terminal 1 & 2 Check-in Hall B', '04:00 AM - 11:00 PM Daily', 'Ultra-durable recyclable film wrapping to protect baggage against damage.', 'assets/images/wrap.jpg', '$12 per piece'),
('Global Currency Exchange & Banking', 'Financial Services', 'All Terminals', '24 Hours Daily', 'Exchange rates for over 65 foreign currencies with zero commission for passengers.', 'assets/images/exchange.jpg', 'Live Bank Exchange Rates'),
('Express Fast-Track Security Lane', 'Security Transit', 'Security Checkpoints 1, 2 & 3', '04:30 AM - Midnight', 'Expedited TSA / customs biometric clearance lanes.', 'assets/images/fasttrack.jpg', 'Free for First/Business / $25 Add-On');

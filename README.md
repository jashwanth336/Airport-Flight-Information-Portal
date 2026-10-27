# AeroGate – Airport Flight Information Portal (AFIP)
### Complete Full-Stack College Project (Angular + Node.js/Express + MySQL)

AeroGate is a complete, decoupled Single Page Application (SPA) designed for real-time flight departures/arrivals tracking, passenger ticket booking, checked luggage telemetry, and airport services.

---

## Architecture & Technology Stack

- **Frontend**: Angular 16+, TypeScript, Angular Router, Reactive Forms, Services with HttpClient, RxJS, HTTP Interceptors.
- **Backend**: Node.js, Express.js REST API, JSON Web Token (JWT) Authentication, bcryptjs, CORS.
- **Database**: MySQL relational schema (`schema.sql`) with seamless fallback to in-memory store (`mockData.js`).
- **Communication**: Strict JSON REST APIs over HTTP.

---

## Project Structure

```text
AeroGate/
│
├── backend/
│   ├── controllers/         # Business logic for all endpoints
│   ├── middleware/          # authMiddleware.js (JWT) & errorMiddleware.js
│   ├── models/              # mockData.js (in-memory store fallback)
│   ├── routes/              # Express route declarations
│   ├── .env                 # Environment config (PORT=3000, JWT_SECRET)
│   ├── package.json         # Node.js dependencies
│   ├── schema.sql           # MySQL database schema & seed scripts
│   └── server.js            # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/  # 13 routed pages + navbar & footer
    │   │   ├── guards/      # auth.guard.ts (CanActivate)
    │   │   ├── interceptors/# auth.interceptor.ts (Bearer token)
    │   │   ├── models/      # TypeScript interfaces
    │   │   ├── services/    # Injectable HttpClient services
    │   │   ├── app-routing.module.ts
    │   │   └── app.module.ts
    │   ├── index.html
    │   └── styles.css       # Aviation theme styling & responsive grid
    ├── angular.json
    └── package.json
```

---

## Setup & Running the Project

### 1. Start the Backend API (Port 3000)
```bash
cd backend
npm install
npm run dev
# Server will run at http://localhost:3000
```

### 2. Start the Frontend (Port 4200)
```bash
cd ../frontend
npm install
npm start
# Application will run at http://localhost:4200
```

### 3. Database Configuration (Optional)
- You can import `backend/schema.sql` into your local MySQL server (`aerogate_db`).
- Or simply run the backend directly — it includes an in-memory database store (`mockData.js`) so it works out-of-the-box without requiring a running MySQL instance!

### 4. Demo Login Credentials
- **Email**: `john.miller@example.com`
- **Password**: `password123`

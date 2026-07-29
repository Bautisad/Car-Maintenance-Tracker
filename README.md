<div align="center">

# 🚗 AutoTrack — Car Maintenance Tracker

### A full-stack web application for organizing vehicle information and maintenance history

[![Full Stack CI](https://github.com/Bautisad/Car-Maintenance-Tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/Bautisad/Car-Maintenance-Tracker/actions/workflows/ci.yml)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x-6DB33F)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1)

</div>

---

## 📖 Overview

AutoTrack is a full-stack vehicle maintenance application that helps users store vehicle information, monitor mileage, and maintain a service history for each vehicle.

The application uses a Next.js frontend, a Java Spring Boot REST API, and PostgreSQL for persistent storage. The project is organized as a monorepo with automated backend testing and frontend build checks through GitHub Actions.

---

## ✨ Current Features

- 🚘 Add vehicles with year, make, model, and current mileage
- 📋 View all saved vehicles from one garage page
- ✏️ Update vehicle information and mileage
- 🗑️ Delete vehicles
- 🔧 Add maintenance records for a specific vehicle
- 🧾 View each vehicle's maintenance history
- 📝 Edit and delete existing maintenance records
- 🌐 Connect the Next.js interface to Spring Boot REST endpoints
- 💾 Store vehicle and maintenance data in PostgreSQL
- ✅ Run Maven/JUnit tests and frontend checks with GitHub Actions

---

## 🧰 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS / Tailwind CSS tooling

### Backend

- Java 17
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Maven

### Database and Testing

- PostgreSQL
- H2 for backend tests
- JUnit
- Spring MockMvc

### Development Tools

- Git and GitHub
- GitHub Actions
- npm
- Postman

---

## 🏗️ Application Architecture

```text
Browser
   │
   ▼
Next.js + React Frontend
   │
   │ HTTP / JSON
   ▼
Spring Boot REST API
   │
   │ Spring Data JPA
   ▼
PostgreSQL Database
```

The frontend sends requests through `frontend/lib/api.ts`. Spring Boot controllers process those requests, repositories communicate with PostgreSQL, and JSON responses are returned to the frontend.

---

## 📦 Project Structure

```text
Car-Maintenance-Tracker/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/duke/maintenance/
│   │   │   │   ├── maintenance/
│   │   │   │   ├── vehicle/
│   │   │   │   └── MaintenanceApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/duke/maintenance/
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── frontend/
│   ├── app/
│   │   ├── maintenance/vehicle/[vehicleId]/
│   │   ├── vehicles/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── MaintenanceLogForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── VehicleCard.tsx
│   │   └── VehicleForm.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── types/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Setup and Installation

### Prerequisites

Install the following before starting:

- Java 17
- Node.js 20 or newer
- npm
- PostgreSQL
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bautisad/Car-Maintenance-Tracker.git
cd Car-Maintenance-Tracker
```

### 2️⃣ Create the PostgreSQL Database

Create a local database named:

```sql
CREATE DATABASE car_maintenance_tracker;
```

The backend reads its database connection from environment variables.

#### Windows PowerShell

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/car_maintenance_tracker"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="YOUR_POSTGRES_PASSWORD"
```

#### macOS or Linux

```bash
export DB_URL="jdbc:postgresql://localhost:5432/car_maintenance_tracker"
export DB_USERNAME="postgres"
export DB_PASSWORD="YOUR_POSTGRES_PASSWORD"
```

Do not commit real database credentials to GitHub.

### 3️⃣ Configure the Frontend API URL

Create this file:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 4️⃣ Start the Backend

#### Windows PowerShell

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

#### macOS or Linux

```bash
cd backend
chmod +x mvnw
./mvnw spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 5️⃣ Start the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

---

## 🔌 REST API Endpoints

### Vehicles

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vehicles` | Retrieve all vehicles |
| `GET` | `/api/vehicles/{id}` | Retrieve one vehicle |
| `POST` | `/api/vehicles` | Create a vehicle |
| `PUT` | `/api/vehicles/{id}` | Update a vehicle |
| `DELETE` | `/api/vehicles/{id}` | Delete a vehicle |

### Maintenance Records

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/maintenance/vehicle/{vehicleId}` | Retrieve a vehicle's maintenance history |
| `POST` | `/api/maintenance/vehicle/{vehicleId}` | Add a maintenance record |
| `PUT` | `/api/maintenance/{id}` | Update a maintenance record |
| `DELETE` | `/api/maintenance/{id}` | Delete a maintenance record |

---

## 🧠 How It Works

### 1. Vehicle Management

Users can add a vehicle by entering its year, make, model, and current mileage. The frontend sends the information to the Spring Boot API, which saves it in PostgreSQL.

### 2. Maintenance History

Each maintenance record belongs to a specific vehicle. Users can record the service type, mileage performed, date performed, and additional notes.

### 3. Frontend and Backend Communication

The frontend uses a reusable API helper to send HTTP requests. The backend exposes REST controllers for vehicle and maintenance operations.

### 4. Persistent Storage

Spring Data JPA maps Java entities to PostgreSQL tables so vehicle and maintenance data remains available after the application restarts.

---

## 🧪 Running Tests and Checks

### Backend Tests

#### Windows

```powershell
cd backend
.\mvnw.cmd test
```

#### macOS or Linux

```bash
cd backend
./mvnw test
```

### Frontend Checks

```bash
cd frontend
npm run lint
npm run build
```

---

## 🔄 Continuous Integration

The GitHub Actions workflow runs automatically for pushes and pull requests targeting `main`.

It performs the following checks:

- Runs Maven/JUnit backend tests with Java 17
- Installs frontend dependencies with `npm ci`
- Runs ESLint
- Runs frontend tests when a test script is available
- Builds the Next.js application

---

## 🔐 Security and Privacy

- Database credentials are supplied through environment variables
- Local `.env` and credential files should remain excluded through `.gitignore`
- Real user information and production database exports should never be committed
- Passwords should only be stored as secure hashes when authentication is added
- API responses should never expose password hashes or private credentials

---

## 📈 Planned Improvements

- User registration and login
- Separate vehicle and maintenance data for each authenticated user
- Secure session-based authentication and authorization
- Mileage-based service recommendations
- Upcoming and overdue maintenance reminders
- Input validation and improved API error responses
- Frontend component and integration tests
- Production deployment for the frontend, backend, and PostgreSQL database
- Screenshots and a live demonstration link

---

## 👤 Author

**Duke Bautista**

- GitHub: [@Bautisad](https://github.com/Bautisad)

---

## 🛡️ Disclaimer

Maintenance recommendations added in future versions should be treated as general reminders. Vehicle owners should follow the official maintenance schedule supplied by the vehicle manufacturer and consult a qualified automotive professional when necessary.

# Realtime Healthcare Monitoring API

A NestJS-based GraphQL backend that handles real-time patient monitoring for healthcare systems. Built using PostgreSQL with Prisma ORM, this system supports device-to-patient mapping, data ingestion, and alerts based on critical vitals.

---

## 📁 Project Setup & Installation

### Requirements
- Node.js (>= 18)
- PostgreSQL
- Yarn or npm

### 1. Clone the repository

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set environment variables
```bash
DATABASE_URL="postgresql://maverick@localhost:5432/rhythmiq"
JWT_SECRET="top-secret"
PORT=3000
```

### 3. Set environment variables
```bash
npx prisma migrate dev --name init
```

```bash
yarn start:dev
# or
npm run start:dev
```

## 🧪 How to Use the API

After project started successfully go to

```bash
http://localhost:3000/graphql
```

### ✅ Create User (Signup)
Call `user_signup` with `email` and `password`.

---

### ✅ Sign In
Call `user_signin` with the same credentials.

Copy the returned **JWT token** and pass it in headers as:

```
Authorization: Bearer <your-token>
```

---

### ✅ Create Patient
Call `patient_create` with basic patient info like:

- `name`
- `age`
- `gender`
- `email` (optional)
- `phone` (optional)

---

### ✅ Create Device
Call `device_create` with:

- `serialNo`
- `type` (e.g., `"heart-monitor"`)

---

### ✅ Assign Device
Call `device_assign` with:

- `deviceId` (from the created device)
- `patientId` (from the created patient)

---

### ✅ Send Device Data
Call `device_process` mutation with a valid signal string like:

```
"####dev_xxx::UNIX_TIMESTAMP::PULSE::SYSTOLIC::DIASTOLIC::O2SAT####"
```

✅ Use `Math.floor(Date.now() / 1000)` to generate a UNIX timestamp.
# Montera - Personal Finance Tracker

A full - stack finance management application that enables users to securely manage income, expense, savings, and financial insights through an intuitive dashboard.

## Features

- User authentication using JWT
- Dashboard with financial summary
- Income and expense managemnt
- Interactive analytics
- Expense categorization
- Responsive design
- Protected routes

## Tech Stack

Frontend
- Next.js
- React
- Tailwind CSS

Backend
- Node.js
- Express.js

Database
- MongoDB

Authentication
- JWT

## Screenshots

### Landing page

![Landing Page](Screenshots/landingPage.png)

### Dashboard

![Dashboard](Screenshots/dashboardPage.png)

### Transactions

![Transactions](Screenshots/transactionPage.png)

### Analytics

![Analytics](Screenshots/analyticsPage.png)

![Analytics](Screenshots/analyticsPageSecond.png)


## Responsive design
Montera is fully responsive and optimized for desktops, tablet and mobile devices

### Desktop Experience

- Responsive sidebar navigation
- Optimized card layout
- Wide chart visulalization

![Desktop Dashboard](Screenshots/dashboardPage.png)

---

### Mobile Experience

- Bottom naviigation for quick access
- Mobile optimized dashboard
- Responsive trabsaction cards
- Adaptive analytics layout

| Mobile Dashboard | Mobile Analytics |
|------------------|----------|
| ![](Screenshots/mobileDashboard.png) | ![](Screenshots/mobileAnalytics.png) |


## Project Sturcture

```text
Finance-tracker/
|
├─backend/
|  ├─config/
|  ├─controllers/
|  ├─middleware/
|  ├─models/
|  ├─routes/
|  ├─seedTransaction.js
|  ├─server.js
|  └─package.json
|
├─frontend/
|  └─finance-mamagement-app/
|    ├─public/
|    ├─src/
|    | └─app/
|    |   ├─assets/
|    |   ├─components/
|    |   ├─dashboard/
|    |   |  ├─analytics/
|    |   |  ├─planner/
|    |   |  └─transactions/
|    |   ├─login/
|    |   ├─signup/
|    |   ├─global.css
|    |   ├─layout.js
|    |   └─page.js
|    ├─package.json
|    └─next.config.mjs
| 
├─Screenshots/
└─README.md

```
### Folder Overview

- **backend/** → REST APIs, authentication, database models, and business logic.
- **frontend/** → Next.js application with responsive UI.
- **components/** → Reusable UI components shared across pages.
- **dashboard/** → Main finance overview.
- **transactions/** → Manage income and expenses.
- **analytics/** → Charts and financial insights.
- **Screenshots/** → Images used in this README.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/vaishakshita/Finance-tracker.git
cd Finance-tracker
```

### 2. Install Backend Dependencies

```bash
cd backend
npn install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend/finance-management-app
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Replace the placeholder values with:

- **MONGO_URI** → Your MongoDb Atlas connectoon string
- **JWT_SECRET** → Asecure random secret key used for signing JWTs.
- **PORT** → Backend server port (default: `5000`).

### 5. Start Backend Server

```bash
cd backend
npm run dev
```

### 6. Start Frontend

Open new terminal

```bash
cd frontend/finance-managemnt-app
npm run dev
```

Visit:

```
http://localhost:3000
```

## Usage

After starting both the frontend and backend servers:

- Create a new account or log in using existing credentials.
- Add income and expense transactions.
- View recent transactions on the dashboard.
- Analyze spending patterns through interactive charts.
- Filter analytics by month to gain financial insights.
- Mange all transactions from the Transactions page.

## Authentication 

Montera uses **JWT (JSON Web Token)** for secure user authnetication.

Authnetication flow

1. User logs in with email and password.
2. Password is verified using **bcrypt**.
3. AJWT is generated upon successful authentication.
4. The token is stored in the browser for authenticated requests.
5. Protected API rouets validates the token before granting access to user-specific resources.

> **Note:** For simplicity, the current implementation stores JWT in localStorage. In a production environment, HttpOnly cookies are recommended for enhanced security.

## Future Enhancements

- Financial Planner (Budget & Goals)
- AI - powered monthly financial summaries.
- Smart spending recommendations
- Export transaction as CSV/PDF
- Dark mode support
- Deployment on Vercel

## Author

**Akshita Vaish**

Software Engineering Student
Github: https://github.com/vaishakshita
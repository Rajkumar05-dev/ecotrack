# EcoTrack - Frontend

A professional, production-ready React.js frontend for the EcoTrack eco-sustainability platform.

## Features

- 🔐 User Authentication (Login/Register)
- 📚 Workshop Browsing and Details
- 💳 Razorpay Payment Integration
- 🎨 Modern UI with Tailwind CSS
- 🔒 Protected Routes
- 📱 Responsive Design

## Tech Stack

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Razorpay Checkout JS
- Fetch API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Backend Integration

The frontend is configured to connect to the Spring Boot backend at:
- Base URL: `http://localhost:8080`

Make sure your backend server is running before using the application.

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, ProtectedRoute)
├── context/         # React Context (AuthContext)
├── pages/           # Page components (Home, Login, Register, Workshops)
├── services/        # API service functions
├── utils/           # Utility functions (Razorpay integration)
├── App.jsx          # Main app component with routing
└── main.jsx         # Entry point
```

## Environment Variables

Currently, the Razorpay key is hardcoded in `src/utils/razorpay.js`. For production, consider moving it to environment variables.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT

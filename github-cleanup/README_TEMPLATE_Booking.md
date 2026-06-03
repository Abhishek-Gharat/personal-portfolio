# Booking Platform

A production-ready full-stack booking management system for handling reservations, user management, and real-time availability tracking.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-blue?style=flat-square&logo=vercel)](https://booking-app-omega-seven.vercel.app)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## Overview

A comprehensive booking platform that enables users to browse available slots, make reservations, and manage bookings through an intuitive interface. Built with scalability and user experience in mind.

## Key Features

- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Real-time Availability**: Live booking calendar with instant availability updates
- **Booking Management**: Complete CRUD operations for reservations
- **Responsive Design**: Mobile-first approach ensuring seamless experience across devices
- **RESTful API**: Well-documented API endpoints with comprehensive error handling
- **Admin Dashboard**: Management interface for administrators to oversee all bookings

## Tech Stack

### Frontend
- React 18+ with Hooks
- React Router for navigation
- Context API for state management
- TailwindCSS for styling
- Axios for HTTP requests

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcrypt for password hashing
- Express Validator for input validation

### Deployment
- Frontend: Vercel
- Backend: [Add your backend deployment]
- Database: MongoDB Atlas

## Architecture

```
Booking-Platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── services/       # API service functions
│   └── public/
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── config/            # Configuration files
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Abhishek-Gharat/Booking-app.git
cd Booking-app
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup
```bash
# In server directory, create .env file
cp .env.example .env

# Add your configuration:
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# PORT=5000
```

4. Run the application
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm start
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

## Screenshots

[Add screenshots of key features here]

## Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications for booking confirmations
- [ ] Calendar sync with Google Calendar
- [ ] Mobile app using React Native
- [ ] Real-time updates with Socket.io

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Contact

- LinkedIn: [Abhishek Gharat](https://linkedin.com/in/abhishek-gharat)
- GitHub: [@Abhishek-Gharat](https://github.com/Abhishek-Gharat)

---

Built with React, Node.js, and MongoDB

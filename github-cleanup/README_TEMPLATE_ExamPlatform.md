# Exam Platform

A comprehensive online examination and assessment system with real-time monitoring, automated grading, and role-based access control.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-blue?style=flat-square&logo=vercel)](https://examplatformclient.vercel.app)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)

## Overview

An end-to-end examination platform enabling educational institutions to conduct secure online assessments. Features include multi-role support, question bank management, real-time exam monitoring, and automated result generation.

## Key Features

### For Students
- **Secure Exam Environment**: Timer-based assessments with auto-submit
- **Real-time Monitoring**: Live proctoring capabilities
- **Instant Results**: Automated grading for objective questions
- **Exam History**: View past exam results and analytics

### For Instructors
- **Question Bank**: Create and manage question repositories
- **Exam Creation**: Build exams with various question types
- **Proctoring Dashboard**: Monitor students during exams in real-time
- **Result Analytics**: Comprehensive performance reports

### For Administrators
- **User Management**: Manage student and instructor accounts
- **Institution Setup**: Configure exam schedules and settings
- **Reports**: Export results and analytics
- **Access Control**: Role-based permissions system

## Tech Stack

### Frontend
- React 18+
- React Router DOM
- Context API + useReducer for state management
- TailwindCSS
- Recharts for analytics

### Backend
- Node.js & Express.js
- Socket.io for real-time features
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Real-time Features
- Socket.io for live monitoring
- Redis adapter for Socket.io scaling
- WebRTC for video proctoring (planned)

## Architecture

```
Exam-Platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/       # Auth & Exam context
│   │   ├── hooks/         # Custom hooks
│   │   └── services/      # API & Socket services
│   └── public/
├── server/                # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── socket/           # Socket.io handlers
│   └── utils/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB instance
- Redis (for production Socket.io scaling)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Abhishek-Gharat/exam-platform-client.git
cd exam-platform-client
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Environment Configuration

Server `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exam-platform
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=development
```

Client `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

5. Seed Database
```bash
cd server
npm run seed
```

6. Run Application
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm start
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register (Student/Instructor/Admin)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Exams
- `GET /api/exams` - Get all exams
- `POST /api/exams` - Create exam (Instructor/Admin)
- `GET /api/exams/:id` - Get exam details
- `PUT /api/exams/:id` - Update exam
- `DELETE /api/exams/:id` - Delete exam

### Questions
- `GET /api/questions` - Get question bank
- `POST /api/questions` - Add question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Attempts
- `POST /api/attempts/start` - Start exam attempt
- `POST /api/attempts/submit` - Submit exam
- `GET /api/attempts/:id` - Get attempt results

## Socket.io Events

### Client to Server
- `join-exam` - Join exam room
- `submit-answer` - Submit individual answer
- `disconnect` - Handle disconnection

### Server to Client
- `exam-started` - Exam session started
- `time-update` - Remaining time update
- `exam-ended` - Exam auto-submit triggered
- `proctor-alert` - Suspicious activity alert

## Security Features

- JWT-based authentication with role validation
- Exam session locking (one device at a time)
- IP address tracking
- Browser tab switching detection
- Copy/paste prevention during exams
- Full-screen mode enforcement (optional)

## Database Models

### User
```javascript
{
  name: String,
  email: String,
  password: String,
  role: Enum['student', 'instructor', 'admin'],
  institution: String,
  createdAt: Date
}
```

### Exam
```javascript
{
  title: String,
  description: String,
  duration: Number, // minutes
  totalMarks: Number,
  passingMarks: Number,
  questions: [ObjectId],
  startTime: Date,
  endTime: Date,
  createdBy: ObjectId,
  status: Enum['draft', 'published', 'completed']
}
```

### Question
```javascript
{
  type: Enum['mcq', 'true-false', 'subjective'],
  question: String,
  options: [String],
  correctAnswer: String/Number,
  marks: Number,
  category: String
}
```

## Screenshots

[Add screenshots here]

## Roadmap

- [ ] Video proctoring with WebRTC
- [ ] AI-powered cheating detection
- [ ] PDF result generation
- [ ] Bulk student import
- [ ] Exam scheduling with calendar
- [ ] Mobile responsive improvements
- [ ] Offline exam mode (PWA)

## Contributing

Contributions are welcome. Please follow the standard fork and PR workflow.

## License

MIT License

## Contact

- LinkedIn: [Abhishek Gharat](https://linkedin.com/in/abhishek-gharat)
- Email: [your.email@domain.com]

---

Built for educational institutions

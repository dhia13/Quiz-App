# Quiz Application

A comprehensive medical quiz application for students, featuring a React Native mobile app, Express.js backend API, and a React web admin panel for content management.

## Project Overview

This is a full-stack quiz application designed for medical students, organized by Faculties, Levels, Specialities, and EMD (Enseignement Médical de Droit). The application includes user authentication, quiz management, bookmarks, progress tracking, and a gamification system with coins.

## Architecture

The project consists of three main components:

1. **Quiz-App**: React Native mobile application (iOS & Android)
2. **Quiz-BackEnd**: Express.js REST API server with MongoDB
3. **Admin Panel**: React web application for content management

## Features

### Mobile App (Quiz-App)

- 📱 **Cross-platform**: iOS and Android support via Expo
- 🎮 **Interactive Quiz System**: Multiple choice questions with immediate feedback
- 📚 **Organized Content**: Browse by Faculties, Levels, Specialities, and EMD
- 🔖 **Bookmarks**: Save favorite questions for later review
- 🎯 **Progress Tracking**: Track solved quizzes and progress
- 🪙 **Gamification**: Coins/points system for achievements
- 🔊 **Sound Effects**: Audio feedback for correct/incorrect answers
- 🎨 **Modern UI**: Clean and intuitive user interface
- 📊 **Review System**: Detailed review after completing quizzes
- ⚙️ **Settings**: Customizable app settings
- 🔐 **User Authentication**: Secure login and registration

### Backend API (Quiz-BackEnd)

- 🔒 **JWT Authentication**: Secure token-based authentication
- 📝 **CRUD Operations**: Full CRUD for quizzes, users, levels, faculties, specialities, and EMD
- 🗄️ **MongoDB Integration**: Mongoose ODM for database operations
- 📊 **User Management**: Role-based access control (user, admin, super_admin)
- 📈 **Progress Tracking**: Track user progress, bookmarks, and solved quizzes
- 🪙 **Coins System**: Update and manage user coins
- 📝 **Logging**: Request logging with Morgan and custom logger middleware
- 🌐 **CORS Support**: Configured for cross-origin requests

### Admin Panel

- 🎛️ **Content Management**: Manage quizzes, users, levels, faculties, specialities, and EMD
- 👥 **User Management**: View and manage user accounts
- ✏️ **Quiz Editor**: Create, edit, and delete quiz questions
- 🏗️ **Structure Management**: Organize content hierarchy
- 🎨 **Modern UI**: Built with React and Tailwind CSS

## Tech Stack

### Mobile App (Quiz-App)

- **Framework**: React Native (0.70.5)
- **Platform**: Expo (~47.0.12)
- **State Management**: Redux with Redux Persist
- **Navigation**: React Navigation
- **HTTP Client**: Axios
- **Audio**: React Native Sound
- **Storage**: AsyncStorage

### Backend (Quiz-BackEnd)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Logging**: Morgan
- **Environment**: dotenv

### Admin Panel

- **Framework**: React (17.0.2)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## Project Structure

```
Quiz/
├── Quiz-App/                    # React Native mobile application
│   ├── android/                 # Android native code
│   ├── assets/                  # Images, sounds, and other assets
│   ├── src/
│   │   ├── Components/          # Reusable components
│   │   │   ├── HomeScreens/     # Home screen components
│   │   │   │   ├── QuizScreen/ # Quiz-related components
│   │   │   │   ├── Faculties.js
│   │   │   │   ├── Levels.js
│   │   │   │   ├── Specilties.js
│   │   │   │   └── Emd.js
│   │   │   └── ...
│   │   ├── redux/               # Redux store, actions, reducers
│   │   ├── screens/             # Main app screens
│   │   └── Navigation.js        # Navigation configuration
│   ├── App.js                   # Root component
│   ├── package.json
│   └── app.json                 # Expo configuration
│
├── Quiz-BackEnd/                # Express.js backend server
│   ├── admin/                   # React admin panel
│   │   ├── build/               # Production build
│   │   ├── src/
│   │   │   ├── Pages/
│   │   │   │   ├── Admin/       # Admin dashboard
│   │   │   │   └── Login.js
│   │   │   └── ...
│   │   └── package.json
│   ├── Controllers/             # Route controllers
│   │   ├── QuizCtrl.js
│   │   └── UserCtrl.js
│   ├── Models/                  # Mongoose models
│   │   ├── Quiz.js
│   │   ├── User.js
│   │   ├── Level.js
│   │   ├── Faculty.js
│   │   ├── Speciality.js
│   │   └── Emd.js
│   ├── Routes/                  # Express routes
│   │   ├── QuizRoute.js
│   │   └── UserRoute.js
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js              # Authentication middleware
│   │   ├── jwt.js               # JWT utilities
│   │   └── logger.js            # Request logging
│   ├── index.js                 # Server entry point
│   └── package.json
│
└── README.md
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Expo CLI** (for mobile app development)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Quiz
```

### 2. Backend Setup

```bash
cd Quiz-BackEnd

# Install dependencies
npm install
# or
yarn install

# Create .env file
touch .env
```

Add the following to `.env`:

```env
CONNECTION_URL=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Admin Panel Setup

```bash
cd Quiz-BackEnd/admin

# Install dependencies
npm install
# or
yarn install

# Build the admin panel (production)
npm run build
# or
yarn build
```

### 4. Mobile App Setup

```bash
cd Quiz-App

# Install dependencies
npm install
# or
yarn install

# Configure environment
# Edit src/env.js with your backend API URL
```

## Running the Application

### Backend Server

```bash
cd Quiz-BackEnd

# Development mode (with nodemon)
npm run server
# or
yarn server

# Production mode
npm start
# or
yarn start
```

The server will run on `http://localhost:8000` (or the port specified in `.env`).

### Mobile App

```bash
cd Quiz-App

# Start Expo development server
npm start
# or
yarn start

# Run on Android
npm run android
# or
yarn android

# Run on iOS (macOS only)
npm run ios
# or
yarn ios

# Run on web
npm run web
# or
yarn web
```

### Admin Panel (Development)

```bash
cd Quiz-BackEnd/admin

# Start development server
npm start
# or
yarn start
```

The admin panel will be available at `http://localhost:3000` (or the next available port).

## API Endpoints

### User Routes (`/api/v1/users`)

- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)

### Quiz Routes (`/api/v1/quiz`)

#### Public Endpoints

- `GET /GameData` - Get game data (levels, faculties, specialities, etc.)

#### Protected Endpoints (require authentication)

- `GET /quizs` - Get all quizzes (admin only)
- `GET /quiz/:id` - Get single quiz (admin only)
- `POST /quiz` - Create new quiz (admin only)
- `PUT /quiz/:id` - Update quiz (admin only)
- `DELETE /quiz/:id` - Delete quiz (admin only)
- `PUT /updateCoins` - Update user coins
- `PUT /solved` - Mark quiz as solved
- `PUT /booked` - Add/remove bookmark
- `GET /getBookmarks` - Get user bookmarks

#### Admin-Only Endpoints

**Specialities:**

- `POST /speciality` - Create speciality
- `GET /specialities` - Get all specialities
- `GET /speciality/:id` - Get single speciality
- `PUT /speciality/:id` - Update speciality
- `DELETE /speciality/:id` - Delete speciality

**Faculties:**

- `POST /Faculty` - Create faculty
- `GET /Faculties` - Get all faculties
- `GET /Faculty/:id` - Get single faculty
- `PUT /Faculty/:id` - Update faculty
- `DELETE /Faculty/:id` - Delete faculty

**Levels:**

- `POST /Level` - Create level
- `GET /Levels` - Get all levels
- `GET /Level/:id` - Get single level
- `PUT /Level/:id` - Update level
- `DELETE /level/:id` - Delete level

**EMD:**

- `POST /Emd` - Create EMD
- `GET /Emds` - Get all EMDs
- `GET /Emd/:id` - Get single EMD
- `PUT /Emd/:id` - Update EMD
- `DELETE /Emd/:id` - Delete EMD

## Database Models

### User Model

- `name`: String
- `username`: String (unique)
- `password`: String (hashed)
- `email`: String
- `role`: Enum ['user', 'admin', 'super_admin']
- `picture`: String (URL)
- `coins`: Number (default: 0)
- `bookmarks`: Array of Quiz ObjectIds
- `solved`: Array of Quiz ObjectIds
- `timestamps`: Created/Updated dates

### Quiz Model

- `Question`: String (required)
- `RightAnswer`: String (required)
- `FalseAnswers`: Array (required)
- `Counter`: Number (required)
- `Review`: String (required)
- `Picture`: String (optional)
- `Level`: ObjectId (reference to Level)
- `Owner`: ObjectId (reference to User, required)
- `timestamps`: Created/Updated dates

### Additional Models

- **Level**: Represents academic levels
- **Faculty**: Represents medical faculties
- **Speciality**: Represents medical specialities
- **Emd**: Represents EMD (Enseignement Médical de Droit)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Environment Variables

### Backend (.env)

| Variable         | Description                | Required           |
| ---------------- | -------------------------- | ------------------ |
| `CONNECTION_URL` | MongoDB connection string  | Yes                |
| `PORT`           | Server port number         | No (default: 8000) |
| `JWT_SECRET`     | Secret key for JWT signing | Yes                |
| `NODE_ENV`       | Environment mode           | No                 |

### Mobile App (src/env.js)

Configure the backend API URL in `src/env.js`:

```javascript
export const API_URL = "http://localhost:8000/api/v1";
// or your production URL
```

## Development

### Code Structure

- **Mobile App**: Uses Redux for state management with separate action creators and reducers
- **Backend**: Follows MVC pattern with Controllers, Models, and Routes
- **Admin Panel**: React components organized by pages and features

### Logging

The backend includes comprehensive logging:

- **Morgan**: HTTP request logging to console (development)
- **Custom Logger**: Request logging to `serverLogs.txt` file

## Building for Production

### Mobile App

```bash
cd Quiz-App

# Build Android APK
expo build:android

# Build iOS (requires Apple Developer account)
expo build:ios
```

### Admin Panel

```bash
cd Quiz-BackEnd/admin

# Build for production
npm run build
# or
yarn build

# The build folder will be served by the Express server
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
2. **JWT Token Issues**: Verify JWT_SECRET is set in .env
3. **Expo Build Errors**: Clear cache with `expo start -c`
4. **Port Already in Use**: Change PORT in .env or kill the process using the port

## License

ISC

## Notes

- The admin panel build is served statically by the Express server
- User passwords are hashed using bcrypt with salt rounds of 12
- The mobile app uses Redux Persist to maintain state across app restarts
- Sound effects are included for better user experience
- The application supports both light and dark themes (configured in app.json)

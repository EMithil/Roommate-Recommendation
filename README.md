
# RoommateFinder - PERN Stack Application

A full-stack application for finding compatible roommates using PostgreSQL, Express, React, and Node.js.

## Project Structure

The project is divided into two main parts:
- `server/` - Backend Express server with PostgreSQL
- `src/` - Frontend React application

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL

## Setting Up the Backend

1. **Set up the database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE roommatefinder;

# Connect to the database
\c roommatefinder

# Exit PostgreSQL
\q
```

2. **Initialize the database schema:**

```bash
# Connect to the database and run the SQL script
psql -U postgres -d roommatefinder -f ./server/database.sql
```

3. **Configure environment variables:**

```bash
# Navigate to the server directory
cd server

# Copy the example env file
cp .env.example .env

# Edit the .env file with your PostgreSQL credentials
# and set a JWT secret
```

4. **Install backend dependencies:**

```bash
# In the server directory
npm install
```

5. **Start the backend server:**

```bash
# In the server directory
npm run dev
```

## Setting Up the Frontend

1. **Install frontend dependencies:**

```bash
# In the project root directory
npm install
```

2. **Start the frontend development server:**

```bash
# In the project root directory
npm run dev
```

## Accessing the Application

- Backend API: http://localhost:5000
- Frontend: http://localhost:8080

## Development Workflow

1. Make changes to the code
2. See real-time updates in the browser
3. Use the browser's developer tools for debugging

## Building for Production

```bash
# Build the frontend
npm run build

# The built files will be in the dist directory
```

## API Routes

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/auth/user - Get current user data (requires auth)

### Profiles
- POST /api/profiles - Create or update profile (requires auth)
- GET /api/profiles - Get all profiles (requires auth)
- GET /api/profiles/me - Get current user's profile (requires auth)
- GET /api/profiles/:id - Get profile by user ID (requires auth)

### Matches
- POST /api/matches/:profileId - Like a profile (requires auth)
- GET /api/matches - Get all matches (requires auth)

### Messages
- POST /api/messages/:matchId - Send a message (requires auth)
- GET /api/messages/:matchId - Get all messages for a match (requires auth)

## License

This project is licensed under the MIT License.

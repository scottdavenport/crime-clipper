# Crime Clipper

A web application for tracking and analyzing crime data.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase CLI (`npm install -g firebase-tools`)

## Project Structure

```
crime-clipper/
├── packages/
│   ├── functions/     # Firebase Cloud Functions (Backend)
│   └── web/          # React Web Application (Frontend)
```

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/scottdavenport/crime-clipper.git
cd crime-clipper
```

2. Install dependencies:

```bash
# Install root dependencies
npm install

# Install functions dependencies
cd packages/functions
npm install

# Install web dependencies
cd ../web
npm install
```

## Running the Application

### Starting the Backend (Firebase Emulators)

The backend uses Firebase Emulators for local development. To start the emulators:

```bash
cd packages/functions
firebase emulators:start
```

This will start the following services:

- Firebase Emulator UI: http://localhost:4000
- Firebase Functions: http://localhost:5001
- Firebase Auth: http://localhost:9099
- Firebase Firestore: http://localhost:8080
- Firebase PubSub: http://localhost:8085
- Firebase Storage: http://localhost:9199
- Firebase Eventarc: http://localhost:9299

### Starting the Frontend (Web App)

To start the web application:

```bash
cd packages/web
npm run dev
```

The web application will be available at http://localhost:3000

### Using the Start Script

Alternatively, you can use the provided start script to run both services:

```bash
./start-dev.sh
```

This will start both the Firebase emulators and the web application in separate terminal tabs.

### Stopping the Services

To stop all running services:

```bash
./kill-dev.sh
```

## Available Scripts

- `npm run dev` - Start the development server (web)
- `npm run build` - Build the application for production
- `npm run serve` - Start the Firebase emulators (functions)
- `npm test` - Run tests
- `start-dev.sh` - Start all development services
- `kill-dev.sh` - Stop all development services

## Development URLs

- Web Application: http://localhost:3000
- Firebase Emulator UI: http://localhost:4000
- Firebase Functions: http://localhost:5001
- Firebase Auth: http://localhost:9099
- Firebase Firestore: http://localhost:8080
- Firebase PubSub: http://localhost:8085
- Firebase Storage: http://localhost:9199
- Firebase Eventarc: http://localhost:9299

## Authentication

The application uses Firebase Authentication. In development:

1. Register a new user at `/register`
2. Login at `/login`
3. View authentication status in the Firebase Emulator UI

## User Profiles

The application includes user profile management:

1. Access your profile at `/profile`
2. Edit profile information:
   - Display name
   - Bio
   - Location
   - Social media links (YouTube, Spotify, Twitter)
3. View profile debug information at `/profile-debug`

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)

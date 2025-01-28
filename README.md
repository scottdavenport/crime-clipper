# Crime Clipper

A modern crime reporting and tracking application built with React, Firebase, and Material-UI.

## Development Setup

### Prerequisites

- Node.js v20 or later
- Firebase CLI (`npm install -g firebase-tools`)
- tmux (for development environment)

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crime-clipper.git
cd crime-clipper
```

2. Install dependencies:

```bash
npm install
```

3. Start the development environment:

```bash
./scripts/start-all.sh
```

### Development Environment

The project uses a tmux-based development environment that automatically starts all necessary services in split panes:

#### Firebase Emulators (Left Pane):

- Authentication: http://localhost:9099
- Functions: http://localhost:5001
- Firestore: http://localhost:8080
- Hosting: http://localhost:5002
- Pub/Sub: http://localhost:8085
- Storage: http://localhost:9199
- Eventarc: http://localhost:9299
- Emulator UI: http://localhost:4000
- Emulator Hub: http://localhost:4400

#### Web Development Server (Right Pane):

- Vite Dev Server: http://localhost:3000

### Development Scripts

The project includes several convenience scripts:

- `./scripts/start-all.sh` - Starts both Firebase emulators and web development server
- `./scripts/start-firebase.sh` - Starts Firebase emulators only
- `./scripts/start-web.sh` - Starts web development server only

### Project Structure

```
crime-clipper/
├── packages/
│   ├── web/          # React web application
│   └── functions/    # Firebase Cloud Functions
├── scripts/          # Development utility scripts
├── data/            # Firebase emulator data
└── .firebase/       # Firebase cache and configuration
```

### Features

#### Authentication

- Email/Password registration and login
- Google Sign-In integration
- Protected routes for authenticated users
- Automatic user profile creation
- Profile management

#### Development Tools

- TypeScript for type safety
- Material-UI for consistent design
- Firebase Emulators for local development
- Error boundary implementation
- Development environment automation

### Tech Stack

- **Frontend**: React, Material-UI, TypeScript
- **Backend**: Firebase Services
  - Authentication
  - Cloud Functions
  - Firestore
  - Cloud Storage
  - Hosting
- **Development**: Vite, Firebase Emulators
- **Testing**: Jest, Firebase Testing

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

See [ROADMAP.md](ROADMAP.md) for current progress and planned features.

## License

[Add your license here]

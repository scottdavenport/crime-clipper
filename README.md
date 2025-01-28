# Crime Clipper

A modern crime reporting and tracking application.

## Development Setup

### Prerequisites

- Node.js v20 or later
- Firebase CLI
- tmux (automatically installed if missing)

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

### Development Scripts

The project includes several convenience scripts to manage development servers:

- `./scripts/start-all.sh` - Starts both Firebase emulators and web development server in split panes
- `./scripts/start-firebase.sh` - Starts Firebase emulators only
- `./scripts/start-web.sh` - Starts web development server only

### Development Servers

When running `start-all.sh`, the following services will be available:

#### Firebase Emulators:

- Authentication: http://localhost:9099
- Functions: http://localhost:5001
- Firestore: http://localhost:8080
- Hosting: http://localhost:5002
- Pub/Sub: http://localhost:8085
- Storage: http://localhost:9199
- Eventarc: http://localhost:9299
- Emulator UI: http://localhost:4000

#### Web Development Server:

- Local: http://localhost:3000

### Project Structure

```
crime-clipper/
├── packages/
│   ├── web/          # React web application
│   └── functions/    # Firebase Cloud Functions
├── scripts/          # Development utility scripts
└── data/            # Firebase emulator data
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

[Add your license here]

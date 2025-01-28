# Crime Clipper

A modern web and mobile application built with React, React Native, and Firebase.

## Prerequisites

- Node.js >= 18
- npm >= 9
- Firebase CLI
- iOS/Android development environment (for mobile)

## Quick Start

```bash
# Install dependencies
npm install

# Start development servers (web + api)
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Project Structure

```
packages/
  ├── app/          # React Native mobile app
  ├── web/          # React web application
  └── functions/    # Firebase Cloud Functions
```

## Development

- Web app: http://localhost:3000
- API/Functions: http://localhost:5001
- Firebase Emulator UI: http://localhost:4000

## Environment Setup

1. Copy `.env.example` to `.env` in each package
2. Configure Firebase project settings
3. Set up required API keys and configurations

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT

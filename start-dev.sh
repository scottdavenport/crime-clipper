#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting development servers..."

# Kill any existing processes on the ports we need
kill_port() {
    local port=$1
    local pid=$(lsof -t -i:$port)
    if [ ! -z "$pid" ]; then
        echo "Killing process on port $port"
        kill -9 $pid
    fi
}

kill_port 3000  # Web
kill_port 4000  # Firebase UI
kill_port 5001  # Functions
kill_port 5002  # Hosting
kill_port 8080  # Firestore
kill_port 9099  # Auth

# Function to run a command in a new Cursor terminal tab
run_in_cursor_tab() {
    local title=$1
    local command=$2
    echo "Starting $title..."
    # The command will be run in a new terminal tab by Cursor
    eval "$command"
}

# Start each service in its own tab
run_in_cursor_tab "Firebase Emulators" "firebase emulators:start"
run_in_cursor_tab "Web Server" "cd packages/web && npm run dev"

echo "Development servers are starting in separate tabs..."
echo "Web: http://localhost:3000"
echo "Firebase Emulator UI: http://localhost:4000"
echo "Firebase Functions: http://localhost:5001"
echo "Firebase Hosting: http://localhost:5002"
echo "Firebase Firestore: http://localhost:8080"
echo "Firebase Auth: http://localhost:9099" 
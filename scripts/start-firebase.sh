#!/bin/bash

# Exit on error
set -e

# Store our own PID to avoid killing ourselves
OUR_PID=$$
SCRIPT_NAME=$(basename "$0")
echo "Script running with PID: $OUR_PID"

# Set up trap to handle script termination
cleanup_on_exit() {
    echo "Script exiting, cleaning up..."
    jobs -p | while read pid; do
        if [ "$pid" != "$OUR_PID" ]; then
            kill -9 "$pid" 2>/dev/null || true
        fi
    done
    exit 0
}
trap cleanup_on_exit SIGINT SIGTERM EXIT

echo "🔄 Cleaning up existing Firebase processes..."

# Remove all emulator hub locator files
echo "Removing hub locator files..."
rm -f /tmp/hub-*.json 2>/dev/null || true
rm -rf ~/.cache/firebase/emulators/* 2>/dev/null || true
rm -rf "$(pwd)/.firebase" 2>/dev/null || true

# Kill all Java emulator processes
echo "Killing Java processes..."
for pattern in "firestore.*jar" "pubsub.*jar" "cloud-firestore-emulator" "cloud-storage-emulator" "firebase-database-emulator"; do
    jps | grep -i "$pattern" | cut -d " " -f1 | while read pid; do
        echo "Killing Java process $pid"
        kill -9 "$pid" 2>/dev/null || true
    done
done

# Clean up all debug and lock files
echo "🧹 Cleaning up debug and lock files..."
find . -name "firebase-debug.log" -delete 2>/dev/null || true
find . -name "firestore-debug.log" -delete 2>/dev/null || true
find . -name "ui-debug.log" -delete 2>/dev/null || true
find . -name "pubsub-debug.log" -delete 2>/dev/null || true
find . -name ".emulator*" -delete 2>/dev/null || true

# Kill all Firebase processes
echo "Killing Firebase processes..."
pkill -f "firebase" || true
pkill -f "emulator" || true

# Clean up environment variables
echo "Cleaning environment..."
unset FIREBASE_EMULATOR_HUB
unset FIREBASE_EMULATORS_PATH
unset FIREBASE_CONFIG
unset FIREBASE_PROJECT
unset FIREBASE_TOKEN
unset GOOGLE_APPLICATION_CREDENTIALS
unset GCLOUD_PROJECT

# Wait to ensure everything is cleaned up
echo "Waiting for processes to fully terminate..."
sleep 3

echo "✨ All Firebase processes cleaned up"
echo "🚀 Starting Firebase emulators..."

# Start Firebase emulators
firebase emulators:start \
  --only auth,functions,firestore,hosting,pubsub,storage,eventarc \
  --project demo-crime-clipper \
  --import=./data \
  --export-on-exit=./data \
  2>&1 | tee firebase-debug.log 
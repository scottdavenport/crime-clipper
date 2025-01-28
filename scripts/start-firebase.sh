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

# First, remove all hub locator files
echo "Removing hub locator files..."
rm -f /tmp/hub-*.json
rm -f /var/folders/*/*/*/hub-*.json 2>/dev/null || true

# Kill Java processes first (they're the most persistent)
echo "Killing Java processes..."
for pattern in "firestore.*jar" "pubsub.*jar" "cloud-firestore-emulator" "firebase-database-emulator"; do
    jps | grep -i "$pattern" | cut -d' ' -f1 | while read -r pid; do
        echo "Killing Java process $pid"
        kill -9 "$pid" 2>/dev/null || true
    done
done

# Kill any remaining Java processes that might be related
jps | grep -i "emulator" | cut -d' ' -f1 | while read -r pid; do
    echo "Killing Java emulator process $pid"
    kill -9 "$pid" 2>/dev/null || true
done

# Clean up all debug and lock files
echo "🧹 Cleaning up debug and lock files..."
find "$(dirname "$0")/.." -name "firebase-debug.log" -delete
find "$(dirname "$0")/.." -name "firestore-debug.log" -delete
find "$(dirname "$0")/.." -name "pubsub-debug.log" -delete
find "$(dirname "$0")/.." -name "ui-debug.log" -delete
find "$(dirname "$0")/.." -name ".firebase" -type d -exec rm -rf {} +
find "$(dirname "$0")/.." -name ".emulator*" -delete

# Kill Firebase processes
echo "Killing Firebase processes..."
pkill -f "firebase" || true
pkill -f "emulator" || true

# Clean up environment
echo "Cleaning environment..."
unset FIRESTORE_EMULATOR_HOST
unset FIREBASE_DATABASE_EMULATOR_HOST
unset FIREBASE_AUTH_EMULATOR_HOST
unset FIREBASE_STORAGE_EMULATOR_HOST
unset PUBSUB_EMULATOR_HOST
unset CLOUD_FUNCTIONS_EMULATOR_HOST
unset FIREBASE_EMULATOR_HUB
unset FIREBASE_LOCAL_HOST

# Wait to ensure everything is cleaned up
echo "Waiting for processes to fully terminate..."
sleep 3

echo "✨ All Firebase processes cleaned up"
echo "🚀 Starting Firebase emulators..."

# Change to the functions directory
cd "$(dirname "$0")/../packages/functions" || exit

# Start emulators with clean state and explicit ports
firebase emulators:start \
    --only auth,functions,firestore,hosting,pubsub,storage,eventarc \
    --project demo-crime-clipper \
    --import=./data \
    --export-on-exit=./data

# Keep the script running
wait 
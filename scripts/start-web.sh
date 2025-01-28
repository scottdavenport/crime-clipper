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

echo "🔄 Cleaning up existing web processes..."

# Kill process by port
kill_port() {
    local port=$1
    local pids=$(lsof -ti :$port 2>/dev/null || true)
    if [ ! -z "$pids" ]; then
        echo "Found process(es) on port $port:"
        for pid in $pids; do
            if [ "$pid" != "$OUR_PID" ]; then
                local cmd=$(ps -p "$pid" -o command= 2>/dev/null || true)
                if [[ ! "$cmd" =~ $SCRIPT_NAME ]]; then
                    echo "$cmd"
                    kill -9 "$pid" 2>/dev/null || true
                    pkill -P "$pid" 2>/dev/null || true
                fi
            fi
        done
    fi
}

# Web server ports to check
echo "🔍 Cleaning up ports..."
for port in {3000..3010} {5000..5010}; do
    kill_port "$port"
done

# Kill any existing development servers
echo "Killing development server processes..."
pkill -f "vite" || true
pkill -f "dev-server" || true
pkill -f "next" || true
pkill -f "react-scripts" || true
pkill -f "webpack" || true

# Clean up debug and lock files
echo "🧹 Cleaning up debug and lock files..."
find "$(dirname "$0")/../packages/web" -name ".next" -type d -exec rm -rf {} + 2>/dev/null || true
find "$(dirname "$0")/../packages/web" -name "node_modules/.vite" -type d -exec rm -rf {} + 2>/dev/null || true
find "$(dirname "$0")/../packages/web" -name ".nuxt" -type d -exec rm -rf {} + 2>/dev/null || true

# Clean up environment
echo "Cleaning environment..."
unset PORT
unset HOST
unset BROWSER
unset DEV_SERVER_PORT

# Wait to ensure everything is cleaned up
echo "Waiting for processes to fully terminate..."
sleep 2

echo "✨ All web processes cleaned up"
echo "🚀 Starting web development server..."

# Change to the web directory
cd "$(dirname "$0")/../packages/web" || exit

# Enable debug environment variables
export DEBUG=vite:*
export VITE_DEBUG=true
export NODE_OPTIONS="--trace-warnings --trace-deprecation"
export REACT_DEBUG_TOOLS=true
export VITE_VERBOSE=true
export NODE_ENV=development

# Start the development server with debug flags
npm run dev -- --debug --force 2>&1 | tee vite-debug.log

# Keep the script running
wait 
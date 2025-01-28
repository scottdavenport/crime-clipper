#!/bin/bash

# Exit on error
set -e

# Get the absolute path to the project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🚀 Starting all services..."

# Kill any existing tmux sessions
tmux kill-server 2>/dev/null || true
sleep 1

# Create a new tmux session with Firebase
tmux new-session -d -s crime-clipper "cd '$PROJECT_ROOT' && $PROJECT_ROOT/scripts/start-firebase.sh; read"

# Create a horizontal split with web server
tmux split-window -h -t crime-clipper "cd '$PROJECT_ROOT' && $PROJECT_ROOT/scripts/start-web.sh; read"

# Set the layout to even horizontal
tmux select-layout -t crime-clipper even-horizontal

# Attach to the session
tmux attach-session -t crime-clipper

echo "✨ All services started in split panes"
echo "📝 Note: Press Ctrl-C in each pane to stop the services" 
#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting all services..."

# Create a new tmux session if not already in one
if [ -z "$TMUX" ]; then
    # Start a new session with Firebase
    tmux new-session -d -s crime-clipper './scripts/start-firebase.sh'
    
    # Create a horizontal split with web server
    tmux split-window -h './scripts/start-web.sh'
    
    # Attach to the session
    tmux attach-session -t crime-clipper
else
    echo "Already in a tmux session, creating splits..."
    # Split the current pane and run services
    tmux split-window -h './scripts/start-firebase.sh'
    tmux select-pane -t 0
    tmux split-window -h './scripts/start-web.sh'
fi

echo "✨ All services started in split panes"
echo "📝 Note: Use tmux commands or mouse to switch between panes" 
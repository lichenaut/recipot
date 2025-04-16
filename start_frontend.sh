#!/bin/bash

# Function to start Vite frontend
start_frontend() {
    echo "Starting Vite frontend..."
    cd frontend || { echo "Frontend directory not found!"; exit 1; }

    while true; do
        npm start -- --host 0.0.0.0 --port 3000 &
        FRONTEND_PID=$!
        echo "Vite server started with PID $FRONTEND_PID"

        wait $FRONTEND_PID  # Wait for process exit
        echo "Vite server crashed! Restarting..."
        sleep 2
    done
}

start_frontend

echo "Vite server is running and will restart if it crashes."
#!/bin/bash

# Function to check if Django is already running
is_django_running() {
    pgrep -f "manage.py runserver" > /dev/null
}

# Function to start Django backend
start_backend() {
    echo "Starting Django server..."
    source venv/bin/activate  # Activate virtual environment
    cd backend || { echo "Backend directory not found!"; exit 1; }

    while true; do
        if is_django_running; then
            echo "Django server is already running. Skipping start."
        else
            python manage.py runserver 0.0.0.0:8000 &
            BACKEND_PID=$!
            echo "Django server started with PID $BACKEND_PID"
        fi

        wait $BACKEND_PID  # Wait for process exit
        echo "Django server crashed! Restarting..."
        sleep 2
    done
}

start_backend

echo "Django server is running and will restart if it crashes."
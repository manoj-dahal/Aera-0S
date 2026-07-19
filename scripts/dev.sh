#!/bin/bash
echo "==================================="
echo " AERA OS - Development Environment"
echo "==================================="

# Check for environment variables
if [ ! -f .env ]; then
    echo "⚠️  WARNING: .env file not found. Falling back to mock APIs."
fi

# Run the concurrent development server
echo "🚀 Booting AERA OS..."
npm run electron:serve
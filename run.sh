#!/bin/bash

# Script to run the ICP Job Marketplace application

echo "Starting the ICP Job Marketplace application..."

# Navigate to the backend directory
cd "$(dirname "$0")/backend" || { echo "Error: Could not navigate to backend directory"; exit 1; }

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo "Error: dfx is not installed. Please install the DFINITY SDK first."
    echo "Visit: https://internetcomputer.org/docs/current/developer-docs/setup/install"
    exit 1
fi

# Check if the replica is already running
if ! dfx ping &> /dev/null; then
    echo "Starting the Internet Computer replica..."
    dfx start --background || { echo "Error: Failed to start the replica"; exit 1; }
    # Wait for the replica to start
    sleep 5
else
    echo "Internet Computer replica is already running."
fi

# Deploy the canisters
echo "Deploying canisters..."
dfx deploy || { echo "Error: Failed to deploy canisters"; exit 1; }

# Get the frontend canister ID
FRONTEND_CANISTER_ID=$(dfx canister id backend_frontend)

echo "Deployment complete!"
echo "You can access the application at: http://localhost:4943?canisterId=$FRONTEND_CANISTER_ID"
echo ""
echo "To stop the replica when you're done, run: dfx stop"
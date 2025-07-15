s#!/bin/bash

# -- Run npm install in client
gnome-terminal -- bash -c "cd \"$(pwd)/client\" && npm install; exec bash"

# -- Run npm install in server
gnome-terminal -- bash -c "cd \"$(pwd)/server\" && npm install; exec bash"

# -- Ask for env variables
read -p "Enter GEMINI_API_KEY: " GEMINI_API_KEY
read -p "Enter MONGO_URI [default: mongodb://localhost:27017]: " MONGO_URI
MONGO_URI=${MONGO_URI:-mongodb://localhost:27017}
read -p "Enter JWT_SECRET: " JWT_SECRET

# -- Write .env files
echo -e "GEMINI_API_KEY=$GEMINI_API_KEY\nMONGO_URI=$MONGO_URI\nJWT_SECRET=$JWT_SECRET" > client/.env
echo -e "GEMINI_API_KEY=$GEMINI_API_KEY\nMONGO_URI=$MONGO_URI\nJWT_SECRET=$JWT_SECRET" > server/.env

echo "Setup complete. Now go deploy your JS Frankenstein."

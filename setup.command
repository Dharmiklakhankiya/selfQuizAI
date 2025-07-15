#!/bin/bash

# -- Run npm install in client
osascript -e 'tell app "Terminal" to do script "cd \"'"$(pwd)/client"'\" && npm install"'

# -- Run npm install in server
osascript -e 'tell app "Terminal" to do script "cd \"'"$(pwd)/server"'\" && npm install"'

# -- Ask for env variables
read -p "Enter GEMINI_API_KEY: " GEMINI_API_KEY
read -p "Enter MONGO_URI [default: mongodb://localhost:27017]: " MONGO_URI
MONGO_URI=${MONGO_URI:-mongodb://localhost:27017}
read -p "Enter JWT_SECRET: " JWT_SECRET

# -- Write .env files
echo -e "GEMINI_API_KEY=$GEMINI_API_KEY\nMONGO_URI=$MONGO_URI\nJWT_SECRET=$JWT_SECRET" > client/.env
echo -e "GEMINI_API_KEY=$GEMINI_API_KEY\nMONGO_URI=$MONGO_URI\nJWT_SECRET=$JWT_SECRET" > server/.env

echo "Setup complete. Go commit war crimes with code."

#!/bin/bash

# Open client in new terminal
gnome-terminal -- bash -c "cd \"$(pwd)/client\" && npm run dev; exec bash"

# Open server in new terminal
gnome-terminal -- bash -c "cd \"$(pwd)/server\" && npm run dev; exec bash"

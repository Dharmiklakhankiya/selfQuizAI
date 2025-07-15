#!/bin/bash

# Launch client
osascript -e 'tell app "Terminal"
    do script "cd \"'"$(pwd)/client"'\" && npm run dev"
end tell'

# Launch server
osascript -e 'tell app "Terminal"
    do script "cd \"'"$(pwd)/server"'\" && npm run dev"
end tell'

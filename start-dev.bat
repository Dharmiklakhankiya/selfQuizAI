@echo off
REM Start client in new terminal
start "Client" cmd /k "cd /d %~dp0client && npm run dev"

REM Start server in another new terminal
start "Server" cmd /k "cd /d %~dp0server && npm run dev"

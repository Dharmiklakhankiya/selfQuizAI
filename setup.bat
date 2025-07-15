@echo off
setlocal

REM -- Launch npm install in client
start "Client Setup" cmd /k "cd /d %~dp0client && npm install"

REM -- Launch npm install in server
start "Server Setup" cmd /k "cd /d %~dp0server && npm install"

REM -- Ask for env variables
set /p GEMINI_API_KEY=Enter GEMINI_API_KEY:
set /p MONGO_URI=Enter MONGO_URI [default: mongodb://localhost:27017]:
if "%MONGO_URI%"=="" set MONGO_URI=mongodb://localhost:27017
set /p JWT_SECRET=Enter JWT_SECRET:

REM -- Write to .env files
echo GEMINI_API_KEY=%GEMINI_API_KEY%> client\.env
echo MONGO_URI=%MONGO_URI%>> client\.env
echo JWT_SECRET=%JWT_SECRET%>> client\.env

echo GEMINI_API_KEY=%GEMINI_API_KEY%> server\.env
echo MONGO_URI=%MONGO_URI%>> server\.env
echo JWT_SECRET=%JWT_SECRET%>> server\.env

echo All done. Get back to work.
pause
    
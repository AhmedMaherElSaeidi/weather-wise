@echo off

REM Check if anything is running on port 5173 and kill it
netstat -ano | findstr :5173 | findstr /i "LISTENING"
IF %ERRORLEVEL% EQU 0 (
    FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :5173 ^| findstr /i "LISTENING"') DO (
        Taskkill /PID %%P /F
    )
)

REM Run npm run dev to start the development server
npm run dev

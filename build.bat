@echo off
echo ==> Building frontend...
cd frontend
call npm install --silent
call npm run build:static
cd ..

echo ==> Copying static files to backend...
if exist backend\static rmdir /s /q backend\static
xcopy frontend\out backend\static /E /I /Q

echo ==> Done! Frontend built and copied to backend\static\

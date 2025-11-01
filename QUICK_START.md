# Quick Start Guide

## Your Application is Ready!

Both the backend and frontend servers are currently running:

- **Backend API**: http://localhost:3001
- **Frontend UI**: http://localhost:5173

## Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see a clean, modern interface displaying hot topics from Reddit's r/answers.

## What You Can Do

1. **View Hot Topics**: The main page displays the latest hot topics from r/answers
2. **Refresh Data**: Click the "Refresh" button in the header to manually refresh the topics
3. **Read Full Topics**: Click on any topic title to open the full discussion on Reddit

## Running the Servers

### Backend Server
```bash
cd backend
npm run dev
```
Server runs on http://localhost:3001

### Frontend Server
```bash
cd frontend
npm run dev
```
Server runs on http://localhost:5173

## Testing the API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Get Hot Topics
```bash
curl http://localhost:3001/api/topics/hot?limit=10
```

### Refresh Cache
```bash
curl -X POST http://localhost:3001/api/topics/refresh
```

## Stopping the Servers

Press `Ctrl+C` in each terminal where the servers are running.

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Shows spinners while fetching data
- **Error Handling**: Displays friendly error messages with retry options
- **Caching**: 5-minute cache to reduce API calls
- **Real-time Updates**: Manual refresh to get latest topics
- **Clean UI**: Modern, professional design with Tailwind CSS

## Troubleshooting

If you see connection errors:
1. Ensure both backend and frontend servers are running
2. Check that ports 3001 and 5173 are available
3. Verify the API URL in frontend/.env matches your backend URL

For more details, see README.md

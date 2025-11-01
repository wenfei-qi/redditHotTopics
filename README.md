# Reddit Answers Tracker

A production-ready web application that tracks and displays hot topics from Reddit's r/answers community. Built with React, TypeScript, Tailwind CSS, and Node.js.

## Features

- Real-time tracking of hot topics from r/answers
- Clean and responsive UI design
- Loading states and error handling
- Auto-refresh functionality with manual refresh option
- 5-minute caching to reduce API calls
- Production-ready architecture

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Reddit JSON API** - Data source

## Project Structure

```
claudeCode/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   └── TopicCard.tsx
│   │   ├── services/        # API services
│   │   │   └── api.ts
│   │   ├── types/           # TypeScript types
│   │   │   └── reddit.ts
│   │   ├── App.tsx          # Main application component
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                  # Express backend API
    ├── src/
    │   ├── services/        # Business logic
    │   │   └── reddit.ts
    │   ├── routes/          # API routes
    │   │   └── topics.ts
    │   ├── types/           # TypeScript types
    │   │   └── reddit.ts
    │   └── index.ts         # Server entry point
    ├── package.json
    └── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd /home/wenfei/Dev/playground/claudeCode
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

2. **In a new terminal, start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

#### Production Build

1. **Build the backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## API Endpoints

The backend exposes the following endpoints:

### GET /api/health
Health check endpoint
```json
{
  "status": "ok",
  "message": "Reddit Answers Hot Topics API is running",
  "timestamp": "2025-11-01T15:30:00.000Z"
}
```

### GET /api/topics/hot
Get hot topics from r/answers
- **Query Parameters:**
  - `limit` (optional): Number of topics to fetch (1-100, default: 25)
- **Response:**
  ```json
  {
    "success": true,
    "data": [...],
    "count": 25
  }
  ```

### POST /api/topics/refresh
Clear cache and refresh topics
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cache cleared and topics refreshed",
    "data": [...],
    "count": 25
  }
  ```

## Environment Variables

### Backend
Create a `.env` file in the `backend` directory (optional):
```env
PORT=3001
```

### Frontend
Create a `.env` file in the `frontend` directory (optional):
```env
VITE_API_URL=http://localhost:3001/api
```

## Features in Detail

### Caching
The backend implements a 5-minute cache to reduce API calls to Reddit and improve performance. The cache can be manually cleared using the refresh endpoint.

### Error Handling
- Network errors are gracefully handled with user-friendly messages
- Failed API calls trigger retry mechanisms
- Loading states provide visual feedback during data fetching

### Responsive Design
The UI is fully responsive and works seamlessly across:
- Desktop browsers
- Tablets
- Mobile devices

### Production Ready
- TypeScript for type safety
- Proper error boundaries
- Clean code architecture
- Optimized build process
- SEO-friendly structure

## Deployment

### Backend Deployment
The backend can be deployed to any Node.js hosting service:
- Heroku
- DigitalOcean
- AWS EC2/Lambda
- Vercel
- Railway

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Development

### Adding New Features
1. Backend changes: Edit files in `backend/src/`
2. Frontend changes: Edit files in `frontend/src/`
3. Both servers support hot-reload for development

### Code Quality
- TypeScript strict mode enabled
- ESLint configured for code quality
- Consistent code formatting

## Troubleshooting

### CORS Issues
If you encounter CORS issues, ensure:
1. Backend is running on port 3001
2. Frontend is configured to use the correct API URL
3. CORS is properly configured in `backend/src/index.ts`

### Connection Refused
If the frontend can't connect to the backend:
1. Verify the backend is running
2. Check the API URL in frontend environment variables
3. Ensure firewall rules allow the connection

### Reddit API Rate Limiting
Reddit's public API has rate limits. The caching mechanism helps avoid hitting these limits. If you encounter rate limiting:
1. Increase the cache duration in `backend/src/services/reddit.ts`
2. Reduce the polling frequency
3. Consider implementing Reddit OAuth for higher limits

## License

This project is open source and available for use.

## Contributing

Feel free to submit issues and enhancement requests!

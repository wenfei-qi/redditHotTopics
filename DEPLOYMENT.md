# Deployment Guide - Render.com

This guide will help you deploy the Reddit Hot Topics Tracker to Render.com for free.

## Prerequisites

- A GitHub account with your code pushed to a repository
- A Render.com account (free) - Sign up at https://render.com

## Deployment Steps

### Step 1: Sign Up / Log In to Render

1. Go to https://render.com
2. Sign up for a free account or log in
3. Connect your GitHub account when prompted

### Step 2: Deploy Using Blueprint (Recommended - Easiest Method)

This method uses the `render.yaml` file to automatically set up both services.

1. From your Render dashboard, click **"New +"** button
2. Select **"Blueprint"**
3. Connect your GitHub repository: `wenfei-qi/redditHotTopics`
4. Render will detect the `render.yaml` file
5. Give your blueprint a name (e.g., "Reddit Hot Topics")
6. Click **"Apply"**

Render will automatically create:
- Backend API service
- Frontend static site

### Step 3: Configure Frontend Environment Variable

After the services are created:

1. Go to your **frontend service** (reddit-hot-topics-frontend)
2. Click on **"Environment"** in the left sidebar
3. Add the following environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://reddit-hot-topics-api.onrender.com/api`

   (Replace with your actual backend URL from Render)

4. Click **"Save Changes"**
5. The frontend will automatically redeploy

### Step 4: Get Your Backend URL

1. Go to your **backend service** (reddit-hot-topics-api)
2. Copy the URL at the top (e.g., `https://reddit-hot-topics-api.onrender.com`)
3. Add `/api` to the end for the API URL
4. Use this URL in the frontend environment variable (Step 3)

### Step 5: Access Your Application

Once both services show **"Live"** status:

- **Frontend URL**: `https://reddit-hot-topics-frontend.onrender.com`
- **Backend API**: `https://reddit-hot-topics-api.onrender.com`

Click on your frontend URL to see your live application!

## Alternative: Manual Deployment

If you prefer to deploy services individually:

### Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: reddit-hot-topics-api
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: Leave empty
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
4. Select **"Free"** plan
5. Add environment variable:
   - `NODE_ENV` = `production`
6. Click **"Create Web Service"**

### Deploy Frontend

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: reddit-hot-topics-frontend
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: Leave empty
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://[your-backend-url].onrender.com/api`
5. Click **"Create Static Site"**

## Important Notes

### Free Tier Limitations

- **Services spin down after 15 minutes of inactivity**
- First request after inactivity may take 30-60 seconds (cold start)
- 750 hours/month of free runtime
- Perfect for demos and personal projects

### Automatic Deployments

- Render automatically deploys when you push to your GitHub repository
- Monitor deployments in the Render dashboard

### CORS Configuration

The backend is already configured with CORS enabled for all origins. In production, you may want to restrict this to your frontend URL only.

## Testing Your Deployment

### Test Backend API

Visit your backend health check endpoint:
```
https://[your-backend-url].onrender.com/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Reddit Answers Hot Topics API is running",
  "timestamp": "2025-11-01T..."
}
```

### Test Frontend

Visit your frontend URL and you should see the Reddit Hot Topics interface with live data.

## Troubleshooting

### Frontend can't connect to backend

1. Check that VITE_API_URL environment variable is set correctly
2. Verify the backend URL includes `/api` at the end
3. Ensure backend service is "Live" (green status)

### Backend fails to start

1. Check the logs in Render dashboard
2. Verify build command completed successfully
3. Check that `package.json` has correct `build` and `start` scripts

### Cold starts are slow

This is normal for free tier services. The first request after 15 minutes of inactivity will be slower.

### Update not showing

1. Check the deployment logs
2. Clear your browser cache
3. Verify the deployment succeeded in Render dashboard

## Updating Your Application

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Render automatically detects the push and redeploys

## Custom Domain (Optional)

You can add a custom domain in Render:

1. Go to your service → Settings → Custom Domain
2. Follow Render's instructions to configure DNS

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com

## Cost

This deployment is completely **FREE** using Render's free tier!

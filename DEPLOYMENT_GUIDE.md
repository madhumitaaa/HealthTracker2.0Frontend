# Frontend Deployment Guide

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with local backend URL:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

3. Start development server:
```bash
npm run dev
```

## Build for Production

1. Create `.env.production` file (already configured):
```
VITE_API_BASE_URL=https://health-tracker2-0-backend.vercel.app/api
```

2. Build the project:
```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)
1. Push code to GitHub repository
2. Connect to Vercel dashboard
3. Select the repository
4. Vercel will auto-detect Vite config
5. Add environment variable:
   - `VITE_API_BASE_URL` = `https://health-tracker2-0-backend.vercel.app/api`
6. Deploy!

### Option 2: Deploy to Netlify
1. Run `npm run build`
2. Connect to Netlify
3. Select `dist` as publish directory
4. Add environment variable:
   - `VITE_API_BASE_URL` = `https://health-tracker2-0-backend.vercel.app/api`

### Option 3: Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Then:
```bash
docker build -t health-tracker-frontend .
docker run -p 3000:3000 -e VITE_API_BASE_URL=https://health-tracker2-0-backend.vercel.app/api health-tracker-frontend
```

## API Configuration

The frontend is configured to use:
- **Development**: `http://localhost:3001/api`
- **Production**: `https://health-tracker2-0-backend.vercel.app/api`

Authentication token is automatically included in all requests via Authorization header.

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure the backend has proper CORS headers for your frontend domain.

### Token Expiration
Expired tokens are automatically removed and user is redirected to login page.

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then reinstall
- Check Node version compatibility

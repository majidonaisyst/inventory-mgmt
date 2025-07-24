# Inventory Management System - Setup Guide

## Complete Full-Stack Setup

You now have a complete inventory management system with:

- **Frontend**: Next.js with TypeScript and TailwindCSS
- **Backend**: Express.js with TypeScript
- **Database**: JSON file (simple file-based storage)

## Quick Start

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Start Both Servers

**Option A: Manual (Recommended for Development)**

```bash
# Terminal 1: Start Backend (Port 5000)
cd backend
npm run dev

# Terminal 2: Start Frontend (Port 3001)
npm run dev
```

**Option B: Using Package Scripts**

```bash
# Start backend first
npm run start:backend

# Then start frontend
npm run start:frontend
```

## API Endpoints

The backend provides these REST API endpoints:

- `GET /api/inventory` - Get all items
- `GET /api/inventory/:id` - Get single item
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item
- `GET /api/inventory/:id/suggest-reorder` - Get AI reorder suggestion
- `GET /api/summary/low-stock` - Get AI low stock summary
- `GET /api/health` - Health check

## Features

### ✅ Implemented Features

1. **CRUD Operations**: Complete create, read, update, delete for inventory items
2. **Automatic Status Tracking**: Items with quantity ≤ 5 automatically marked as "Low Stock"
3. **Search & Filtering**: Text search + status/category filters
4. **AI Features**:
   - Smart reorder quantity suggestions
   - Automated low-stock summaries
5. **Dashboard**: Live statistics and insights
6. **API Integration**: Frontend connected to Express backend
7. **Data Persistence**: JSON file database

### 🎯 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, TailwindCSS
- **Backend**: Express.js, TypeScript, Node.js
- **Database**: JSON file (easy to migrate to real DB later)
- **Development**: Hot reload for both frontend and backend

## File Structure

```
├── src/                    # Frontend source
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   ├── lib/              # Utilities & API client
│   └── types/            # TypeScript types
├── backend/               # Backend source
│   ├── src/
│   │   ├── server.ts     # Express server
│   │   ├── services/     # Business logic
│   │   ├── types/        # Backend types
│   │   └── data/         # JSON database
│   └── package.json      # Backend dependencies
└── package.json          # Frontend dependencies
```

## Development Notes

1. **CORS**: Backend configured for frontend on localhost:3001
2. **Error Handling**: Frontend falls back to mock data if backend unavailable
3. **Type Safety**: Shared TypeScript interfaces between frontend/backend
4. **Hot Reload**: Both servers support hot reload during development

## Next Steps

1. **Start the servers** using the commands above
2. **Open the app** at http://localhost:3001
3. **Test the API** at http://localhost:5000/api/health
4. **Add inventory items** and test all features

## Troubleshooting

If you encounter issues:

1. Ensure Node.js 18+ is installed
2. Check that ports 3001 and 5000 are available
3. Verify backend dependencies installed correctly
4. Check console for any TypeScript compilation errors

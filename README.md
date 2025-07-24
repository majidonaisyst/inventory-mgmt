# Inventory Management System

A minimal but functional inventory management system built with Next.js, TypeScript, and TailwindCSS.

## Features

### ✅ Core Inventory Management

- **CRUD Operations**: Add, edit, delete inventory items
- **Item Fields**: name, quantity, category, description, status
- **Status Types**: In Stock, Low Stock, Ordered, Discontinued
- **Automatic Status Tracking**: Items with quantity ≤ 5 automatically marked as "Low Stock"

### 🔍 Search & Filtering

- **Text Search**: Search by item name, description, or category
- **Status Filter**: Filter by all status types
- **Category Filter**: Filter by item categories
- **Real-time Filtering**: All filters work together seamlessly

### 🤖 AI Features

- **Smart Reorder Suggestions**: Click "AI Suggestion" on low-stock items for recommended reorder quantities
- **Inventory Summary**: AI-generated summary of low-stock items with actionable insights
- **Category Insights**: Analysis across different product categories

### 📊 Dashboard & Analytics

- **Live Statistics**: Total items, in-stock count, low-stock alerts, ordered items
- **Category Overview**: Number of unique categories and total quantities
- **Visual Status Cards**: Color-coded status indicators

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage (no backend required)
- **AI Features**: Mock implementation (easily extensible)

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation & Setup

1. **Clone and install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

### Usage

1. **View Dashboard**: See inventory statistics and AI insights
2. **Add Items**: Click "Add New Item" to create inventory entries
3. **Search & Filter**: Use the search bar and dropdown filters
4. **Edit Items**: Click "Edit" on any item card
5. **AI Suggestions**: Click "AI Suggestion" on low-stock items
6. **Delete Items**: Click "Delete" with confirmation prompt

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main inventory page
├── components/
│   ├── DashboardStats.tsx   # Statistics dashboard
│   ├── ItemCard.tsx         # Individual item display
│   ├── ItemForm.tsx         # Add/edit form modal
│   └── SearchFilter.tsx     # Search and filtering
├── lib/
│   └── inventory.ts         # Data management & AI functions
└── types/
    └── inventory.ts         # TypeScript interfaces
```

## Key Components

### ItemCard

- Displays item information with status badges
- Color-coded status indicators
- Edit/Delete actions
- AI suggestion integration for low-stock items

### ItemForm

- Modal form for adding/editing items
- Form validation
- Auto-status calculation based on quantity

### SearchFilter

- Real-time text search
- Status and category dropdown filters
- Dynamic category list generation

### DashboardStats

- Live inventory statistics
- AI-powered low-stock summary
- Visual metrics cards

## Data Model

```typescript
interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  description: string;
  status: "In Stock" | "Low Stock" | "Ordered" | "Discontinued";
  createdAt: Date;
  updatedAt: Date;
}
```

## AI Features Implementation

The system includes mock AI functionality that can be easily extended:

- **Reorder Suggestions**: Based on quantity and category analysis
- **Low Stock Summaries**: Intelligent text generation for alerts
- **Future Extensions**: Ready for OpenAI API integration

## Sample Data

The system comes pre-loaded with sample inventory items including:

- Electronics (laptops, mice, cables)
- Furniture (chairs, desks)
- Office supplies (paper, etc.)

Data persists in localStorage between sessions.

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Browser Support

- Modern browsers with ES2017+ support
- Chrome, Firefox, Safari, Edge
- Mobile responsive design

## Future Enhancements

- [ ] Export/Import functionality
- [ ] Real OpenAI API integration
- [ ] Print reports
- [ ] Barcode scanning
- [ ] Multi-user support
- [ ] Database backend integration

---

Built with ❤️ using Next.js and TypeScript

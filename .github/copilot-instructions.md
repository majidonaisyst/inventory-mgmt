<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Inventory Management System

This is a Next.js inventory management system built with TypeScript, TailwindCSS, and simple React components.

## Key Features

- CRUD operations for inventory items
- Automatic status tracking (Low Stock when quantity <= 5)
- Search and filtering by name, category, status
- AI-powered suggestions for reorder quantities
- Dashboard statistics with insights
- Local storage for data persistence

## Architecture

- Frontend: Next.js 15 with React 18 and TypeScript
- Styling: TailwindCSS
- Data: Local storage (no backend needed)
- State: React hooks (useState, useEffect)

## Components Structure

- `ItemCard`: Display individual inventory items with actions
- `ItemForm`: Modal form for add/edit operations
- `SearchFilter`: Search and filter controls
- `DashboardStats`: Statistics and AI summary display

## Code Style

- Use TypeScript interfaces for type safety
- Functional components with React hooks
- TailwindCSS for styling
- Simple modal patterns for forms
- LocalStorage for data persistence

## AI Features

- Mock reorder quantity suggestions
- Low stock summary generation
- Category-based insights

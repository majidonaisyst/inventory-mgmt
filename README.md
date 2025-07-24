# 📦 Inventory Management System

A modern, full-stack inventory management system built with Next.js, TypeScript, Express.js, and TailwindCSS. Features role-based access control, AI-powered insights, and real-time inventory tracking.

![Inventory Management System](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express.js](https://img.shields.io/badge/Express.js-4.18-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)

## 🌐 Live Demo

**🚀 [Access the Live Application](https://inventory-frontend-e2js.onrender.com/)**

*Note: The application may take 30-60 seconds to wake up from sleep mode (Render free tier limitation)*

### Demo Login Credentials

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | `admin@company.com` | `admin123` | Full access (Create, Read, Update, Delete) |
| **Manager** | `manager@company.com` | `manager123` | Create, Read, Update (no Delete) |
| **Viewer** | `viewer@company.com` | `viewer123` | Read-only access |

## ✨ Features

### 📋 Inventory Management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Smart Status Tracking**: Automatic low-stock detection (quantity ≤ 5)
- **Category Management**: Organize items by categories
- **Status Management**: Track items as In Stock, Low Stock, Ordered, or Discontinued
- **Real-time Updates**: Instant inventory updates across the application

### 🔍 Search & Filtering
- **Multi-field Search**: Search by name, description, or category
- **Advanced Filtering**: Filter by status, category, and custom criteria
- **Real-time Results**: Instant search results as you type
- **Clear Filters**: Easy reset functionality

### 📊 Dashboard Analytics
- **Live Statistics**: Total items, low stock alerts, category distribution
- **Visual Indicators**: Color-coded status badges and progress indicators
- **Category Overview**: Items breakdown by categories
- **Stock Quantity Tracking**: Total inventory quantity monitoring

### 🤖 AI-Powered Features
- **Smart Reorder Suggestions**: AI-generated reorder quantity recommendations
- **Low Stock Summaries**: Intelligent insights about inventory status
- **Category Analytics**: AI-powered category-based recommendations
- **Usage Pattern Analysis**: Mock AI insights based on inventory data

### 🔐 Role-Based Access Control (RBAC)
- **Three User Roles**: Admin, Manager, and Viewer with different permissions
- **JWT Authentication**: Secure token-based authentication system
- **Protected Routes**: Backend API endpoints secured with role validation
- **Frontend Guards**: UI elements shown/hidden based on user permissions
- **Session Management**: Automatic login persistence and secure logout

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern Aesthetics**: Clean interface with gradient accents and shadows
- **Loading States**: Smooth loading indicators and transitions
- **Error Handling**: User-friendly error messages and fallbacks
- **Intuitive Navigation**: Easy-to-use interface with clear action buttons

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and server-side rendering
- **React 18** - Latest React with concurrent features and hooks
- **TypeScript** - Full type safety throughout the application
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **React Context** - State management for authentication and global state

### Backend
- **Express.js** - Fast, unopinionated Node.js web framework
- **TypeScript** - Server-side type safety and enhanced developer experience
- **JWT (jsonwebtoken)** - Secure authentication token management
- **bcrypt** - Password hashing and security
- **CORS** - Cross-origin resource sharing configuration
- **JSON File Database** - Simple file-based data persistence

### Development Tools
- **ESLint** - Code quality and consistency enforcement
- **Prettier** - Automatic code formatting
- **Git** - Version control and collaboration

## 📋 Prerequisites

Before running this project locally, ensure you have:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control - [Download](https://git-scm.com/)

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management-system.git
cd inventory-management-system
```

### 2. Install Dependencies

**Install Frontend Dependencies:**
```bash
npm install
```

**Install Backend Dependencies:**
```bash
cd backend
npm install
cd ..
```

Or use the convenient script:
```bash
npm run install:backend
```

### 3. Environment Configuration

**Frontend Environment (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend Environment (backend/.env):**
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Development Servers

**Option A: Start Both Servers Simultaneously**
```bash
npm run dev:all
```

**Option B: Start Servers Separately**

**Terminal 1 (Backend Server):**
```bash
npm run start:backend
```

**Terminal 2 (Frontend Server):**
```bash
npm run dev
```

### 5. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

## 📁 Project Structure

```
inventory-management-system/
├── 📂 src/                          # Frontend source code
│   ├── 📂 app/                      # Next.js App Router
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout component
│   │   └── page.tsx                 # Home page component
│   ├── 📂 components/               # Reusable React components
│   │   ├── DashboardStats.tsx       # Statistics dashboard
│   │   ├── ItemCard.tsx             # Individual item display
│   │   ├── ItemForm.tsx             # Add/edit item modal
│   │   ├── LoginForm.tsx            # Authentication form
│   │   └── SearchFilter.tsx         # Search and filter controls
│   ├── 📂 contexts/                 # React Context providers
│   │   └── AuthContext.tsx          # Authentication context
│   ├── 📂 lib/                      # Utility functions and API calls
│   │   ├── api.ts                   # Backend API client
│   │   └── inventory.ts             # Inventory management functions
│   └── 📂 types/                    # TypeScript type definitions
│       ├── auth.ts                  # Authentication types
│       └── inventory.ts             # Inventory item types
├── 📂 backend/                      # Backend source code
│   ├── 📂 src/                      # Server source files
│   │   ├── auth.ts                  # Authentication services
│   │   ├── middleware.ts            # Express middleware
│   │   ├── server.ts                # Main server file
│   │   └── types/                   # Backend type definitions
│   ├── 📂 data/                     # Data storage
│   │   └── inventory.json           # JSON database
│   ├── package.json                 # Backend dependencies
│   └── tsconfig.json                # Backend TypeScript config
├── 📂 public/                       # Static assets
├── package.json                     # Frontend dependencies and scripts
├── tailwind.config.js               # TailwindCSS configuration
├── tsconfig.json                    # Frontend TypeScript config
└── README.md                        # Project documentation
```

## 🔧 Available Scripts

### Frontend Scripts
```bash
npm run dev              # Start Next.js development server (port 3000)
npm run build           # Build production-ready application
npm run start           # Start production server
npm run lint            # Run ESLint for code quality
```

### Backend Scripts
```bash
npm run start:backend   # Start Express.js development server (port 5000)
npm run build:backend   # Build backend TypeScript to JavaScript
npm run install:backend # Install backend dependencies
```

### Combined Scripts
```bash
npm run dev:all         # Start both frontend and backend servers
npm run install:all     # Install all dependencies (frontend + backend)
```

## 🔌 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/verify` | Verify JWT token | ✅ |

### Inventory Endpoints
| Method | Endpoint | Description | Auth Required | Permissions |
|--------|----------|-------------|---------------|-------------|
| GET | `/api/inventory` | Get all items | ✅ | All roles |
| POST | `/api/inventory` | Create new item | ✅ | Admin, Manager |
| PUT | `/api/inventory/:id` | Update item | ✅ | Admin, Manager |
| DELETE | `/api/inventory/:id` | Delete item | ✅ | Admin only |
| GET | `/api/inventory/:id/suggest-reorder` | AI reorder suggestion | ✅ | All roles |
| GET | `/api/summary/low-stock` | AI low-stock summary | ✅ | All roles |

### Health Check
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Server health status | ❌ |

## 🔐 Authentication & Security

### Security Features
- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **CORS Protection**: Configured cross-origin resource sharing
- **Role-based Authorization**: Granular permission control
- **Request Validation**: Input sanitization and validation

### User Roles & Permissions

| Permission | Admin | Manager | Viewer |
|------------|-------|---------|--------|
| View Dashboard | ✅ | ✅ | ✅ |
| View All Items | ✅ | ✅ | ✅ |
| Search & Filter | ✅ | ✅ | ✅ |
| Create Items | ✅ | ✅ | ❌ |
| Edit Items | ✅ | ✅ | ❌ |
| Delete Items | ✅ | ❌ | ❌ |
| AI Suggestions | ✅ | ✅ | ✅ |
| View Statistics | ✅ | ✅ | ✅ |

## 🤖 AI Features

### Mock AI Capabilities
- **Reorder Suggestions**: Intelligent quantity recommendations based on current stock and usage patterns
- **Low Stock Analysis**: Comprehensive summaries of items requiring attention
- **Category Insights**: Analytics and recommendations by product categories
- **Usage Predictions**: Mock predictive analytics for inventory planning

*Note: AI features use mock data and algorithms. Can be easily integrated with real AI services like OpenAI API.*

## 🚀 Deployment

### Live Deployment on Render

The application is deployed on Render.com with the following configuration:

**Frontend**: [https://inventory-frontend-e2js.onrender.com/](https://inventory-frontend-e2js.onrender.com/)
**Backend**: Automatically deployed and connected

### Deploy Your Own Instance

1. **Fork this repository**
2. **Create Render account** at [render.com](https://render.com)
3. **Connect your GitHub repository**
4. **Deploy backend service**:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Deploy frontend service**:
   - Root Directory: `.` (root)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. **Configure environment variables** as shown in setup section

### Environment Variables for Production

**Frontend**:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

**Backend**:
```env
NODE_ENV=production
JWT_SECRET=your_production_jwt_secret_here
FRONTEND_URL=https://your-frontend-url.onrender.com
```

## 🧪 Testing the Application

### Manual Testing Checklist

**Authentication:**
- [ ] Login with all three demo accounts
- [ ] Verify role-based UI changes
- [ ] Test logout functionality
- [ ] Check token persistence

**Inventory Management:**
- [ ] Create new inventory items
- [ ] Edit existing items
- [ ] Delete items (Admin only)
- [ ] Verify automatic status updates

**Search & Filtering:**
- [ ] Search by item name
- [ ] Filter by category
- [ ] Filter by status
- [ ] Clear all filters

**AI Features:**
- [ ] Generate reorder suggestions
- [ ] View low-stock summary
- [ ] Check dashboard insights

**Responsive Design:**
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on desktop screens

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to backend"**
- Ensure backend server is running on port 5000
- Check CORS configuration
- Verify API URL in environment variables

**"Login not working"**
- Check JWT secret configuration
- Verify user credentials
- Check browser console for errors

**"Data not persisting"**
- Ensure backend has write permissions
- Check JSON file creation in `backend/data/`
- Verify server restart doesn't lose data

**"Application loading slowly"**
- This is normal on first visit (Render free tier cold start)
- Subsequent requests will be faster
- Consider upgrading to paid Render plan for production

### Development Issues

**TypeScript Errors:**
```bash
npm run lint          # Check for linting errors
npm run build         # Verify TypeScript compilation
```

**Dependency Issues:**
```bash
rm -rf node_modules package-lock.json
npm install           # Reinstall dependencies
```

**Port Conflicts:**
```bash
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
lsof -ti:5000 | xargs kill -9  # Kill process on port 5000
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Use TypeScript for all new code
- Follow existing code style and patterns
- Add proper error handling
- Update documentation for new features
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For excellent developer tools and documentation
- **TailwindCSS** - For the utility-first CSS framework
- **Express.js** - For the robust Node.js web framework
- **Render** - For free hosting and deployment platform

## 📞 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed description
4. **Include environment details** and error messages

---

**Built with ❤️ using modern web technologies**

**Live Demo**: [https://inventory-frontend-e2js.onrender.com/](https://inventory-frontend-e2js.onrender.com/)

*Made by developers, for developers* 🚀

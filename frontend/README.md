# 🍬 Sweet Shop

A modern, full-featured e-commerce application for a sweet shop built with React. This application provides a complete shopping experience with user authentication, product management, inventory tracking, and an admin dashboard.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Authentication](#authentication)
- [Admin Features](#admin-features)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features
- 🔐 User registration and authentication
- 🛒 Browse and search sweets by name, category, and price
- 📦 Purchase sweets with quantity selection
- 📱 Fully responsive design for mobile and desktop

### Admin Features
- 📊 Admin dashboard with inventory overview
- ➕ Add, edit, and delete products
- 📈 Restock inventory
- ⚠️ Low stock alerts
- 📋 Product management table

### General Features
- 🎨 Modern, clean UI with Tailwind CSS
- 🔔 Toast notifications for user feedback
- 🔒 Protected routes for authenticated users
- 🎯 Role-based access control (User/Admin)

## 🛠 Tech Stack

- **Frontend Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Build Tool:** Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Loading.jsx
│   │   ├── Modal.jsx
│   │   └── Select.jsx
│   ├── layout/
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   └── sweets/
│       ├── PurchaseModal.jsx
│       ├── RestockModal.jsx
│       ├── SearchFilter.jsx
│       ├── SweetCard.jsx
│       ├── SweetForm.jsx
│       ├── SweetList.jsx
│       └── SweetModal.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useSweets.js
├── pages/
│   ├── AdminPage.jsx
│   ├── DashboardPage.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── services/
│   └── api.js
├── utils/
│   └── constants.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running (see API Endpoints section)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnupamNeon/SweetShop.git
   cd SweetShop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API URL.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔌 API Endpoints

The application expects the following API endpoints:

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Sweets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sweets` | Get all sweets (paginated) |
| GET | `/api/sweets/:id` | Get sweet by ID |
| GET | `/api/sweets/search` | Search sweets |
| POST | `/api/sweets` | Create new sweet (Admin) |
| PUT | `/api/sweets/:id` | Update sweet (Admin) |
| DELETE | `/api/sweets/:id` | Delete sweet (Admin) |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sweets/:id/purchase` | Purchase sweet |
| POST | `/api/sweets/:id/restock` | Restock sweet (Admin) |
| GET | `/api/inventory/low-stock` | Get low stock items |

## 🧩 Components

### Common Components

| Component | Description |
|-----------|-------------|
| `Button` | Reusable button with variants (primary, secondary, danger, ghost) |
| `Input` | Form input with label and error handling |
| `Select` | Dropdown select component |
| `Modal` | Reusable modal dialog |
| `Loading` | Loading spinner with optional fullscreen mode |

### Sweet Components

| Component | Description |
|-----------|-------------|
| `SweetCard` | Product card displaying sweet details |
| `SweetList` | Grid of sweet cards |
| `SweetForm` | Form for creating/editing sweets |
| `SweetModal` | Modal wrapper for sweet form |
| `PurchaseModal` | Modal for purchasing sweets |
| `RestockModal` | Modal for restocking inventory |
| `SearchFilter` | Search and filter controls |

## 🔐 Authentication

The app uses JWT-based authentication:

1. **Token Storage:** JWT tokens are stored in `localStorage`
2. **Auto-logout:** Users are automatically logged out on 401 responses
3. **Protected Routes:** `ProtectedRoute` component guards authenticated pages
4. **Role-based Access:** `adminOnly` prop restricts routes to admin users

### User Roles

| Role | Permissions |
|------|-------------|
| `user` | Browse, search, purchase sweets |
| `admin` | All user permissions + CRUD operations, restock |

## 👨‍💼 Admin Features

### Dashboard Overview
- Total products count
- Low stock items count
- Out of stock items count

### Product Management
- Add new sweets with name, category, price, quantity, and description
- Edit existing products
- Delete products
- View all products in a table format

### Inventory Management
- Restock products with custom quantities
- Low stock alerts (threshold: 10 items)
- Quick restock from alert panel

## 🎨 Categories

The app supports the following sweet categories:

| Category | Display |
|----------|---------|
| `mithai` | 🍬 Mithai |
| `milk-sweets` | 🥛 Milk Sweets |
| `laddoo` | 🟡 Laddoo |
| `halwa` | 🍮 Halwa |
| `barfi` | 🔷 Barfi |
| `chocolate` | 🍫 Chocolate |
| `bakery` | 🥐 Bakery |
| `namkeen` | 🥨 Namkeen |
| `ice-cream` | 🍦 Ice Cream |
| `dry-fruit` | 🥜 Dry Fruit |
| `other` | 🍭 Other |

--- 

<div align="center">

**Made with ❤️ by [Anupam Kumar](https://github.com/AnupamNeon)**

⭐ Star this repository if you found it helpful!

</div>
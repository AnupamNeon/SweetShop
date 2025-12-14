# 🍬 Sweet Shop - Full Stack E-Commerce Application

A modern, full-featured e-commerce application for a sweet shop built with React (Frontend) and Node.js/Express (Backend). This application provides a complete shopping experience with user authentication, product management, inventory tracking, and an admin dashboard.

---

## 🌐 Live Demo

- **Frontend:** [https://sweet-shop.vercel.app](https://sweet-shop.vercel.app)
- **Backend API:** [https://sweet-shop-api.onrender.com](https://sweet-shop-api.onrender.com)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Endpoints](#-api-endpoints)
- [Components](#-components)
- [Authentication](#-authentication)
- [Admin Features](#-admin-features)
- [Testing](#-testing)
- [My AI Usage](#-my-ai-usage)
- [Contributing](#-contributing)
- [License](#-license)

---

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

### Backend Features
- 🔒 JWT-based authentication
- 🛡️ Role-based access control (User and Admin)
- 🔑 Secure password hashing with bcrypt
- 📝 Input validation using express-validator
- 🚨 Comprehensive error handling and logging
- 🌐 CORS support
- ❤️ Health check endpoint

### General Features
- 🎨 Modern, clean UI with Tailwind CSS
- 🔔 Toast notifications for user feedback
- 🔒 Protected routes for authenticated users
- 🎯 Role-based access control (User/Admin)

---

## Screenshots
### Home Page
![Home Page](./screenshots/HomePage.png)
*Home Page telling about company*

### User Authentication
| Login | Register |
|-------|----------|
| ![Login](./screenshots/login.png) | ![Register](./screenshots/register.png) |

### User Dashboard
![Dashboard](./screenshots/Sweets-page.png)
*User view with product cards and purchase options*
*Browse all available sweets with search and filter functionality*

### Purchase Modal
![Purchase Modal](./screenshots/purchase-sweets.png)
*Select quantity and complete purchase*

### Admin Dashboard
![Admin Dashboard](./screenshots/Dashboard-1.png)
*Admin overview with inventory statistics and low stock alerts*

### Product Management
![Product Management](./screenshots/product-management.png)
*Add, edit, and delete products from the admin panel*

### Add/Edit Product Form
![Product Form](./screenshots/add-Sweet.png)
*Form for creating and updating sweet products*

### Restock Modal
![Restock Modal](./screenshots/Restock-sweets.png)
*Admin can restock inventory*

### Search Functionality
![Search sweets](./screenshots/search-functionality.png)
*Search the sweets by name*

### Purchase Sweets  
![Purchase sweets](./screenshots/purchase-sweets.png)
*Purchase the sweets by adjusting quantity*

### Mobile Responsive View
![Mobile View](./screenshots/mobile-view.png)
*Fully responsive design for mobile devices*

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React  | Frontend Framework |
| React Router  | Client-side Routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Axios | HTTP Client |
| React Hot Toast | Notifications |
| Vite | Build Tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM (Object Data Modeling) |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| express-validator | Input Validation |
| Jest & Supertest | Testing |
| mongodb-memory-server | Test Database |

---

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Select.jsx
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   └── sweets/
│   │       ├── PurchaseModal.jsx
│   │       ├── RestockModal.jsx
│   │       ├── SearchFilter.jsx
│   │       ├── SweetCard.jsx
│   │       ├── SweetForm.jsx
│   │       ├── SweetList.jsx
│   │       └── SweetModal.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useSweets.js
│   ├── pages/
│   │   ├── AdminPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   ├── sweetController.js     # Product operations
│   │   └── inventoryController.js # Inventory operations
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT and role checks
│   │   └── errorMiddleware.js     # Error handling
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Sweet.js               # Product schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── sweetRoutes.js
│   │   └── inventoryRoutes.js
│   ├── validators/
│   │   └── validators.js          # Validation rules
│   ├── app.js                     # Express app setup
│   └── server.js                  # Entry point
├── tests/
│   ├── setup.js
│   ├── auth.test.js
│   ├── sweets.test.js
│   └── inventory.test.js
├── .env
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Backend Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnupamNeon/sweet-shop.git
   cd sweet-shop/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB URI and JWT secret.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Verify the API**
   ```bash
   curl http://localhost:3000/api/health
   ```

### Frontend Installation

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
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

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
```

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3000 |
| `NODE_ENV` | Environment (development/production/test) | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret for JWT signing | Yes | - |
| `JWT_EXPIRE` | JWT expiration time | No | 7d |

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

---

## 📜 Available Scripts

### Backend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm start` | Start production server |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |

### Frontend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔌 API Endpoints

All routes are prefixed with `/api`.

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Sweets (Products)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/sweets` | Get all sweets (paginated) | No |
| GET | `/api/sweets/:id` | Get sweet by ID | No |
| GET | `/api/sweets/search` | Search sweets | No |
| POST | `/api/sweets` | Create new sweet | Admin |
| PUT | `/api/sweets/:id` | Update sweet | Admin |
| DELETE | `/api/sweets/:id` | Delete sweet | Admin |

### Inventory
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/sweets/:id/purchase` | Purchase sweet | Yes |
| POST | `/api/sweets/:id/restock` | Restock sweet | Admin |
| GET | `/api/inventory/low-stock` | Get low stock items | Admin |

### Protected Routes Header
```
Authorization: Bearer <your_jwt_token>
```

---

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

---

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

---

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

---

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

## 🧪 Testing

Run the test suite:
```bash
cd backend
npm test
```

Tests cover:
- ✅ Authentication (register, login, protected routes)
- ✅ Product CRUD operations
- ✅ Inventory management (purchase, restock)
- ✅ Role-based access control

Tests use Jest, Supertest, and an in-memory MongoDB server for isolation.

---

## 🤖 My AI Usage

### AI Tools Used

Throughout the development of this Sweet Shop application, I utilized the following AI tools:

| AI Tool | Primary Use Case |
|---------|------------------|
| **ChatGPT (GPT-5.2)** | Architecture planning, project-structure, code review, debugging |
| **Claude (Anthropic)** | Documentation writing, code explanation, boilerplate generation |

---

### How I Used Each Tool

#### 1. ChatGPT (GPT-5.2)

**API Endpoint Structure Design:**
> "I used ChatGPT to brainstorm and design the RESTful API endpoint structure for the sweet shop. I provided the requirements (authentication, product management, inventory) and asked for suggestions on organizing routes, choosing HTTP methods, and structuring response formats according to the industry standards".

**Example Prompt:**
```
"I'm building a sweet shop API. I need endpoints for user authentication, 
product CRUD operations, and inventory management. Can you suggest a 
RESTful API structure with proper HTTP methods and route naming conventions?"
```

**Database Schema Design:**
> "I consulted ChatGPT to design the MongoDB schemas for User and Sweet models. It helped me decide on field types, validation rules, and relationships between collections."

**Error Handling Patterns:**
> "I asked ChatGPT to review my error handling middleware and suggest improvements for consistent error responses across the API."

---

#### 2. Claude (Anthropic)

**Boilerplate Code Generation:**
> "I used Claude extensively for generating repetitive boilerplate code, especially for React components and Express route handlers. It significantly sped up the creation of similar components like modal dialogs and form inputs."

**Unit Test Generation:**
> "I asked Claude to generate unit tests for my service layer. After writing the first test case manually, Copilot suggested subsequent test cases following the same pattern."

**Specific Examples:**
- Generated the basic structure for all CRUD controller functions
- Auto-completed Mongoose query methods
- Suggested Tailwind CSS classes for responsive design
- Helped write validation schemas for express-validator

**Documentation Writing:**
> "I used Claude to help structure and write comprehensive documentation, including this README file. I provided the project details and asked for suggestions on organizing the documentation sections."

**Code Explanation:**
> "When implementing complex features like JWT authentication middleware and role-based access control, I used Claude to explain the security implications and best practices."

---

### Detailed Usage Breakdown

| Task | AI Tool | How It Helped |
|------|---------|---------------|
| Initial project planning | ChatGPT | Suggested folder structure and architecture patterns |
| MongoDB schema design | ChatGPT | Recommended field types and indexing strategies |
| Express middleware setup | ChatGPT | Auto-completed middleware boilerplate |
| React component creation | Claude | Generated component structure and props |
| Tailwind styling | Claude | Suggested responsive utility classes |
| JWT implementation | ChatGPT | Explained token handling best practices |
| Test case writing | ChatGPT | Generated test templates after initial examples |
| API documentation | Claude | Structured endpoint documentation |
| Error handling | ChatGPT | Suggested centralized error handling approach |
| README creation | Claude | Organized and formatted project documentation |

---

### Reflection on AI Impact

#### Positive Impacts on My Workflow

1. **⏱️ Increased Development Speed**
   > AI tools significantly accelerated my development process, especially for boilerplate code. Tasks that would typically take 30 minutes (like setting up a new controller with CRUD operations) were completed in under 5 minutes with Claude's assistance.

2. **📚 Learning Enhancement**
   > ChatGPT served as an on-demand tutor. When I encountered unfamiliar concepts (like implementing refresh tokens or setting up Jest with MongoDB), I received detailed explanations that helped me understand the "why" behind the code, not just the "how."

3. **🐛 Debugging Assistance**
   > AI tools helped identify bugs faster. By describing error messages and unexpected behavior, I received targeted suggestions that often pointed me to the exact issue, reducing debugging time by approximately 40%.

4. **📝 Documentation Quality**
   > Claude helped me create more comprehensive and well-structured documentation than I would have written alone. This will benefit future maintainers of the codebase.

5. **🎨 Design Pattern Suggestions**
   > ChatGPT introduced me to design patterns I wasn't aware of, such as the repository pattern for database operations and custom hooks for state management in React.

#### Challenges and Limitations

1. **🔍 Code Review Still Essential**
   > AI-generated code sometimes contained subtle bugs or didn't follow project conventions. I learned to always review and test AI suggestions rather than blindly accepting them.

2. **📖 Context Limitations**
   > AI tools occasionally lost context in long conversations, requiring me to re-explain project requirements. Breaking complex problems into smaller, focused queries proved more effective.

3. **🔄 Outdated Suggestions**
   > Some suggestions referenced deprecated libraries or older syntax patterns. Cross-referencing with official documentation remained essential.

4. **⚠️ Over-reliance Risk**
   > I noticed myself occasionally relying too heavily on AI for simple tasks I could solve independently. I had to consciously balance AI assistance with personal problem-solving.

#### Key Learnings

1. **AI as a Tool, Not a Replacement**
   > AI tools are most effective when used to augment human capabilities, not replace critical thinking. Understanding the fundamentals remains crucial.

2. **Prompt Engineering Matters**
   > The quality of AI assistance directly correlated with the clarity of my prompts. Specific, well-structured questions yielded better results than vague requests.

3. **Verification is Non-Negotiable**
   > Every piece of AI-generated code went through manual review and testing. This practice caught several potential security vulnerabilities and logic errors.

4. **Continuous Learning**
   > Using AI tools exposed me to new techniques and best practices I might not have discovered otherwise, contributing to my growth as a developer.

#### Quantitative Impact

| Metric | Estimated Improvement |
|--------|----------------------|
| Development Time | ~35% faster |
| Debugging Time | ~40% reduction |
| Documentation Quality | Significantly improved |
| Test Coverage | ~25% more comprehensive |
| Code Consistency | More uniform patterns |

---

### Ethical Considerations

- ✅ All AI-generated code was reviewed, understood, and modified as needed
- ✅ No AI-generated content was submitted without proper understanding
- ✅ AI tools were used as learning aids and productivity enhancers
- ✅ Original thought and problem-solving remained central to the development process

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines
- Follow existing code style and conventions
- Write tests for new features
- Update documentation as needed

---

## 📞 Contact

**Anupam Kumar**
- GitHub: [@AnupamNeon](https://github.com/AnupamNeon)

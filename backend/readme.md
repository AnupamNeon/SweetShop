# 🍬 Sweet Shop API

A robust **RESTful API** backend for a sweet shop e-commerce application. Built with Node.js, Express, and MongoDB, it handles user authentication, product management, and inventory control.

## Features

### Authentication & Authorization
- JWT-based authentication
- User registration and login
- Role-based access control (User and Admin)
- Secure password hashing with bcrypt

### Product Management
- Full CRUD operations for sweets/products
- Advanced search, filtering, and pagination
- Category organization

### Inventory Management
- Purchase endpoint with stock validation
- Admin-only restock functionality
- Low stock monitoring and alerts
- Real-time inventory tracking

### Additional API Features
- Input validation using express-validator
- Comprehensive error handling and logging
- CORS support
- Health check endpoint

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Testing**: Jest and Supertest
- **Test Database**: mongodb-memory-server

## Project Structure

```
src/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Auth logic
│   ├── sweetController.js     # Product operations
│   └── inventoryController.js # Inventory operations
├── middleware/
│   ├── authMiddleware.js      # JWT and role checks
│   └── errorMiddleware.js     # Error handling
├── models/
│   ├── User.js                # User schema
│   └── Sweet.js               # Product schema
├── routes/
│   ├── authRoutes.js
│   ├── sweetRoutes.js
│   └── inventoryRoutes.js
├── validators/
│   └── validators.js          # Validation rules
├── app.js                     # Express app setup
└── server.js                  # Entry point

tests/
├── setup.js
├── auth.test.js
├── sweets.test.js
└── inventory.test.js
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AnupamNeon/SweetShop.git
   cd sweet-shop-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
   Update the variables in `.env` (see section below).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Verify the API:
   ```bash
   curl http://localhost:3000/api/health
   ```

## Environment Variables

| Variable       | Description                          | Required | Default    |
|----------------|--------------------------------------|----------|------------|
| `PORT`         | Server port                          | No       | 3000      |
| `NODE_ENV`     | Environment (development/production/test) | No   | development |
| `MONGODB_URI`  | MongoDB connection string            | Yes      | -         |
| `JWT_SECRET`   | Secret for JWT signing               | Yes      | -         |
| `JWT_EXPIRE`   | JWT expiration time                  | No       | 7d        |

## API Endpoints

All routes are prefixed with `/api`.

### Health Check
- **GET** `/health` — Check API status

### Authentication
- **POST** `/auth/register` — Register a new user
- **POST** `/auth/login` — Login and receive JWT
- **GET** `/auth/me` — Get current user (requires auth)
- **POST** `/auth/logout` — Logout (client-side token invalidation)

### Sweets (Products)
- **GET** `/sweets` — List sweets (supports pagination, search, filters)
- **GET** `/sweets/:id` — Get single sweet
- **GET** `/sweets/search` — Advanced search
- **POST** `/sweets` — Create sweet (Admin only)
- **PUT** `/sweets/:id` — Update sweet (Admin only)
- **DELETE** `/sweets/:id` — Delete sweet (Admin only)

### Inventory
- **POST** `/sweets/:id/purchase` — Purchase sweet (validates stock)
- **POST** `/sweets/:id/restock` — Restock sweet (Admin only)
- **GET** `/inventory/low-stock` — List low-stock items (Admin only)

### Protected Routes
Use the following header for authenticated requests:
```
Authorization: Bearer <your_jwt_token>
```

## Testing
Run tests with:
```bash
npm test
```

Tests cover authentication, product operations, and inventory management using Jest, Supertest, and an in-memory MongoDB server.

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

---

<div align="center">

**Made with ❤️ by [Anupam Kumar](https://github.com/AnupamNeon)**

⭐ Star this repository if you found it helpful!

</div>
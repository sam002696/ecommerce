# 🛒 E-Commerce Platform

A full-stack, role-based e-commerce application built with **ReactJS**, **Redux Toolkit**, **Redux-Saga**, and **Laravel** (PHP) using **MySQL**. This platform is designed to be **modular, scalable, and maintainable**, enabling both **Customers** and **Admins** to interact with the system via completely separate and secure flows.

---

## Live URLs

- **Frontend**: [http://your-frontend-domain.com](http://your-frontend-domain.com)
- **Backend API**: [http://your-backend-api.com](http://your-backend-api.com)

---

## 🎯 Objective

This application allows:

- **Admins** to manage products, categories, brands, and orders with real-time notifications.
- **Customers** to browse products, place orders, and track order progress.
- Role-based access and redirection upon login.
- Optimized UX with responsive UI, drag-and-drop features, and optimistic UI updates.

---

## 👥 User Roles & Flow

### 👤 Customer

1. **Register/Login**
2. **Browse Products** with categories, sizes, and brands.
3. **Place Orders** and track them using a progress bar.
4. **View Order History** and order summaries.
5. **Get Notifications** (via UI Toasts).

### 🛠 Admin

1. **Login**
2. **Dashboard Access** to manage:
   - Products
   - Product Images, Categories, Sizes, Brands
   - Orders
3. **View and Fulfill Orders**
4. **Receive Notifications** via:
   - Email (Laravel Mail)
   - Real-time (WebSockets)

---

## 🧱 Tech Stack

### Frontend

- **ReactJS** with **Vite**
- **Redux Toolkit** for state management
- **Redux-Saga** for handling async side effects
- **React Router** for client-side routing
- **React Toastify** for global alerts via Redux
- **Tailwind CSS** for modular styling
- **Optimistic UI Updates** for smoother UX

### Backend

- **Laravel (PHP 8+)**
- **MySQL** (RDS Compatible)
- **Laravel Sanctum** for token-based auth
- **Event-Driven Architecture** with:
  - Laravel Events & Listeners
  - Laravel Mail
  - Notifications (Email + Real-time)
- **Service Layer Architecture** for clean logic separation
- **Static API Response Helper** for consistent API output
- **MVC Pattern**, RESTful APIs

---

## 🔑 Authentication

- **Laravel Sanctum** used for secure token generation and management.
- Auth tokens stored securely on the client.
- Role is evaluated after login, and user is redirected:
  - Customer → `/customer/home`
  - Admin → `/admin/dashboard`

---

## 🧩 Key Features

### 🛍 Product & Order Management

- CRUD for products (Admin)
- Manage categories, sizes, brands, and images
- Browse & filter products (Customer)
- Place orders and view real-time status (Customer)
- Order management dashboard (Admin)

### 📦 Optimistic UI Updates

- Task-level updates applied instantly before API confirmation
- Improves UX in cart interactions, order placements, and admin dashboards

### 🔔 Notification System

- **Admin**:
  - Email notifications (Laravel Mail)
  - In-app notifications via WebSocket (e.g., Pusher)
- **Customer**:
  - UI toasts for order events

---

## 🧪 Testing

- **Laravel Feature Tests** for:
  - Auth
  - CRUD
  - Notifications
  - Role-based access
- **API Response Validation** for structure and integrity

---

## 🐳 Docker Support (Optional)

- Dockerized Laravel setup
- Docker Compose file included
- Configured to work with Nginx & MySQL services

---

## 🚀 Deployment

- **Frontend** hosted on **AWS EC2** + **Nginx**
- **Backend API** hosted on **AWS EC2**
- **Database** hosted on **AWS RDS**
- **.env** used to manage sensitive credentials and environment config

---

## 📘 API Endpoints

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | /api/login         | User login                       |
| POST   | /api/register      | User registration                |
| GET    | /api/products      | Fetch products                   |
| POST   | /api/orders        | Create a new order               |
| GET    | /api/orders        | Get orders (role-based)          |
| PUT    | /api/orders/{id}   | Update order status (Admin only) |
| GET    | /api/categories    | List product categories          |
| POST   | /api/products      | Add product (Admin only)         |
| PUT    | /api/products/{id} | Edit product (Admin only)        |
| DELETE | /api/products/{id} | Delete product (Admin only)      |

---

## 💻 Local Installation Guidelines

### Prerequisites

- Node.js (v18+)
- Composer
- PHP (v8.1+)
- MySQL or XAMPP
- Docker (optional)
- Git

---

### Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

### Backend Setup (ecommerce-backend)

```bash
cd ecommerce-backend
```

1. Install PHP dependencies

```bash
composer install
```

2. Create .env file

```bash
cp .env.example .env
```

Update your .env file with your local database and app configurations:

```bash
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=root
DB_PASSWORD=your_password
```

3. Generate application key

```bash
php artisan key:generate
```

4. Run migrations

```bash
php artisan migrate
```

5. Serve the backend

```bash
php artisan serve
```

The backend should now be running at: http://127.0.0.1:8000

Optional: Use Docker

```bash
docker-compose up -d
```

## Frontend Setup (task-manager-frontend)

```bash
cd ../task-manager-frontend
```

1. Install dependencies

```bash
npm install
```

2. Run the frontend

```bash
npm run dev
```

The frontend should now be running at: http://localhost:5173

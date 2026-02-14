# SliceIt -- Pizza Delivery System (MERN)    

SliceIt is a full-stack Pizza Delivery System built using the MERN stack
(MongoDB, Express.js, React.js, Node.js). The application enables users
to browse pizzas, place orders, and complete secure payments. It also
includes an admin dashboard for managing pizzas, users, inventory, and
orders.

This project demonstrates full-stack development, secure authentication,
payment integration, and role-based access control.

------------------------------------------------------------------------

## Features

### Authentication

-   Secure user registration and login
-   JWT-based authentication
-   Role-based access control (User / Admin)

### Pizza Management

-   Create, update, and delete pizzas (Admin)
-   Browse available pizzas (Users)
-   Customization options

### Cart & Orders

-   Add items to cart
-   Secure checkout process
-   Order placement and tracking
-   Order history for users

### Inventory Management

-   Ingredient quantity tracking
-   Automatic deduction on order placement
-   Inventory monitoring

### Payment Integration

-   Razorpay payment gateway integration
-   Secure payment verification

### Admin Dashboard

-   View and manage all orders
-   Update order status
-   Manage inventory and products
-   View registered users

### Email Notifications

-   Order confirmation emails
-   Account-related notifications using Nodemailer

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React.js (Vite)
-   Tailwind CSS
-   React Router
-   Redux Toolkit
-   Axios

### Backend

-   Node.js
-   Express.js
-   Mongoose
-   bcryptjs
-   express-async-handler
-   jsonwebtoken
-   dotenv

### Database

-   MongoDB (Atlas)

### Payment

-   Razorpay API (Test Mode)

------------------------------------------------------------------------

## Installation

### 1. Clone the Repository

git clone https://github.com/HarshadaBodkhe/SliceIt-MERN-App.git cd
SliceIt-MERN-App

### 2. Install Dependencies

Backend: cd server npm install

Frontend: cd client npm install

### 3. Configure Environment Variables

Create a `.env` file in the server directory:

NODE_ENV=development PORT=5000 MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret SENDER_EMAIL=your_email
SENDER_PASSWORD=your_email_app_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

Create a `.env` file in the client directory:

VITE_SERVER_URL=http://localhost:5000
VITE_CLIENT_URL=http://localhost:5173
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

Ensure `.env` files are included in `.gitignore`.

------------------------------------------------------------------------

## Running the Application

Run both server and client: npm run dev

Run server only: npm run server

Run client only: npm run client

Frontend URL: http://localhost:5173

Backend API: http://localhost:5000

------------------------------------------------------------------------

## Author

Harshada Bodkhe\
GitHub: https://github.com/HarshadaBodkhe


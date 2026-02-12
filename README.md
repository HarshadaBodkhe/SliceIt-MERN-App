Project Overview
SliceIt is a full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to browse pizzas, add items to cart, place orders, and make secure payments. The application also includes an admin panel for managing products and orders.
Features

---------------------------------------------------------------------------------------------------------------------------------------------------
User Features
• User Registration & Login (JWT Authentication)
• Browse Pizzas
• Add to Cart
• Secure Checkout
• Razorpay Payment Integration
• Order History
• Email Notifications
Admin Features
• Admin Login
• Add / Update / Delete Pizzas
• Manage Orders
• View All Users
• Dashboard Controls
Tech Stack
Frontend
• React.js
• Redux Toolkit
• Axios
• React Router
Backend
• Node.js
• Express.js
• MongoDB + Mongoose
• JWT Authentication
• Nodemailer (Email Service)
• Razorpay (Payments)

---------------------------------------------------------------------------------------------------------------------------------------------------

Installation & Setup
1. Clone the repository:
   git clone https://github.com/HarshadaBodkhe/SliceIt-MERN-App.git
2. Install backend dependencies:
   cd server
   npm install
3. Install frontend dependencies:
   cd client
   npm install
4. Run the application:
   Backend: npm run server
   Frontend: npm run dev

---------------------------------------------------------------------------------------------------------------------------------------------------

SliceIt-MERN-App/
│
├── client/              # React Frontend
├── server/              # Node.js Backend
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   └── utils/
│
└── README.md

---------------------------------------------------------------------------------------------------------------------------------------------------

Environment Variables (server/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
Author
Harshada Bodkhe
GitHub: https://github.com/HarshadaBodkhe

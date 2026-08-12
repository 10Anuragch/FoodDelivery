# Food Delivery Web App

A full-stack food delivery web application built with the **MERN stack**. I built this project to understand how a real-world food ordering application works from both the user's and administrator's side.

The application allows users to create an account, verify their email, browse food items, add items to their cart, place orders, and view their previous orders. It also includes an admin section for managing users and orders.

> This project is actively being improved. More features and production-ready improvements will be added over time.

---

## Features

### User Features

* User registration and login
* Email verification using OTP
* Password hashing using bcrypt
* JWT-based authentication
* Get user's current location during signup
* Browse food items by category
* Search food items
* Add food items to cart
* Update item quantity in cart
* Place food orders
* View previous orders
* Responsive user interface

### Authentication & Security

* JWT authentication
* Password hashing with bcrypt
* Email verification using OTP
* Request validation using `express-validator`
* Protected backend routes
* Role-based user identification (`user` / `admin`)

### Admin Features

The project also contains an admin section where administrators can:

* View all users
* Delete users
* View all orders
* Delete orders

Admin APIs are protected using admin middleware.

---

## Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap
* React Bootstrap
* Material UI
* Axios
* Context API
* Animate.css

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt.js
* Express Validator
* Nodemailer

### APIs / Services

* OpenCage Geocoding API for location-based address information
* Gmail SMTP through Nodemailer for sending OTP emails

---

## Project Structure

```text
FoodDelivery/
│
├── backend/
│   ├── Routes/
│   │   ├── Auth.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware/
│   │   ├── fetchdetails.js
│   │   └── isAdmin.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Orders.js
│   │
│   ├── db.js
│   ├── index.js
│   └── package.json
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   ├── Card.js
│   │   ├── Carousel.js
│   │   ├── ContextReducer.js
│   │   ├── Footer.js
│   │   ├── Modal.js
│   │   └── Navbar.js
│   │
│   ├── screens/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── VerifyOTP.js
│   │   ├── Cart.js
│   │   └── MyOrder.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md
```

---

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/10Anuragch/FoodDelivery.git
```

Move into the project directory:

```bash
cd FoodDelivery
```

---

## Frontend Setup

Install the frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will normally run at:

```text
http://localhost:3000
```

---

## Backend Setup

Open another terminal and move into the backend directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

The backend currently runs on:

```text
http://localhost:5000
```


---

## How the Application Works

The application follows a simple food-ordering flow:

```text
User
 │
 ├── Sign Up
 │      │
 │      └── Email OTP Verification
 │
 ├── Login
 │
 ├── Browse Food
 │      │
 │      ├── Search
 │      ├── Category
 │      └── Price Filter
 │
 ├── Add to Cart
 │
 ├── Place Order
 │
 └── View My Orders


Admin
 │
 ├── Login
 │
 ├── Manage Users
 │
 └── Manage Orders
```

---

## Authentication Flow

The authentication system uses JWT and bcrypt.

When a user signs up:

1. User provides their basic information.
2. Password is hashed using bcrypt.
3. An OTP is generated.
4. OTP is sent to the user's email.
5. User verifies the OTP.
6. The account becomes verified.
7. The user can then log in.

After successful login, the backend generates a JWT token which is used to authenticate protected requests.

---

##  Order Management

Users can add multiple food items to their cart and place an order.

Order information is stored in MongoDB and can later be accessed from the **My Orders** section.

Administrators can also view, update, and delete orders through the admin section.
---

## Why I Built This Project

This project started as a way to strengthen my understanding of the MERN stack, but I wanted to take it beyond a basic CRUD application.

While working on it, I got hands-on experience with:

* Building REST APIs
* Connecting React with an Express backend
* Working with MongoDB and Mongoose
* Implementing authentication and authorization
* Handling JWT tokens
* Hashing passwords
* Sending emails from a Node.js backend
* Managing application state with Context API
* Building protected admin functionality
* Working with third-party APIs
* Structuring a full-stack application

I am continuing to work on the project with the goal of making it closer to a real-world production application.

---

## Author

**Anurag Chauhan**

B.Tech — Information Technology

* GitHub: [10Anuragch](https://github.com/10Anuragch)
* LinkedIn: [Anurag Chauhan](https://www.linkedin.com/in/anurag-chauhan-635b76254/)

---

## 📄 License

This project is currently intended for learning and portfolio purposes.

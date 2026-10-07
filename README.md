# 🛒 ShopEase – E-commerce Store

ShopEase is a full-stack e-commerce web application built using React and Django REST Framework.

It includes product listing, product details, shopping cart, user authentication, Razorpay test payment, checkout, and order management.

## 🌐 Live Demo

**Frontend:**  
https://shopease-ecommerce-gules-kappa.vercel.app

**Backend API:**  
https://shopease-ecommerce-wl99.onrender.com/api/products/

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite
- Razorpay

### Deployment
- GitHub
- Vercel
- Render

## ✨ Features

- 🏠 Home page
- 📦 Product listing
- 🔍 Product details
- 🛒 Shopping cart
- 👤 User registration
- 🔐 User login
- 💳 Razorpay test payment
- 📋 Checkout
- 📦 My Orders
- 🛠️ Django Admin
- 🔄 REST API integration
- 🖼️ Product images
- 📱 Responsive UI

## 📁 Project Structure

```text
shopease-ecommerce/
│
├── backend/
│   └── core/
│       ├── core/
│       ├── store/
│       ├── manage.py
│       └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── products/
│   │       ├── wireless_headphones.png
│   │       ├── smart_watch.png
│   │       └── bluetooth_speaker.png
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vercel.json
│
├── .gitignore
└── README.md

🔗 API Endpoints
GET    /api/products/
GET    /api/products/<id>/
POST   /api/products/
POST   /api/register/
POST   /api/login/
POST   /api/orders/
GET    /api/my-orders/
POST   /api/payment/create-order/
POST   /api/payment/verify/

💳 Payment Integration

Razorpay has been integrated in Test Mode for learning and demonstration purposes.

No real money is charged during testing.

⚙️ Local Setup
1. Clone the Repository
git clone https://github.com/ajeetsaini0102/shopease-ecommerce.git
cd shopease-ecommerce
2. Backend Setup
cd backend/core

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

Backend:

http://127.0.0.1:8000
3. Frontend Setup

Open another terminal:

cd frontend

npm install

npm run dev
🔐 Environment Variables

Create a .env file inside the backend folder:

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

Do not upload .env or secret keys to GitHub.

🗄️ Database

The project uses SQLite with Django ORM for development and learning purposes.

🚀 Deployment
Frontend

Deployed on Vercel

Backend

Deployed on Render

Source Code

Hosted on GitHub

🎯 Project Purpose

This project was developed as a full-stack e-commerce learning project and internship task.

The main purpose of the project is to practice:

React.js
Django REST Framework
REST APIs
Authentication
Database operations
Shopping cart functionality
Order management
Payment gateway integration
Git and GitHub
Vercel deployment
Render deployment

👨‍💻 Author
Ajit Singh Saini

📌 Disclaimer

This project is created for educational and internship purposes.

Razorpay is configured in Test Mode and should not be used for real payments without proper production configuration.

#  Expense Tracker

This is a full-stack **Expense Tracker** application that allows users to track their income and expenses. It uses **MongoDB**, **Express**, **Node.js**, and optionally a **React frontend**.

---

#  Features

- Add income and expense transactions
- View current balance, income, and expenses
- Edit or delete transactions
- Stores data in **MongoDB**
- RESTful API (can be used with any frontend)

---

# Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- (Optional: React, Bootstrap)

---

# Installation

1. **Clone the repository**
```bash
git clone https://github.com/Anu13-26/Expense-Tracker.git
cd Expense-Tracker
```


# Install dependencies
npm install

# Set up environment variables
Create a .env file in the root folder and add:

```bash
# MongoDB Connection Credentials
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=your_database_name

# Optional: Mongo URI if you're not building from parts above
# MONGO_URI=mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.iwua9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0

# App Settings
PORT=5000  # Or any port you want to run the server on
```
In your code, you can use these to construct your MONGO_URI.

# Run the backend
```bash
node server.js
```

# Folder Structure
```bash
Expense_Tracker/
├── backend/
│   ├── node_modules/            
│   ├── server.js                
│   ├── package.json             
│   ├── package-lock.json       
│   ├── .env                                 
│
├── frontend/
│   ├── index.html               
│   ├── style.css                
│
└── README.md                    
```

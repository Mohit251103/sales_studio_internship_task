# 📌 Coupon Distribution In Round Robin Manner and Abuse Prevention
A live web application built using **React.js (Frontend) & Node.js/Express with MongoDB (Backend)** that distributes coupons to guest users in a round-robin manner, 
incorporating mechanisms to prevent users from exploiting page refreshes to claim multiple coupons within a restricted time frame.

## **🚀 Installation Guide**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Mohit251103/sales_studio_internship_task.git
cd sales_studio_internship_task
```

---

### **2️⃣ Backend Setup**
📌 **Navigate to the backend folder**  
```sh
cd backend
```

📌 **Install dependencies**  
```sh
npm install
```

📌 **Set up environment variables**  
Create a **.env** file in `backend/` based on `.env.sample` and configure:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
IPQS_API_KEY=IPQS api key for checking VPN or proxy
FRONTEND_URL=http://localhost:5173
```

📌 **Run the backend server**
```sh
npm run dev
```
Your **backend** will now run at `http://localhost:3000`.

---

### **3️⃣ Frontend Setup**
📌 **Navigate to the frontend folder**
```sh
cd ../frontend
```

📌 **Install dependencies**
```sh
npm install
```

📌 **Set up environment variables**
Create a **.env** file in `frontend/` based on `.env.sample` and configure:
```env
VITE_BACKEND_URL =http://localhost:3000
```

📌 **Run the frontend**
```sh
npm run dev
```
Your **frontend** will now be accessible at `http://localhost:5173`.

---

## **🛠️ API Routes**
📌 **Get Coupon Routes**
- `GET /api/v1/get-coupon`  
---
## 📜 License
This project is **open-source**. Feel free to modify it as needed.

---

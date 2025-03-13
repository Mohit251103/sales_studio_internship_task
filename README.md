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

## **🛡️ Abuse Prevention Strategies**
To prevent users from abusing the application by refreshing the website and getting more coupon within the limited time frame, following security measures have been implemented :

### **1️⃣ HTTP-only Cookies**
- Whenever user is generating the coupon then **HTTP-only cookies** is stored on the website for the provided cooldown period ( in our case it is 1 minute ), preventing abuse by refreshing the webpage.

### **2️⃣ IP Tracking**
- Along with storing the cookie we are storing the IP Address of the user's device ( assuming smartphone without public IP in this case ) in the database along with the time at which the coupon was generated.
- It is an additional measure put along with cookie so that in case cookies are deleted by the user, they can be tracked with the IP.

### **3️⃣ VPN Detection**
- IPs can be changed with the VPN so this measure is to prevent that.
- It's a simple middleware to check whether the user is using a VPN or not.
---

## 📜 License
This project is **open-source**. Feel free to modify it as needed.

---

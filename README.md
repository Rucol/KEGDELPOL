# KEGDELPOL Microservices Architecture

## 📌 Project Description

KEGDELPOL is a microservices-based application that facilitates order management and delivery tracking. The system includes three main user roles: employees, couriers, and clients, each with distinct functionalities.

## 🎯 System Roles

### **Employee**
- Manages orders and assigns them to couriers.
- Creates accounts for clients, couriers, and new employees.

### **Courier**
- Handles deliveries from point A to point B.
- Updates the delivery status in real-time.

### **Client**
- Places new orders and adds products to the system.

## 🏗 Architecture

The application follows a **microservices architecture**, with each service responsible for a specific function. The services communicate via REST APIs and are containerized using Docker.

## 🛠 Technologies Used

- **Backend:** Node.js, Python
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **Communication:** REST API

## 🚀 Running the Project

### **Prerequisites**
- Install [Docker](https://www.docker.com/)
- Install [Docker Compose](https://docs.docker.com/compose/)

### **Setup and Deployment**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rucol/KEGDELPOL.git
   cd KEGDELPOL
   ```
2. **Start the services using Docker Compose:**
   ```bash
   docker-compose up --build
   ```
3. The services will be accessible via:
   - Employee API: `http://localhost:5000`
   - Courier API: `http://localhost:5001`
   - Client API: `http://localhost:5002`

## 📜 Database Schema

The database follows a relational schema with key tables such as `Employee`, `Courier`, `Client`, and `Orders`. The full schema can be found in `db.txt`.

## 🏆 Future Enhancements
- Implement WebSocket for real-time delivery tracking.
- Add authentication and authorization mechanisms.
- Improve UI/UX for better usability.

## 📜 License
This project is released under the **MIT License**.

## 👨‍💻 Contributors
Developed by the KEGDELPOL Team.

---
If you have suggestions or would like to contribute, feel free to open an issue or submit a pull request! 😊


# MediMart Backend API

MediMart is an e-commerce platform for medicines with features like prescription verification, secure payments, and order tracking.

## Features

- User authentication with JWT
- Medicine listings with detailed information
- Prescription upload and verification
- Shopping cart and checkout
- Order management and tracking
- Admin dashboard for managing medicines, orders, and users
- Secure payment integration
- Email notifications for order updates and prescription verification

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript
- JWT for authentication
- Multer and Cloudinary for file uploads
- SSL Commerz for payment processing
- Resend for email notifications

## API Endpoints

### Authentication

- `POST http://localhost:5000/api/auth/register` - Register a new user
- - body {
    "name": "admin",
    "email": "admin@admin.admin",
    "password": "000000"
    }
- - res {
    "success": true,
    "message": "User registered successfully",
    "data": {
    "user": {
    "name": "customer",
    "email": "customer@medi.mert",
    "password": "$2b$10$WjyAc5d/J1OdMjCc7YQnX.1.YmK15pUtE44G1mGAITDbKFX/OiFHq",
    "role": "customer",
    "status": "active",
    "\_id": "67c7f8b1e756be7d84b80cd8",
    "createdAt": "2025-03-05T07:09:37.913Z",
    "updatedAt": "2025-03-05T07:09:37.913Z",
    "\_\_v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M3ZjhiMWU3NTZiZTdkODRiODBjZDgiLCJlbWFpbCI6ImN1c3RvbWVyQG1lZGkubWVydCIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0MTE1ODU3OCwiZXhwIjoxNzQxNzYzMzc4fQ.slBL44ha_Z9EO6ThZLtA8V5azk7dcjMtSZ-fIza5-TM"
    }
    }

- `POST http://localhost:5000/api/auth/login` - Login a user
- - body {
    "email": "admin@admin.admin",
    "password": "000000"
    }
- - res {
    "success": true,
    "message": "User logged in successfully",
    "data": {
    "user": {
    "\_id": "67c7f0a3f28d7bd175ae3d02",
    "name": "admin",
    "email": "admin@admin.admin",
    "password": "$2b$10$32LmEJfhJvbVkfRdtNyPkecJgMGO1TWf8suMtxnvrlStXrapN7Gna",
    "role": "admin",
    "status": "active",
    "createdAt": "2025-03-05T06:35:15.542Z",
    "updatedAt": "2025-03-05T07:00:06.849Z",
    "\_\_v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M3ZjBhM2YyOGQ3YmQxNzVhZTNkMDIiLCJlbWFpbCI6ImFkbWluQGFkbWluLmFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxMTU4NjIzLCJleHAiOjE3NDE3NjM0MjN9.wx8t49F2ynknq2hiG00ES9ypCE8yvsp8HHxji0hdORQ"
    }
    }
- `POST http://localhost:5000/api/auth/change-password` - Change user password (Bearer Token)
- - body {
    "currentPassword": "000000",
    "newPassword": "000000"
    }
- - res {
    "success": true,
    "message": "Password updated successfully"
    }
- `GET http://localhost:5000/api/auth/profile` - Get user profile (Bearer Token)
- - res {
    "success": true,
    "data": {
    "\_id": "67c7f0a3f28d7bd175ae3d02",
    "name": "admin",
    "email": "admin@admin.admin",
    "role": "admin",
    "status": "active",
    "createdAt": "2025-03-05T06:35:15.542Z",
    "updatedAt": "2025-03-05T07:11:12.264Z",
    "\_\_v": 0
    }
    }
- `PATCH http://localhost:5000/api/auth/profile` - Update user profile (Bearer Token)
- - body {  
     "name": "admin"
    }
- - res {
    "success": true,
    "message": "Profile updated successfully",
    "data": {
    "\_id": "67c7f0a3f28d7bd175ae3d02",
    "name": "admin",
    "email": "admin@admin.admin",
    "role": "admin",
    "status": "active",
    "createdAt": "2025-03-05T06:35:15.542Z",
    "updatedAt": "2025-03-05T07:12:08.782Z",
    "\_\_v": 0
    }
    }
- `PATCH http://localhost:5000/api/auth/profile` - Update update status (Admin only)
- - body {
    "targetUserId": "67c7f0a3f28d7bd175ae3d02",
    "status": "active"
    }
- - res {
    "success": true,
    "message": "Profile updated successfully",
    "data": {
    "\_id": "67c7f0a3f28d7bd175ae3d02",
    "name": "admin",
    "email": "admin@admin.admin",
    "role": "admin",
    "status": "active",
    "createdAt": "2025-03-05T06:35:15.542Z",
    "updatedAt": "2025-03-05T07:13:15.255Z",
    "\_\_v": 0
    }
    }

- `GET http://localhost:5000/api/auth//all-users` - Get all user (Bearer Token) (Admin only)
- - res {
    "success": true,
    "message": "Users retrieved successfully",
    "data": [
    {
    "_id": "67c7f0a3f28d7bd175ae3d02",
    "name": "admin",
    "email": "admin@admin.admin",
    "role": "admin",
    "status": "active",
    "createdAt": "2025-03-05T06:35:15.542Z",
    "updatedAt": "2025-03-05T07:13:15.255Z",
    "__v": 0
    },
    {
    "_id": "67c7f8b1e756be7d84b80cd8",
    "name": "customer",
    "email": "customer@medi.mert",
    "role": "customer",
    "status": "active",
    "createdAt": "2025-03-05T07:09:37.913Z",
    "updatedAt": "2025-03-05T07:09:37.913Z",
    "__v": 0
    }
    ]
    }

### Medicines

- `GET http://localhost:5000/api/medicines` - Get all medicines
- - res {
    "success": true,
    "message": "Medicines retrieved successfully",
    "data": [
    {
    "_id": "67c87e194b2520f8d0219650",
    "name": "Amoxicillin",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 50,
    "category": "Antibiotic",
    "imageURL": "",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "requiresPrescription": false,
    "expiryDate": "2025-08-15T00:00:00.000Z",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash",
    "createdAt": "2025-03-05T16:38:49.679Z",
    "updatedAt": "2025-03-05T16:38:49.679Z",
    "__v": 0
    },
    {
    "_id": "67c87de34b2520f8d021964d",
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma",
    "price": 5.99,
    "genericName": "Acetaminophen",
    "stock": 100,
    "category": "Pain Reliever",
    "imageURL": "",
    "description": "Used to treat mild to moderate pain and fever.",
    "requiresPrescription": false,
    "expiryDate": "2026-12-31T00:00:00.000Z",
    "dosage": "500mg per tablet",
    "sideEffects": "Nausea, dizziness, rash",
    "createdAt": "2025-03-05T16:37:55.936Z",
    "updatedAt": "2025-03-05T16:37:55.936Z",
    "__v": 0
    }
    ],
    "meta": {
    "page": 1,
    "limit": 10,
    "total": 2
    }
    }
- `GET http://localhost:5000/api/medicines/:id` - Get medicine by ID
- - res {
    "success": true,
    "data": {
    "\_id": "67c87e194b2520f8d0219650",
    "name": "Amoxicillin",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 50,
    "category": "Antibiotic",
    "imageURL": "",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "requiresPrescription": false,
    "expiryDate": "2025-08-15T00:00:00.000Z",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash",
    "createdAt": "2025-03-05T16:38:49.679Z",
    "updatedAt": "2025-03-05T16:38:49.679Z",
    "\_\_v": 0
    }
    }
- `POST http://localhost:5000/api/medicines` - Create a new medicine (Bearer Token) (Admin only)
- - body {
    "name": "Amoxicillin2",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 50,
    "category": "Antibiotic",
    "requiresPrescription": "Yes",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "expiryDate": "2025-08-15",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash"
    }
- - res {
    "success": true,
    "message": "Medicine created",
    "data": {
    "name": "Amoxicillin2",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 50,
    "category": "Antibiotic",
    "imageURL": "",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "requiresPrescription": false,
    "expiryDate": "2025-08-15T00:00:00.000Z",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash",
    "\_id": "67c87e734b2520f8d0219656",
    "createdAt": "2025-03-05T16:40:19.339Z",
    "updatedAt": "2025-03-05T16:40:19.339Z",
    "\_\_v": 0
    }
    }
- `PATCH http://localhost:5000/api/medicines/:id` - Update a medicine (Bearer Token) (Admin only)
- - body {
    "name": "Paracetamolaaa22"
    }
- - res {
    "success": true,
    "message": "Medicine updated successfully",
    "data": {
    "\_id": "67c87e734b2520f8d0219656",
    "name": "Paracetamolaaa22",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 50,
    "category": "Antibiotic",
    "imageURL": "",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "requiresPrescription": false,
    "expiryDate": "2025-08-15T00:00:00.000Z",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash",
    "createdAt": "2025-03-05T16:40:19.339Z",
    "updatedAt": "2025-03-05T16:47:27.819Z",
    "\_\_v": 0
    }
    }
- `DELETE http://localhost:5000/api/medicines/:id` - Delete a medicine (Bearer Token) (Admin only)
- - res {
    "success": true,
    "message": "Medicine deleted successfully"
    }
- `GET http://localhost:5000/api/medicines/categories` - Get all medicine categories
- - res {
    "success": true,
    "message": "Categories retrieved successfully",
    "data": [
    "Antibiotic",
    "Pain Reliever"
    ]
    }
- `GET http://localhost:5000/api/medicines/manufacturers` - Get all medicine manufacturers
- - res {
    "success": true,
    "message": "Manufacturers retrieved successfully",
    "data": [
    "ABC Pharma",
    "XYZ Pharmaceuticals"
    ]
    }

### Orders

- `POST http://localhost:5000/api/orders` - Create a new order
- - body {
    "items": [
    {
    "medicineId": "67c87de34b2520f8d021964d",
    "quantity": 2
    },
    {
    "medicineId": "67c87e194b2520f8d0219650",
    "quantity": 1
    }
    ],
    "shippingAddress": {
    "address": "123 Main Street",
    "city": "Dhaka",
    "postalCode": "1205",
    "country": "Bangladesh"
    }
    }
- - res {
    "success": true,
    "message": "Order created successfully",
    "data": {
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "items": [
    {
    "medicineId": "67c87de34b2520f8d021964d",
    "quantity": 2,
    "price": 5.99,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb7"
    },
    {
    "medicineId": "67c87e194b2520f8d0219650",
    "quantity": 1,
    "price": 12.5,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb8"
    }
    ],
    "totalPrice": 24.48,
    "status": "pending",
    "paymentStatus": "pending",
    "prescriptionStatus": "not_required",
    "shippingAddress": {
    "address": "123 Main Street",
    "city": "Dhaka",
    "postalCode": "1205",
    "country": "Bangladesh"
    },
    "\_id": "67c8856fba8310027934cfb6",
    "createdAt": "2025-03-05T17:10:07.195Z",
    "updatedAt": "2025-03-05T17:10:07.195Z",
    "\_\_v": 0
    }
    }
- `GET http://localhost:5000/api/orders/all-orders` - Get all orders (Bearer Token) (Admin only)
- - res {
    "success": true,
    "data": {
    "orders": [
    {
    "shippingAddress": {
    "address": "123 Main Street",
    "city": "Dhaka",
    "postalCode": "1205",
    "country": "Bangladesh"
    },
    "\_id": "67c8856fba8310027934cfb6",
    "userId": {
    "\_id": "67c7f0a3f28d7bd175ae3d02",
    "name": "admin",
    "email": "admin@admin.admin",
    "role": "admin",
    "status": "active",
    "createdAt": "2025-03-05T06:35:15.542Z",
    "updatedAt": "2025-03-05T07:13:15.255Z",
    "**v": 0
    },
    "items": [
    {
    "medicineId": {
    "\_id": "67c87de34b2520f8d021964d",
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma",
    "price": 5.99,
    "genericName": "Acetaminophen",
    "stock": 98,
    "category": "Pain Reliever",
    "imageURL": "",
    "description": "Used to treat mild to moderate pain and fever.",
    "requiresPrescription": false,
    "expiryDate": "2026-12-31T00:00:00.000Z",
    "dosage": "500mg per tablet",
    "sideEffects": "Nausea, dizziness, rash",
    "createdAt": "2025-03-05T16:37:55.936Z",
    "updatedAt": "2025-03-05T17:10:07.039Z",
    "**v": 0
    },
    "quantity": 2,
    "price": 5.99,
    "requiresPrescription": false,
    "\_id": "67c8856fba8310027934cfb7"
    },
    {
    "medicineId": {
    "\_id": "67c87e194b2520f8d0219650",
    "name": "Amoxicillin",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 49,
    "category": "Antibiotic",
    "imageURL": "",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "requiresPrescription": false,
    "expiryDate": "2025-08-15T00:00:00.000Z",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash",
    "createdAt": "2025-03-05T16:38:49.679Z",
    "updatedAt": "2025-03-05T17:10:07.135Z",
    "**v": 0
    },
    "quantity": 1,
    "price": 12.5,
    "requiresPrescription": false,
    "\_id": "67c8856fba8310027934cfb8"
    }
    ],
    "totalPrice": 24.48,
    "status": "pending",
    "paymentStatus": "pending",
    "prescriptionStatus": "not_required",
    "createdAt": "2025-03-05T17:10:07.195Z",
    "updatedAt": "2025-03-05T17:10:07.195Z",
    "**v": 0
    }
    ],
    "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
    }
    }
    }
- `GET http://localhost:5000/api/orders/:id` - Get order by ID (Bearer Token)
- - res {
    "success": true,
    "data": {
    "order": {
    "shippingAddress": {
    "address": "123 Main Street",
    "city": "Dhaka",
    "postalCode": "1205",
    "country": "Bangladesh"
    },
    "\_id": "67c8856fba8310027934cfb6",
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "items": [
    {
    "medicineId": {
    "_id": "67c87de34b2520f8d021964d",
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma",
    "price": 5.99,
    "genericName": "Acetaminophen",
    "stock": 98,
    "category": "Pain Reliever",
    "imageURL": "",
    "description": "Used to treat mild to moderate pain and fever.",
    "requiresPrescription": false,
    "expiryDate": "2026-12-31T00:00:00.000Z",
    "dosage": "500mg per tablet",
    "sideEffects": "Nausea, dizziness, rash",
    "createdAt": "2025-03-05T16:37:55.936Z",
    "updatedAt": "2025-03-05T17:10:07.039Z",
    "__v": 0
    },
    "quantity": 2,
    "price": 5.99,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb7"
    },
    {
    "medicineId": {
    "_id": "67c87e194b2520f8d0219650",
    "name": "Amoxicillin",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 49,
    "category": "Antibiotic",
    "imageURL": "",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "requiresPrescription": false,
    "expiryDate": "2025-08-15T00:00:00.000Z",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash",
    "createdAt": "2025-03-05T16:38:49.679Z",
    "updatedAt": "2025-03-05T17:10:07.135Z",
    "__v": 0
    },
    "quantity": 1,
    "price": 12.5,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb8"
    }
    ],
    "totalPrice": 24.48,
    "status": "pending",
    "paymentStatus": "pending",
    "prescriptionStatus": "not_required",
    "createdAt": "2025-03-05T17:10:07.195Z",
    "updatedAt": "2025-03-05T17:10:07.195Z",
    "\_\_v": 0
    },
    "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
    }
    }
    }
- `GET http://localhost:5000/api/orders/my-orders` - Get user's orders
- - res {
    "success": true,
    "data": [
    {
    "shippingAddress": {
    "address": "123 Main Street",
    "city": "Dhaka",
    "postalCode": "1205",
    "country": "Bangladesh"
    },
    "\_id": "67c8856fba8310027934cfb6",
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "items": [
    {
    "medicineId": {
    "_id": "67c87de34b2520f8d021964d",
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma",
    "price": 5.99,
    "genericName": "Acetaminophen",
    "stock": 98,
    "category": "Pain Reliever",
    "imageURL": "",
    "description": "Used to treat mild to moderate pain and fever.",
    "requiresPrescription": false,
    "expiryDate": "2026-12-31T00:00:00.000Z",
    "dosage": "500mg per tablet",
    "sideEffects": "Nausea, dizziness, rash",
    "createdAt": "2025-03-05T16:37:55.936Z",
    "updatedAt": "2025-03-05T17:10:07.039Z",
    "__v": 0
    },
    "quantity": 2,
    "price": 5.99,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb7"
    },
    {
    "medicineId": {
    "_id": "67c87e194b2520f8d0219650",
    "name": "Amoxicillin",
    "manufacturer": "XYZ Pharmaceuticals",
    "price": 12.5,
    "genericName": "Amoxicillin Trihydrate",
    "stock": 49,
    "category": "Antibiotic",
    "imageURL": "",
    "description": "Used to treat bacterial infections like pneumonia and bronchitis.",
    "requiresPrescription": false,
    "expiryDate": "2025-08-15T00:00:00.000Z",
    "dosage": "250mg per capsule",
    "sideEffects": "Diarrhea, nausea, skin rash",
    "createdAt": "2025-03-05T16:38:49.679Z",
    "updatedAt": "2025-03-05T17:10:07.135Z",
    "__v": 0
    },
    "quantity": 1,
    "price": 12.5,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb8"
    }
    ],
    "totalPrice": 24.48,
    "status": "pending",
    "paymentStatus": "pending",
    "prescriptionStatus": "not_required",
    "createdAt": "2025-03-05T17:10:07.195Z",
    "updatedAt": "2025-03-05T17:10:07.195Z",
    "\_\_v": 0
    }
    ]
    }
- `PATCH http://localhost:5000/api/orders/:id/status` - Update order status (Bearer Token) (Admin only)
- - body {
    "status": "delivered"
    }
- - res {
    "success": true,
    "message": "Order status updated successfully",
    "data": {
    "shippingAddress": {
    "address": "123 Main Street",
    "city": "Dhaka",
    "postalCode": "1205",
    "country": "Bangladesh"
    },
    "\_id": "67c8856fba8310027934cfb6",
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "items": [
    {
    "medicineId": "67c87de34b2520f8d021964d",
    "quantity": 2,
    "price": 5.99,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb7"
    },
    {
    "medicineId": "67c87e194b2520f8d0219650",
    "quantity": 1,
    "price": 12.5,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb8"
    }
    ],
    "totalPrice": 24.48,
    "status": "delivered",
    "paymentStatus": "pending",
    "prescriptionStatus": "not_required",
    "createdAt": "2025-03-05T17:10:07.195Z",
    "updatedAt": "2025-03-05T17:21:52.769Z",
    "\_\_v": 0
    }
    }
- `PATCH http://localhost:5000/api/orders/:id/cancel` - Cancel an order (Bearer Token)
- - res {
    "success": true,
    "message": "Order cancelled successfully",
    "data": {
    "shippingAddress": {
    "address": "123 Main Street",
    "city": "Dhaka",
    "postalCode": "1205",
    "country": "Bangladesh"
    },
    "\_id": "67c8856fba8310027934cfb6",
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "items": [
    {
    "medicineId": "67c87de34b2520f8d021964d",
    "quantity": 2,
    "price": 5.99,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb7"
    },
    {
    "medicineId": "67c87e194b2520f8d0219650",
    "quantity": 1,
    "price": 12.5,
    "requiresPrescription": false,
    "_id": "67c8856fba8310027934cfb8"
    }
    ],
    "totalPrice": 24.48,
    "status": "cancelled",
    "paymentStatus": "pending",
    "prescriptionStatus": "not_required",
    "createdAt": "2025-03-05T17:10:07.195Z",
    "updatedAt": "2025-03-05T17:17:59.760Z",
    "\_\_v": 0
    }
    }

### Prescriptions

- `POST http://localhost:5000/api/prescriptions/upload` - Upload a prescription (Bearer Token)
- - body
- - - json {
      "userId": "67c7f0a3f28d7bd175ae3d02",
      "orderId": "67c8856fba8310027934cfb6",
      "notes": "Waiting for approval."
      }
- - - formdata : "prescription" named image file
- - res {
    "success": true,
    "message": "Prescription uploaded successfully",
    "data": {
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "imageURL": "https://res.cloudinary.com/dglsw3gml/image/upload/v1741196272/bicycle-shop/prescription-1741196270502.png",
    "status": "pending",
    "\_id": "67c88bf0ba8310027934cfe8",
    "createdAt": "2025-03-05T17:37:52.661Z",
    "updatedAt": "2025-03-05T17:37:52.661Z",
    "\_\_v": 0
    }
    }
- `GET http://localhost:5000/api/prescriptions` - Get all prescriptions (Bearer Token) (Admin only)
- - res {
    "success": true,
    "data": {
    "prescriptions": [
    {
    "_id": "67c88bf0ba8310027934cfe8",
    "userId": {
    "_id": "67c7f0a3f28d7bd175ae3d02",
    "name": "admin",
    "email": "admin@admin.admin"
    },
    "imageURL": "https://res.cloudinary.com/dglsw3gml/image/upload/v1741196272/bicycle-shop/prescription-1741196270502.png",
    "status": "pending",
    "createdAt": "2025-03-05T17:37:52.661Z",
    "updatedAt": "2025-03-05T17:37:52.661Z",
    "__v": 0
    }
    ],
    "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
    }
    }
    }
- `GET http://localhost:5000/api/prescriptions/:id` - Get prescription by ID(Bearer Token)
- - res {
    "success": true,
    "data": {
    "\_id": "67c88bf0ba8310027934cfe8",
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "imageURL": "https://res.cloudinary.com/dglsw3gml/image/upload/v1741196272/bicycle-shop/prescription-1741196270502.png",
    "status": "pending",
    "createdAt": "2025-03-05T17:37:52.661Z",
    "updatedAt": "2025-03-05T17:37:52.661Z",
    "\_\_v": 0
    }
    }
- `GET http://localhost:5000/api/prescriptions/my-prescriptions` - Get user's prescriptions (Bearer Token)
- - res {
    "success": true,
    "data": [
    {
    "_id": "67c88bf0ba8310027934cfe8",
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "imageURL": "https://res.cloudinary.com/dglsw3gml/image/upload/v1741196272/bicycle-shop/prescription-1741196270502.png",
    "status": "pending",
    "createdAt": "2025-03-05T17:37:52.661Z",
    "updatedAt": "2025-03-05T17:37:52.661Z",
    "__v": 0
    }
    ]
    }
- `PATCH http://localhost:5000/api/prescriptions/:id/status` - Update prescription status (Admin only)(Bearer Token)
- - body {
    "status": "approved"
    }
- - res {
    "success": true,
    "message": "Prescription status updated successfully",
    "data": {
    "\_id": "67c88bf0ba8310027934cfe8",
    "userId": "67c7f0a3f28d7bd175ae3d02",
    "imageURL": "https://res.cloudinary.com/dglsw3gml/image/upload/v1741196272/bicycle-shop/prescription-1741196270502.png",
    "status": "approved",
    "createdAt": "2025-03-05T17:37:52.661Z",
    "updatedAt": "2025-03-05T17:45:20.072Z",
    "\_\_v": 0
    }
    }

### Payments

- `POST http://localhost:5000/api/payments/initiate/:orderId` - Initiate payment for an order get the GatewayPageURL
- - res {
    "success": true,
    "data": {
    "status": "SUCCESS",
    "failedreason": "",
    "sessionkey": "57205AD1D4DCBECA4B7FBC029A2F42ED",
    "gw": {
    "visa": "city_visa,ebl_visa,visacard",
    "master": "city_master,ebl_master,mastercard",
    "amex": "city_amex,amexcard",
    "othercards": "qcash,fastcash",
    "internetbanking": "city,abbank,bankasia,ibbl,mtbl,tapnpay,eblsky,instapay,pmoney,woori,modhumoti,fsibl",
    "mobilebanking": "dbblmobilebanking,bkash,nagad,abbank,ibbl,tap,upay,okaywallet,cellfine,mcash"
    },
    "redirectGatewayURL": "https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtml.php?mamount=24.48&ssl_id=250305235513dKJHxAJWBgKIMyl&Q=REDIRECT&SESSIONKEY=57205AD1D4DCBECA4B7FBC029A2F42ED&tran_type=success&cardname=",
    "directPaymentURLBank": "",
    "directPaymentURLCard": "",
    "directPaymentURL": "",
    "redirectGatewayURLFailed": "",
    "GatewayPageURL": "https://sandbox.sslcommerz.com/EasyCheckOut/testcde57205ad1d4dcbeca4b7fbc029a2f42ed",
    "storeBanner": "https://sandbox.sslcommerz.com/stores/logos/demoLogo.png",
    "storeLogo": "https://sandbox.sslcommerz.com/stores/logos/demoLogo.png",
    "store_name": "Demo",
    "desc": [
    ........
    ],
    "is_direct_pay_enable": "0"
    }
    }
- `POST http://localhost:5000/api/payments/success` - Handle successful payment
- `POST http://localhost:5000/api/payments/fail` - Handle failed payment
- `POST http://localhost:5000/api/payments/cancel` - Handle cancelled payment

## Email Notifications

The system sends email notifications for the following events:

- Order confirmation when a new order is placed
- Order status updates (processing, shipped, delivered, cancelled)
- Payment confirmation when payment is successful
- Prescription status updates (approved, rejected)
- Low stock alerts to admin users

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:

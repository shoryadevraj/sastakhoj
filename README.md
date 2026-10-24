# SastaKhoj — Local Price Comparison Platform

SastaKhoj is a web-based local price comparison platform that helps customers search for products, compare prices across local shops, find nearby stores, and make informed purchasing decisions. Shopkeepers can register, manage their shops, and maintain product prices and availability.

## Features

- **Product Search:** Search for products by name and category.
- **Price Comparison:** Compare product prices across participating local shops.
- **Shop Discovery:** Find local shops and view their details.
- **Location and Maps:** Display shop locations using Leaflet and OpenStreetMap.
- **Shopkeeper Dashboard:** Manage shop details, products, prices, and stock.
- **Authentication:** Register and log in using JWT-based authentication.
- **Admin Management:** Support administrative operations.
- **Product Images:** Use image URLs to display product images.

## Technology Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Leaflet

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Maps
- Leaflet
- OpenStreetMap

## Project Structure

```text
SastaKhoj/
├── client/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seedDemo.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── README.md
```

*Note: The structure above is illustrative. Actual files may differ slightly.*

## Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git

## Local Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shoryadevraj/sastakhoj-live.git
cd sastakhoj-live
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory using `.env.example` as a reference.

Configure the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
ADMIN_NAME=Administrator
```

Replace the example values with your own configuration. Do not commit `.env` files or expose database credentials, passwords, or JWT secrets.

Start the backend:

```bash
npm run dev
```

The backend will run at:

`http://localhost:5000`

Health check:

`http://localhost:5000/api/health`

### 3. Configure the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the application at:

`http://localhost:5173`

**Important:** Variables prefixed with `VITE_` are exposed to the browser. Store only public configuration values in these variables, never passwords or secret keys.

## Database Setup

### Create the First Admin

Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in the backend `.env` file.

Then run:

```bash
cd server
npm run seed:admin
```

This executes the project's admin seed script. Use it according to the implementation in `src/seedAdmin.js`.

### Add Optional Demo Data

After configuring MongoDB, run:

```bash
cd server
npm run seed:demo
```

The demo seed script creates sample shops, products, categories, and price listings.

**Demo data warning:** The sample shop information, prices, coordinates, phone numbers, and demo accounts are fictional. They are intended for testing and demonstrations, not as verified local market information.

The demo accounts use the password:

`Demo12345!`

Use demo credentials only in a test environment. Do not use them for real customer or shopkeeper accounts.

## Product Workflow

1. A shopkeeper registers or logs in.
2. The shopkeeper creates a shop profile.
3. The shopkeeper adds products and their prices.
4. The shopkeeper updates stock availability and quantities.
5. Customers search for products.
6. The application retrieves matching products and shop listings.
7. Customers compare prices and review shop details.
8. Customers can use the map to locate shops when location information is available.

## Deployment

SastaKhoj can be deployed using Vercel for the frontend, Render for the backend, and MongoDB Atlas for the database.

### Frontend — Vercel

Configure the Vercel project:

- Root Directory: `client`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

Add this environment variable in the Vercel project settings:

```env
VITE_API_URL=https://sastakhoj-api.onrender.com/api
```

Apply it to the appropriate deployment environments and redeploy after changing the variable.

### Backend — Render

Configure the Render web service:

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

Set these environment variables in Render:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=https://sastakhoj.vercel.app
```

Also configure any required admin environment variables if using the admin seed script.

Ensure MongoDB Atlas permits connections from the deployed backend. Restrict database network access appropriately instead of exposing it unnecessarily.

### Live Application

- Frontend: https://sastakhoj.vercel.app/
- Backend API: https://sastakhoj-api.onrender.com
- Health Check: https://sastakhoj-api.onrender.com/api/health
- Products API: https://sastakhoj-api.onrender.com/api/products

The health endpoint confirms that the API is responding. The products endpoint returns product data; prices are provided through the listing functionality.

### CORS Configuration

The backend must allow requests from the deployed frontend.

Set `CLIENT_URL` to:

```text
https://sastakhoj.vercel.app
```

The backend's CORS configuration should use this environment variable in production. Restart or redeploy the backend after updating it.

## Environment Variables Reference

| Variable | Location | Purpose |
|---|---|---|
| `PORT` | Backend | Server port |
| `MONGO_URI` | Backend | MongoDB connection |
| `JWT_SECRET` | Backend | JWT signing secret |
| `CLIENT_URL` | Backend | Allowed frontend origin |
| `ADMIN_EMAIL` | Backend | Initial admin email |
| `ADMIN_PASSWORD` | Backend | Initial admin password |
| `ADMIN_NAME` | Backend | Initial admin display name |
| `VITE_API_URL` | Frontend | Backend API base URL |

Keep secret values out of source control.

## Product Images and Maps

### Product Images

This version stores product image URLs rather than uploading image files to a dedicated storage service. Ensure that image URLs are valid and accessible.

### Maps

Leaflet displays maps using OpenStreetMap tiles. Follow the tile provider's usage policy, attribution requirements, and usage limits when deploying the application.

## Troubleshooting

**Products do not appear**
- Check that the backend is running.
- Open `/api/products` to verify the product API response.
- Verify that `VITE_API_URL` points to the correct backend.
- Check the browser console for CORS or network errors.
- Confirm that `CLIENT_URL` matches the deployed frontend origin.

**MongoDB connection fails**
- Verify `MONGO_URI`.
- Check MongoDB Atlas network access and database credentials.
- Review the backend logs.

**Changes do not appear after deployment**
- Confirm that the latest deployment succeeded.
- Redeploy after changing frontend environment variables.
- Hard-refresh the browser.

## Future Enhancements

- Verified real-time local prices
- Product image uploads
- Advanced search and filtering
- Price history and alerts
- Customer reviews and ratings
- Improved shop discovery and location-based search
- Enhanced admin analytics

## License

Add the project's chosen license before distributing or reusing the source code.

---

**SastaKhoj — Compare Local Prices. Shop Smarter.**
# SastaKhoj — Local Price Comparison Platform

SastaKhoj helps customers search products, compare prices from local shops, find nearby stores, and lets shopkeepers manage their products and prices.

## Stack
- Frontend: React + Vite + React Router + Axios + Leaflet
- Backend: Node.js + Express + MongoDB/Mongoose + JWT
- Maps: Leaflet + OpenStreetMap

## Local setup
### 1. Backend
```bash
cd server
npm install
# copy .env.example to .env and fill values
npm run dev
```

### 2. Frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Create the first admin
```bash
cd server
npm run seed:admin
```
This uses ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_NAME from `.env`.

## Optional demo data
After MongoDB is configured, run:
```bash
cd server
npm run seed:demo
```
Demo accounts use the password `Demo12345!` and are for local testing only.

## Important environment variables
Server `.env`:
- PORT
- MONGO_URI
- JWT_SECRET
- CLIENT_URL
- ADMIN_EMAIL
- ADMIN_PASSWORD
- ADMIN_NAME

Client `.env`:
- VITE_API_URL

## Product workflow
1. Shopkeeper registers.
2. Shopkeeper creates a shop.
3. Shopkeeper creates/list products and prices.
4. Customer searches a product.
5. SastaKhoj returns listings sorted by price.
6. Customer can see shop details, rating, stock and map location.


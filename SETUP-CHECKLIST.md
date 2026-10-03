# SastaKhoj setup checklist

## Required software
- Node.js LTS
- MongoDB Atlas account OR local MongoDB
- VS Code (recommended)

## 1. Backend
1. Open `server/`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `MONGO_URI` and a strong `JWT_SECRET`.
5. Set admin credentials.
6. Run `npm run dev`.

## 2. Frontend
1. Open `client/`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Keep `VITE_API_URL=http://localhost:5000/api` for local development.
5. Run `npm run dev`.

## 3. Create admin
In `server/`:
```bash
npm run seed:admin
```

## 4. Optional demo data
```bash
npm run seed:demo
```
Then test with the demo shopkeeper accounts using password `Demo12345!`.

## 5. First real workflow
Customer: register → search → compare → view shop.
Shopkeeper: register → create shop → add listings → update price/stock.
Admin: login → approve shops.

## 6. Before deployment
- Change admin password.
- Use a strong random JWT secret.
- Set production `CLIENT_URL`.
- Set production `VITE_API_URL`.
- Never commit `.env`.
- Review OpenStreetMap tile usage for your expected traffic.

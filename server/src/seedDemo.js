
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Shop from "./models/Shop.js";
import Product from "./models/Product.js";
import Listing from "./models/Listing.js";
import Category from "./models/Category.js";

dotenv.config();
await connectDB();

const password = await bcrypt.hash("Demo12345!", 10);

const demoEmails = [
  "customer@demo.local",
  ...Array.from({ length: 8 }, (_, i) => `shop${i + 1}@demo.local`)
];

// Refresh only the demo users, shops and listings.
const oldUsers = await User.find({
  email: { $in: demoEmails }
}).select("_id");

const oldShops = await Shop.find({
  owner: { $in: oldUsers.map(u => u._id) }
}).select("_id");

if (oldShops.length) {
  await Listing.deleteMany({
    shop: { $in: oldShops.map(s => s._id) }
  });
  await Shop.deleteMany({
    _id: { $in: oldShops.map(s => s._id) }
  });
}
await User.deleteMany({ email: { $in: demoEmails } });

const categoryRows = [
  ["Rice & Grains", "Rice, wheat and grains"],
  ["Flour & Staples", "Atta, maida and pulses"],
  ["Oil & Spices", "Oil, salt and spices"],
  ["Dairy & Eggs", "Milk, curd and eggs"],
  ["Fruits & Vegetables", "Fresh produce"],
  ["Snacks & Packaged Food", "Biscuits, noodles and tea"],
  ["Household", "Cleaning and daily essentials"]
];

const categories = {};
for (const [name, description] of categoryRows) {
  categories[name] = await Category.findOneAndUpdate(
    { name },
    { name, description },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

const productRows = [
  ["Sona Masoori Rice", "Local", "1 kg", "Rice & Grains", 58],
  ["Basmati Rice", "India Gate", "1 kg", "Rice & Grains", 105],
  ["Wheat", "Local", "1 kg", "Rice & Grains", 32],
  ["Chana Dal", "Local", "1 kg", "Flour & Staples", 82],
  ["Masoor Dal", "Local", "1 kg", "Flour & Staples", 95],
  ["Toor Dal", "Local", "1 kg", "Flour & Staples", 125],
  ["Aashirvaad Atta", "Aashirvaad", "5 kg", "Flour & Staples", 275],
  ["Maida", "Local", "1 kg", "Flour & Staples", 42],
  ["Mustard Oil", "Fortune", "1 L", "Oil & Spices", 155],
  ["Sunflower Oil", "Fortune", "1 L", "Oil & Spices", 145],
  ["Iodized Salt", "Tata Salt", "1 kg", "Oil & Spices", 28],
  ["Turmeric Powder", "Everest", "100 g", "Oil & Spices", 32],
  ["Amul Taaza Milk", "Amul", "500 ml", "Dairy & Eggs", 29],
  ["Curd", "Local Dairy", "500 g", "Dairy & Eggs", 38],
  ["Eggs", "Farm Fresh", "6 pcs", "Dairy & Eggs", 42],
  ["Potato", "Local", "1 kg", "Fruits & Vegetables", 28],
  ["Onion", "Local", "1 kg", "Fruits & Vegetables", 35],
  ["Tomato", "Local", "1 kg", "Fruits & Vegetables", 32],
  ["Banana", "Local", "1 dozen", "Fruits & Vegetables", 55],
  ["Parle-G Biscuits", "Parle", "250 g", "Snacks & Packaged Food", 25],
  ["Maggi Noodles", "Maggi", "Pack of 4", "Snacks & Packaged Food", 56],
  ["Tata Tea", "Tata Tea", "250 g", "Snacks & Packaged Food", 125],
  ["Bathing Soap", "Lifebuoy", "100 g", "Household", 32],
  ["Detergent Powder", "Wheel", "1 kg", "Household", 78]
];

const products = [];
for (const [name, brand, unit, category, basePrice] of productRows) {
  const doc = await Product.findOneAndUpdate(
    { name, brand, unit },
    {
      name,
      brand,
      unit,
      category: categories[category]._id,
      description: `${name} - sample Bhagwanpur demo listing`
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  products.push({ name, category, basePrice, doc });
}

const shopRows = [
  {
    name: "Bhagwanpur Bazar Kirana Store",
    owner: "Ravi Kumar",
    area: "Bhagwanpur Bazar",
    cats: ["Rice & Grains", "Flour & Staples", "Oil & Spices", "Snacks & Packaged Food", "Household"],
    coords: [85.2978, 25.8577]
  },
  {
    name: "Station Road Daily Needs",
    owner: "Amit Kumar",
    area: "Station Road",
    cats: ["Flour & Staples", "Oil & Spices", "Dairy & Eggs", "Snacks & Packaged Food", "Household"],
    coords: [85.3012, 25.8591]
  },
  {
    name: "Block Road General Store",
    owner: "Sanjay Sah",
    area: "Block Road",
    cats: ["Rice & Grains", "Flour & Staples", "Oil & Spices", "Dairy & Eggs", "Household"],
    coords: [85.2948, 25.8558]
  },
  {
    name: "Kiratpur Raja Ram Mini Mart",
    owner: "Manoj Kumar",
    area: "Kiratpur Raja Ram",
    cats: ["Rice & Grains", "Flour & Staples", "Dairy & Eggs", "Fruits & Vegetables", "Snacks & Packaged Food"],
    coords: [85.3095, 25.8661]
  },
  {
    name: "Karhari Fresh & Grocery",
    owner: "Pankaj Kumar",
    area: "Karhari",
    cats: ["Rice & Grains", "Flour & Staples", "Oil & Spices", "Fruits & Vegetables", "Household"],
    coords: [85.3220, 25.8585]
  },
  {
    name: "Bafapur Banthu Grocery Corner",
    owner: "Rohit Kumar",
    area: "Bafapur Banthu",
    cats: ["Rice & Grains", "Flour & Staples", "Dairy & Eggs", "Fruits & Vegetables", "Snacks & Packaged Food"],
    coords: [85.2860, 25.8450]
  },
  {
    name: "Husaina Khurd Daily Mart",
    owner: "Vikash Kumar",
    area: "Husaina Khurd",
    cats: ["Rice & Grains", "Oil & Spices", "Dairy & Eggs", "Fruits & Vegetables", "Household"],
    coords: [85.3150, 25.8385]
  },
  {
    name: "Madhopur Family Store",
    owner: "Deepak Kumar",
    area: "Madhopur",
    cats: ["Rice & Grains", "Flour & Staples", "Oil & Spices", "Dairy & Eggs", "Snacks & Packaged Food", "Household"],
    coords: [85.3100, 25.8700]
  }
];

const shops = [];

for (let i = 0; i < shopRows.length; i++) {
  const row = shopRows[i];
  const owner = await User.create({
    name: row.owner,
    email: `shop${i + 1}@demo.local`,
    password,
    role: "shopkeeper"
  });

  const doc = await Shop.create({
    owner: owner._id,
    name: row.name,
    description: `Sample store in ${row.area}, Bhagwanpur, Vaishali, Bihar. Demo data only.`,
    phone: `90000001${String(i + 1).padStart(2, "0")}`,
    address: {
      street: `${row.area} - sample address`,
      city: "Bhagwanpur",
      state: "Bihar",
      pincode: "844114"
    },
    location: {
      type: "Point",
      coordinates: row.coords
    },
    openingTime: "08:00",
    closingTime: "21:00",
    isVerified: true
  });

  shops.push({ ...row, doc });
}

let listingCount = 0;

for (let si = 0; si < shops.length; si++) {
  for (let pi = 0; pi < products.length; pi++) {
    const shop = shops[si];
    const product = products[pi];

    if (!shop.cats.includes(product.category)) continue;
    if ((pi + si) % 5 === 0 && pi > 2) continue;

    const variation = (((si * 7 + pi * 3) % 11) - 5) / 100;
    const price = Math.max(
      1,
      Math.round(product.basePrice * (1 + variation))
    );

    await Listing.findOneAndUpdate(
      { product: product.doc._id, shop: shop.doc._id },
      {
        product: product.doc._id,
        shop: shop.doc._id,
        price,
        stockAvailable: true,
        quantity: 5 + ((si + pi) % 35)
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    listingCount++;
  }
}

console.log("Bhagwanpur demo data created successfully.");
console.log(`Stores: ${shops.length}`);
console.log(`Products: ${products.length}`);
console.log(`Price listings: ${listingCount}`);
console.log("Demo password: Demo12345!");
console.log("Store details, coordinates, prices and phone numbers are fictional sample data.");

await mongoose.connection.close();

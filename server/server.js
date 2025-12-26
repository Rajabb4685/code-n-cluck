const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.ATLAS_URI);
let db;

app.get("/api/menu", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ error: "Database not ready" });
    const menu = await db.collection("menu").find({}).toArray();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: "Fetch error" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const result = await db.collection("orders").insertOne({
      items: req.body.items,
      total: req.body.total,
      createdAt: new Date()
    });
    res.status(201).json({ message: "Order saved", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Order failed" });
  }
});

async function startServer() {
  try {
    await client.connect();
    db = client.db("code-n-cluck-menu");
    console.log("✅ MongoDB connected");
    // Only one listen call here on port 5001
    app.listen(5001, () => console.log("🚀 Server on port 5001"));
  } catch (err) {
    console.error("❌ Connection failed", err);
  }
}

startServer();














// const express = require("express");
// const cors = require("cors");
// const { MongoClient } = require("mongodb");
// require("dotenv").config({ path: "./config.env" });

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Initialize MongoDB client
// const client = new MongoClient(process.env.ATLAS_URI);
// let db;

// /**
//  * 1. GET MENU
//  * This pulls the food and drink items from your Atlas 'menu' collection
//  */
// app.get("/api/menu", async (req, res) => {
//   try {
//     if (!db) {
//         return res.status(500).json({ error: "Database not initialized" });
//     }
//     const menu = await db.collection("menu").find({}).toArray();
//     res.json(menu);
//   } catch (err) {
//     console.error("Fetch error:", err);
//     res.status(500).json({ error: "Failed to fetch menu" });
//   }
// });

// /**
//  * 2. SAVE ORDER
//  * This receives the cart data from your React app and saves it to 'orders'
//  */
// app.post("/api/orders", async (req, res) => {
//   try {
//     if (!db) {
//         return res.status(500).json({ error: "Database not initialized" });
//     }
//     const result = await db.collection("orders").insertOne({
//       items: req.body.items,
//       total: req.body.total,
//       createdAt: new Date()
//     });
//     res.status(201).json({ message: "Order saved", id: result.insertedId });
//   } catch (err) {
//     console.error("Order error:", err);
//     res.status(500).json({ error: "Failed to save order" });
//   }
// });

// /**
//  * 3. START SERVER
//  * Connects to MongoDB first, then starts the Express listener
//  */
// async function startServer() {
//   try {
//     await client.connect();
//     db = client.db("code-n-cluck-menu");
//     console.log("✅ MongoDB connected successfully");
    
//     app.listen(5000, () => {
//       console.log("🚀 Server running on http://localhost:5000");
//     });
//   } catch (err) {
//     console.error("❌ Database connection failed:", err);
//     process.exit(1);
//   }
// }

// startServer();
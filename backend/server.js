require("dotenv").config();
   const express = require("express");
   const cors = require("cors");
   const { Pool } = require("pg");

   const app = express();
   const port = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json());

   // Database connection
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: { rejectUnauthorized: false },
   });

   // Get current prayer count
   app.get("/prayers", async (req, res) => {
     try {
       const result = await pool.query("SELECT count FROM prayers WHERE id = 1");
       res.json({ count: result.rows[0]?.count || 0 });
     } catch (err) {
       res.status(500).json({ error: "Database error" });
     }
   });

   // Add a prayer
   app.post("/pray", async (req, res) => {
     try {
       await pool.query("UPDATE prayers SET count = count + 1 WHERE id = 1");
       res.json({ message: "Prayer added" });
     } catch (err) {
       res.status(500).json({ error: "Database error" });
     }
   });

   app.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });

require("dotenv").config();
   const express = require("express");
   const cors = require("cors");

   const app = express();
   const port = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json());

   let prayerCount = 0;
   const userClicks = new Map(); // Store user IPs and last click date

   // Get current prayer count
   app.get("/prayers", (req, res) => {
     res.json({ count: prayerCount });
   });

   // Add a prayer (once per day per IP)
   app.post("/pray", (req, res) => {
     const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
     const today = new Date().toDateString();

     if (userClicks.get(userIp) === today) {
       return res.status(403).json({ error: "You can only pray once per day." });
     }

     userClicks.set(userIp, today);
     prayerCount++;
     res.json({ count: prayerCount });
   });

   app.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });

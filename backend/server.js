const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

let prayerCount = 0; // Temporary storage (Can be replaced with a database)

let userPrayers = {}; // Store user IPs and prayer dates to limit once per day

app.get("/prayers", (req, res) => {
    res.json({ count: prayerCount });
});

app.post("/pray", (req, res) => {
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const today = new Date().toDateString();

    if (userPrayers[userIP] === today) {
        return res.status(403).json({ message: "You can only pray once per day!" });
    }

    prayerCount++;
    userPrayers[userIP] = today;

    res.json({ message: "Prayer counted!", count: prayerCount });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

const websiteRoutes = require("./routes/websiteRoutes");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/websites", websiteRoutes);
app.use('/published', express.static(path.join(__dirname, 'published-sites')));

app.get("/", (req,res)=>{
    res.send("Website Builder Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
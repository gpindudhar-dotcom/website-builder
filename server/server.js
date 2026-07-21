const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const websiteRoutes = require("./routes/websiteRoutes");

const clientBuildPath = path.join(__dirname, "..", "client", "build");
const clientBuildExists = fs.existsSync(clientBuildPath);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/published", express.static(path.join(__dirname, "published-sites")));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Website Builder Backend is Running...");
});

if (clientBuildExists) {
  app.use(express.static(clientBuildPath));
  app.get(/^(?!\/api\/|\/published\/|\/health).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
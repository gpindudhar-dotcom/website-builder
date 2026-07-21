const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/websitebuilder";

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.log("⚠️ Database Connection Failed");
        console.log(err.message);

        if (process.env.NODE_ENV !== "production") {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
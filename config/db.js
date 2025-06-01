const mongoose = require("mongoose");
const chalk = require("chalk");
const dotenv = require("dotenv");
dotenv.config();


const connectDB = async () => {
    await mongoose.connect(process.env.MongoURI)
        .then(() => {
            console.log(chalk.green.bold("✅ MongoDB connected successfully"));
        })
        .catch((err) => {
            console.error(chalk.red.bold("❌ MongoDB connection failed:"), err);
        });
}

module.exports = connectDB;

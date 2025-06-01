const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const chalk = require('chalk'); 
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// connect to the database
connectDB();


app.use("/api/auth",userRoutes )
app.use("/api/admin",adminRoutes );
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/partner/portfolio", portfolioRoutes)


app.listen(process.env.PORT, () => {
        console.log(chalk.green.bold(`🚀 Server is running at:`), chalk.blue.underline(`http://localhost:}`));

})
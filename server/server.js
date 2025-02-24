require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const path = require('path');

const connectCloudinary = require('./config/cloudinary')

const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoute')
const doctorRouter = require('./routes/doctorRoutes')


app.use(cors());

const connectDB = async function main() {
    await mongoose.connect(process.env.MONGO_URL);
};
connectDB();
connectCloudinary();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user/',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);
    
})
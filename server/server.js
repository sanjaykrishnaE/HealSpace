require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

const userRouter = require('../server/routes/userRoutes')

app.use(cors());

const connectDB = async function main() {
    await mongoose.connect(process.env.MONGO_URL);
};
connectDB();

app.use(express.json());

app.use('/',userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);
    
})